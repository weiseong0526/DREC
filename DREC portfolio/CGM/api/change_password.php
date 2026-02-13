<?php
/**
 * POST: Change admin password (must be logged in)
 * Body: { "current_password": "...", "new_password": "..." }
 */
require_once __DIR__ . '/config.php';
require_once __DIR__ . '/auth.php';

requireAdmin();

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['ok' => false, 'error' => 'Method not allowed']);
    exit;
}

$raw = file_get_contents('php://input');
$data = json_decode($raw, true);
$current = isset($data['current_password']) ? $data['current_password'] : '';
$new = isset($data['new_password']) ? $data['new_password'] : '';

if ($current === '' || $new === '') {
    echo json_encode(['ok' => false, 'error' => '当前密码和新密码不能为空 / Current and new password required']);
    exit;
}

if (strlen($new) < 6) {
    echo json_encode(['ok' => false, 'error' => '新密码至少 6 位 / New password must be at least 6 characters']);
    exit;
}

$username = isset($_SESSION['admin_username']) ? $_SESSION['admin_username'] : '';
if ($username === '') {
    echo json_encode(['ok' => false, 'error' => 'Session expired']);
    exit;
}

$stmt = $pdo->prepare('SELECT id, password_hash FROM admin_users WHERE username = ?');
$stmt->execute([$username]);
$user = $stmt->fetch(PDO::FETCH_ASSOC);
if (!$user) {
    echo json_encode(['ok' => false, 'error' => 'User not found']);
    exit;
}

if (!password_verify($current, $user['password_hash'])) {
    echo json_encode(['ok' => false, 'error' => '当前密码错误 / Current password is incorrect']);
    exit;
}

$hash = password_hash($new, PASSWORD_DEFAULT);
$stmt = $pdo->prepare('UPDATE admin_users SET password_hash = ? WHERE id = ?');
$stmt->execute([$hash, $user['id']]);

echo json_encode(['ok' => true, 'message' => '密码已更新 / Password updated']);
exit;
