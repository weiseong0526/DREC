<?php
/**
 * GET: Get one submission by id (?id=1)
 */
require_once __DIR__ . '/config.php';
require_once __DIR__ . '/auth.php';

requireAdmin();

$id = isset($_GET['id']) ? (int)$_GET['id'] : 0;
if ($id <= 0) {
    http_response_code(400);
    echo json_encode(['ok' => false, 'error' => 'Missing or invalid id']);
    exit;
}

$stmt = $pdo->prepare('SELECT * FROM cgm_submissions WHERE id = ?');
$stmt->execute([$id]);
$row = $stmt->fetch(PDO::FETCH_ASSOC);
if (!$row) {
    http_response_code(404);
    echo json_encode(['ok' => false, 'error' => 'Not found']);
    exit;
}

require_once __DIR__ . '/risk_calc.php';
ensureRiskForSubmission($row);

if (!empty($row['prediabetic_fear_complications'])) {
    $row['prediabetic_fear_complications'] = json_decode($row['prediabetic_fear_complications'], true);
}

echo json_encode(['ok' => true, 'submission' => $row]);
