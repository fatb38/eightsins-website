<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET');
header("Access-Control-Allow-Headers: X-Requested-With");

include '../src/config/env.php';
include '../src/config/Database.php';
$database = new Database();

$requestMethod = $_SERVER['REQUEST_METHOD'];

if ($requestMethod === 'GET') {
    header('Content-Type: application/json');
    if (empty($_GET)) {
        $query = 'SELECT * FROM news ORDER BY created_at DESC';
        $news = $database->query($query);
    } elseif (count($_GET) === 1 && isset($_GET['id'])) {
        $query = 'SELECT * FROM news WHERE id = ?';
        $news = $database->queryOne($query, [$_GET['id']]);
        if (!$news) {
            return http_response_code(404);
        }
    } else {
        return http_response_code(400);
    }
    echo json_encode($news, JSON_PRETTY_PRINT);
} else {
    header("HTTP/1.0 405 Method Not Allowed");
}
