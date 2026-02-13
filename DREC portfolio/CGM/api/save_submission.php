<?php
/**
 * POST: Save patient form submission (JSON body)
 */
error_reporting(E_ALL);
ini_set('display_errors', 0);
ini_set('log_errors', 1);

if (!headers_sent()) {
    header('Content-Type: application/json; charset=utf-8');
}

try {
    require_once __DIR__ . '/config.php';
} catch (Throwable $e) {
    http_response_code(500);
    echo json_encode(['ok' => false, 'error' => 'Config failed', 'message' => $e->getMessage()]);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['ok' => false, 'error' => 'Method not allowed']);
    exit;
}

$raw = file_get_contents('php://input');
$data = json_decode($raw, true);
if (!is_array($data)) {
    http_response_code(400);
    echo json_encode(['ok' => false, 'error' => 'Invalid JSON']);
    exit;
}

$row = submissionRowFromData($data);

// Ensure numeric/empty values are valid for DB
foreach (['height', 'weight'] as $k) {
    if (isset($row[$k]) && ($row[$k] === '' || $row[$k] === null)) {
        $row[$k] = null;
    }
}

function doInsert($pdo, $row) {
    $cols = array_keys($row);
    $placeholders = array_map(function($c) { return ':' . $c; }, $cols);
    $sql = 'INSERT INTO cgm_submissions (' . implode(', ', $cols) . ') VALUES (' . implode(', ', $placeholders) . ')';
    $stmt = $pdo->prepare($sql);
    foreach ($row as $k => $v) {
        $stmt->bindValue(':' . $k, $v);
    }
    $stmt->execute();
    return (int) $pdo->lastInsertId();
}

// Retry insert: on "Unknown column 'X'", remove X from row and retry (for old DBs missing columns)
$maxRetries = 20;
$attempt = 0;
while ($attempt < $maxRetries) {
    try {
        $id = doInsert($pdo, $row);
        echo json_encode(['ok' => true, 'id' => $id]);
        exit;
    } catch (PDOException $e) {
        $msg = $e->getMessage();
        if (preg_match("/Unknown column '([^']+)'/", $msg, $m)) {
            $badCol = $m[1];
            unset($row[$badCol]);
            $attempt++;
            continue;
        }
        http_response_code(500);
        echo json_encode(['ok' => false, 'error' => 'Database error', 'message' => $msg]);
        exit;
    }
}
http_response_code(500);
echo json_encode(['ok' => false, 'error' => 'Database error', 'message' => 'Too many missing columns. Run api/setup_risk_columns.php to add missing columns.']);
