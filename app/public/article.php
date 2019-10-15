<?php

// redirection en cas d'appel de la page sans id valide
if (
    (isset($_GET['postid']) && !ctype_digit($_GET['postid']))
    ||
    (isset($_POST['postid']) && !ctype_digit($_POST['postid']))
) {
    header('Location: news.php');
    exit;
}

include '../src/includes/DatabaseLocal.php';

$database = new DatabaseLocal();

// récupération de la news
$query = ('
    SELECT
		*
	FROM news
	WHERE id = ?
');

$news = $database->queryOne($query, [$_GET['newsid']]);

$pageTitle = 'News : '.$news['title'];
$template = 'article';

include '../src/templates/layout.phtml';
