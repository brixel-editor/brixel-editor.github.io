<?php
/**
 * Brixel WebEditor - 프로젝트 공유 저장 API
 * POST /code_share/save.php
 *
 * Request: { "title": "프로젝트명", "board": "uno", "mode": "block", "data": "<LZString압축>" }
 * Response: { "success": true, "id": "Bx7kM3nQ" }
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

header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json; charset=utf-8');

// OPTIONS preflight 처리
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

// POST만 허용
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['success' => false, 'error' => 'method_not_allowed'], JSON_UNESCAPED_UNICODE);
    exit;
}

// --- 데이터 디렉토리 ---
$DATA_DIR = __DIR__ . '/data';
$RATELIMIT_DIR = $DATA_DIR . '/_ratelimit';

if (!is_dir($DATA_DIR)) mkdir($DATA_DIR, 0755, true);
if (!is_dir($RATELIMIT_DIR)) mkdir($RATELIMIT_DIR, 0755, true);

// --- 레이트 리밋 ---
$ip_hash = hash('sha256', $_SERVER['REMOTE_ADDR'] . '_brixel_share');
$rl_file = $RATELIMIT_DIR . '/' . $ip_hash . '.json';

$MIN_INTERVAL = 10;   // 초
$MAX_PER_HOUR = 20;

if (file_exists($rl_file)) {
    $rl_data = json_decode(file_get_contents($rl_file), true);
    if (!$rl_data) $rl_data = ['timestamps' => []];

    // 1시간 이상 된 기록 제거
    $cutoff = time() - 3600;
    $rl_data['timestamps'] = array_values(array_filter($rl_data['timestamps'], function($ts) use ($cutoff) {
        return $ts > $cutoff;
    }));

    // 시간당 횟수 체크
    if (count($rl_data['timestamps']) >= $MAX_PER_HOUR) {
        echo json_encode(['success' => false, 'error' => 'rate_limit_hourly'], JSON_UNESCAPED_UNICODE);
        exit;
    }

    // 최소 간격 체크
    if (!empty($rl_data['timestamps'])) {
        $last = end($rl_data['timestamps']);
        if (time() - $last < $MIN_INTERVAL) {
            $wait = $MIN_INTERVAL - (time() - $last);
            echo json_encode(['success' => false, 'error' => 'rate_limit_wait', 'wait' => $wait], JSON_UNESCAPED_UNICODE);
            exit;
        }
    }
} else {
    $rl_data = ['timestamps' => []];
}

// --- 입력 파싱 ---
$raw = file_get_contents('php://input');
$input = json_decode($raw, true);

if (!$input) {
    echo json_encode(['success' => false, 'error' => 'invalid_json'], JSON_UNESCAPED_UNICODE);
    exit;
}

// --- 입력 검증 ---
$title = isset($input['title']) ? trim($input['title']) : '';
$board = isset($input['board']) ? trim($input['board']) : '';
$mode  = isset($input['mode'])  ? trim($input['mode'])  : '';
$data  = isset($input['data'])  ? $input['data']        : '';

// 제목 검증 (최대 100자)
if (mb_strlen($title) === 0) $title = 'Untitled Project';
if (mb_strlen($title) > 100) $title = mb_substr($title, 0, 100);
$title = htmlspecialchars($title, ENT_QUOTES, 'UTF-8');

// 보드 화이트리스트
$valid_boards = ['uno', 'nano', 'mega', 'leonardo', 'micro', 'pro_mini',
    'esp32', 'esp32cam', 'esp32s2', 'esp32c3', 'esp32s3', 'esp32c6',
    'r4_minima', 'r4_wifi', 'pico', 'pico_w'];
if (!in_array($board, $valid_boards)) $board = 'uno';

// 모드 검증
if (!in_array($mode, ['block', 'text'])) $mode = 'block';

// 데이터 검증 (비어있으면 안됨, 최대 512KB)
if (empty($data)) {
    echo json_encode(['success' => false, 'error' => 'empty_data'], JSON_UNESCAPED_UNICODE);
    exit;
}
if (strlen($data) > 524288) { // 512KB
    echo json_encode(['success' => false, 'error' => 'data_too_large'], JSON_UNESCAPED_UNICODE);
    exit;
}

// --- Share ID 생성 ---
$chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789';
$chars_len = strlen($chars);
$max_attempts = 10;
$share_id = '';

for ($attempt = 0; $attempt < $max_attempts; $attempt++) {
    $id = '';
    $bytes = random_bytes(8);
    for ($i = 0; $i < 8; $i++) {
        $id .= $chars[ord($bytes[$i]) % $chars_len];
    }

    // 충돌 체크
    if (!file_exists($DATA_DIR . '/' . $id . '.json')) {
        $share_id = $id;
        break;
    }
}

if (empty($share_id)) {
    echo json_encode(['success' => false, 'error' => 'id_generation_failed'], JSON_UNESCAPED_UNICODE);
    exit;
}

// --- JSON 파일 저장 ---
$project = [
    'id'      => $share_id,
    'title'   => $title,
    'board'   => $board,
    'mode'    => $mode,
    'data'    => $data,
    'created' => date('c'), // ISO 8601
    'views'   => 0
];

$json = json_encode($project, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
$result = file_put_contents($DATA_DIR . '/' . $share_id . '.json', $json, LOCK_EX);

if ($result === false) {
    echo json_encode(['success' => false, 'error' => 'write_failed'], JSON_UNESCAPED_UNICODE);
    exit;
}

// --- 레이트 리밋 기록 ---
$rl_data['timestamps'][] = time();
file_put_contents($rl_file, json_encode($rl_data), LOCK_EX);

// --- 성공 응답 ---
echo json_encode([
    'success' => true,
    'id'      => $share_id
], JSON_UNESCAPED_UNICODE);
