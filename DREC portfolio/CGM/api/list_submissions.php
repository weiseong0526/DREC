<?php
/**
 * GET: List submissions with optional filters
 * ?patient_type=diabetic|prediabetic
 * ?patient_name=...
 * ?patient_email=...
 * ?date_from=YYYY-MM-DD
 * ?date_to=YYYY-MM-DD
 * ?limit=50&offset=0
 */
require_once __DIR__ . '/config.php';
require_once __DIR__ . '/auth.php'; // session + requireAdmin()

requireAdmin();

header('Cache-Control: no-store, no-cache, must-revalidate');
header('Pragma: no-cache');

$patient_type = isset($_GET['patient_type']) ? trim($_GET['patient_type']) : '';
$patient_name = isset($_GET['patient_name']) ? trim($_GET['patient_name']) : '';
$patient_email = isset($_GET['patient_email']) ? trim($_GET['patient_email']) : '';
$date_from = isset($_GET['date_from']) ? trim($_GET['date_from']) : '';
$date_to = isset($_GET['date_to']) ? trim($_GET['date_to']) : '';
$limit = isset($_GET['limit']) ? max(1, min(500, (int)$_GET['limit'])) : 100;
$offset = isset($_GET['offset']) ? max(0, (int)$_GET['offset']) : 0;

$where = ['1=1'];
$params = [];

if ($patient_type !== '' && in_array($patient_type, ['diabetic', 'prediabetic'])) {
    $where[] = 'patient_type = :patient_type';
    $params['patient_type'] = $patient_type;
}
if ($patient_name !== '') {
    $where[] = '(patient_name LIKE :patient_name OR patient_contact LIKE :patient_name)';
    $params['patient_name'] = '%' . $patient_name . '%';
}
if ($patient_email !== '') {
    $where[] = 'patient_email LIKE :patient_email';
    $params['patient_email'] = '%' . $patient_email . '%';
}
if ($date_from !== '') {
    $where[] = 'DATE(created_at) >= :date_from';
    $params['date_from'] = $date_from;
}
if ($date_to !== '') {
    $where[] = 'DATE(created_at) <= :date_to';
    $params['date_to'] = $date_to;
}

$whereClause = implode(' AND ', $where);
$limitOffset = ' ORDER BY created_at DESC LIMIT ' . (int)$limit . ' OFFSET ' . (int)$offset;

require_once __DIR__ . '/risk_calc.php';

$list = [];
try {
    $sql = 'SELECT * FROM cgm_submissions WHERE ' . $whereClause . $limitOffset;
    $stmt = $pdo->prepare($sql);
    foreach ($params as $k => $v) {
        $stmt->bindValue(":$k", $v);
    }
    $stmt->execute();
    $list = $stmt->fetchAll(PDO::FETCH_ASSOC);
    foreach ($list as &$r) {
        ensureRiskForSubmission($r);
    }
    unset($r);
} catch (PDOException $e) {
    if (strpos($e->getMessage(), 'Unknown column') !== false) {
        $baseCols = 'id, created_at, patient_type, patient_name, patient_contact, patient_email, patient_age, patient_gender, bmi, systolic_bp, diastolic_bp';
        $sql = 'SELECT ' . $baseCols . ' FROM cgm_submissions WHERE ' . $whereClause . $limitOffset;
        $stmt = $pdo->prepare($sql);
        foreach ($params as $k => $v) {
            $stmt->bindValue(":$k", $v);
        }
        $stmt->execute();
        $list = $stmt->fetchAll(PDO::FETCH_ASSOC);
        foreach ($list as &$r) {
            $r['risk_score'] = null;
            $r['risk_level'] = null;
        }
        unset($r);
    } else {
        throw $e;
    }
}

$countSql = 'SELECT COUNT(*) FROM cgm_submissions WHERE ' . implode(' AND ', $where);
$countStmt = $pdo->prepare($countSql);
foreach ($params as $k => $v) {
    $countStmt->bindValue(":$k", $v);
}
$countStmt->execute();
$total = (int) $countStmt->fetchColumn();

echo json_encode(['ok' => true, 'list' => $list, 'total' => $total]);
