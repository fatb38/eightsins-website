<?php

/* redirection vers la version Anglaise du site
$lang = substr($_SERVER['HTTP_ACCEPT_LANGUAGE'], 0, 2);
if ($lang != 'fr') {
    $lang = 'en';
}
header("Location: $lang/layout.phtml", true, 301);
*/


header('location: news.php');