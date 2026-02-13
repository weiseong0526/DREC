<?php
/**
 * 一键添加「风险评估」及可能缺失的栏位到 cgm_submissions 表
 * 在浏览器打开一次即可：http://localhost:8080/DREC%20portfolio/CGM/api/setup_risk_columns.php
 */
header('Content-Type: application/json; charset=utf-8');

require_once __DIR__ . '/config.php';

$done = [];
$errors = [];

$columnsToAdd = [
    'risk_score' => "INT DEFAULT NULL COMMENT 'Prediabetic: 0-12, Diabetic: 0-19' AFTER exercise_frequency",
    'risk_level' => "VARCHAR(80) DEFAULT NULL COMMENT 'e.g. 低风险/中等风险/高风险' AFTER risk_score",
    'prediabetic_hypertension_cholesterol' => "VARCHAR(10) DEFAULT NULL COMMENT 'yes | no'",
];

foreach ($columnsToAdd as $col => $def) {
    try {
        $stmt = $pdo->query("SHOW COLUMNS FROM cgm_submissions LIKE " . $pdo->quote($col));
        if ($stmt->rowCount() === 0) {
            $pdo->exec("ALTER TABLE cgm_submissions ADD COLUMN `$col` $def");
            $done[] = "Added column $col";
        }
    } catch (PDOException $e) {
        $errors[] = $col . ': ' . $e->getMessage();
    }
}

if (count($errors) > 0) {
    http_response_code(500);
    echo json_encode(['ok' => false, 'error' => implode('; ', $errors)]);
} else {
    echo json_encode(['ok' => true, 'message' => count($done) ? implode('; ', $done) : 'Columns already exist. 栏位已存在。']);
}
