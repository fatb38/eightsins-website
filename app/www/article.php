<?php

setlocale(LC_TIME, 'fr', 'fr_FR', 'fr_FR.ISO8859-1');

// redirection en cas d'appel de la page sans id valide
if (
    (isset($_GET['postid']) && !ctype_digit($_GET['postid']))
    ||
    (isset($_POST['postid']) && !ctype_digit($_POST['postid']))
) {
    header('Location: news.php');
    exit;
}

include '../src/config/env.php';
include '../src/config/Database.php';
$database = new Database();

// récupération de la news
$query = ('
    SELECT
		*
	FROM news
	WHERE id = ?
');

$news = $database->queryOne($query, [$_GET['newsid']]);

$pageTitle = 'News : ' . $news['title'];
$template = 'article';
$metaDescription = $news['title'];
$metaKeywords = 'news, eight sins';
$canonicalUrl = 'https://eightsins.fr/article.php?newsid=' . $_GET['newsid'];

include '../src/templates/layout.phtml';
