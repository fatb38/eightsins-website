<?php
setlocale(LC_TIME, 'fr_FR.utf8');
include '../src/config/env.php';
include '../src/config/Database.php';
$database = new Database();

$query = ('
    SELECT
        *
    FROM news
    ORDER BY created_at DESC
');

$allNews = $database->query($query);

$pageTitle = 'News - EIGHT SINS OFFICIAL WEBSITE';
$template = 'news';
$metaDescription = 'Toutes les news et dernières infos à propos du groupe: Interviews, live report, photos, annonces... Retrouvez l\'actu complète dEight Sins !!';
$metaKeywords = 'news, infos, actu, live report, interview, annonces';
$canonicalUrl = 'https://eightsins.fr/news.php';

include '../src/templates/layout.phtml';
