<?php
/**
 * Admin auth: session-based. Endpoints:
 * - POST auth.php (login): body { username, password }
 * - GET auth.php?check=1 (check session)
 * - POST auth.php?logout=1 (logout)
 */
session_start();

function requireAdmin() {
    if (empty($_SESSION['admin_logged_in'])) {
        http_response_code(401);
        echo json_encode(['ok' => false, 'error' => 'Unauthorized', 'login_required' => true]);
        exit;
    }
}

if (isset($_GET['logout'])) {
    $_SESSION = [];
    session_destroy();
    echo json_encode(['ok' => true]);
    exit;
}

if (isset($_GET['check'])) {
    echo json_encode(['ok' => true, 'logged_in' => !empty($_SESSION['admin_logged_in'])]);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST' && !isset($_GET['logout'])) {
    $raw = file_get_contents('php://input');
    $data = json_decode($raw, true);
    $username = isset($data['username']) ? trim($data['username']) : '';
    $password = isset($data['password']) ? $data['password'] : '';

    if ($username === '' || $password === '') {
        echo json_encode(['ok' => false, 'error' => 'Username and password required']);
        exit;
    }

    require_once __DIR__ . '/config.php';

    $stmt = $pdo->query('SELECT id, password_hash FROM admin_users WHERE username = ' . $pdo->quote($username));
    $user = $stmt ? $stmt->fetch(PDO::FETCH_ASSOC) : null;

    if (!$user) {
        $stmt = $pdo->query('SELECT COUNT(*) FROM admin_users');
        $count = $stmt ? (int)$stmt->fetchColumn() : 0;
        if ($count === 0 && $username === 'admin' && $password === 'admin123') {
            $hash = password_hash('admin123', PASSWORD_DEFAULT);
            $pdo->exec("INSERT INTO admin_users (username, password_hash) VALUES ('admin', " . $pdo->quote($hash) . ")");
            $_SESSION['admin_logged_in'] = true;
            $_SESSION['admin_username'] = 'admin';
            echo json_encode(['ok' => true, 'message' => 'Logged in (first admin created)']);
            exit;
        }
        echo json_encode(['ok' => false, 'error' => 'Invalid username or password']);
        exit;
    }

    if (!password_verify($password, $user['password_hash'])) {
        echo json_encode(['ok' => false, 'error' => 'Invalid username or password']);
        exit;
    }

    $_SESSION['admin_logged_in'] = true;
    $_SESSION['admin_username'] = $username;
    echo json_encode(['ok' => true]);
    exit;
}
