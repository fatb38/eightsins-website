<?php

setlocale(LC_TIME, 'fr', 'fr_FR', 'fr_FR.ISO8859-1');

include '../src/includes/DatabaseLocal.php';

$database = new DatabaseLocal();

$query = ('
    SELECT
        *
    FROM news
    ORDER BY created_at DESC
');

$allNews = $database->query($query);


$pageTitle = 'News - EIGHT SINS OFFICIAL WEBSITE';
$template = 'news';

include '../src/templates/layout.phtml';
