<?php
/**
 * Brixel WebEditor - 프로젝트 공유 조회 API
 * GET /code_share/load.php?id=Bx7kM3nQ
 *
 * Response: { "success": true, "project": { id, title, board, mode, data, created, views } }
 */

// CORS 설정
$allowed_origins = [
    'https://www.gorillacell.kr',
    'https://gorillacell.kr',
    'https://gorillacell.github.io',
    'http://localhost',
    'http://127.0.0.1'
];

$origin = isset($_SERVER['HTTP_ORIGIN']) ? $_SERVER['HTTP_ORIGIN'] : '';
if (in_array($origin, $allowed_origins)) {
    header("Access-Control-Allow-Origin: $origin");
} else {
    header("Access-Control-Allow-Origin: https://www.gorillacell.kr");
}

header('Access-Control-Allow-Methods: GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json; charset=utf-8');

// OPTIONS preflight 처리
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

// GET만 허용
if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    echo json_encode(['success' => false, 'error' => 'method_not_allowed'], JSON_UNESCAPED_UNICODE);
    exit;
}

// --- 데이터 디렉토리 ---
$DATA_DIR = __DIR__ . '/data';

// --- ID 검증 ---
$id = isset($_GET['id']) ? trim($_GET['id']) : '';

if (empty($id) || !preg_match('/^[A-Za-z2-9]{6,12}$/', $id)) {
    echo json_encode(['success' => false, 'error' => 'invalid_id'], JSON_UNESCAPED_UNICODE);
    exit;
}

// --- 파일 조회 ---
$file_path = $DATA_DIR . '/' . $id . '.json';

if (!file_exists($file_path)) {
    http_response_code(404);
    echo json_encode(['success' => false, 'error' => 'not_found'], JSON_UNESCAPED_UNICODE);
    exit;
}

// --- 프로젝트 데이터 읽기 ---
$json = file_get_contents($file_path);
$project = json_decode($json, true);

if (!$project) {
    echo json_encode(['success' => false, 'error' => 'corrupted_data'], JSON_UNESCAPED_UNICODE);
    exit;
}

// --- 조회수 증가 ---
$project['views'] = isset($project['views']) ? $project['views'] + 1 : 1;
file_put_contents($file_path, json_encode($project, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT), LOCK_EX);

// --- 성공 응답 ---
echo json_encode([
    'success' => true,
    'project' => $project
], JSON_UNESCAPED_UNICODE);
