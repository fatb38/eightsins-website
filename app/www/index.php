<?php

/* redirection vers la version Anglaise du site
$lang = substr($_SERVER['HTTP_ACCEPT_LANGUAGE'], 0, 2);
if ($lang != 'fr') {
    $lang = 'en';
}
header("Location: $lang/layout.phtml", true, 301);
*/


$pageTitle = 'Accueil - EIGHT SINS OFFICIAL WEBSITE';
$template = 'welcome';
$metaDescription = 'Bienvenue sur le site officiel d\'Eight Sins, groupe de Thrash Hardcore de Grenoble depuis 2006.';
$metaKeywords = 'EIGHT SINS, eightsins, welcome page, Thrash, Hardcore, Punk, Metal, Groupe, band, heavy music, moshpit';
$canonicalUrl = 'https://eightsins.fr/index.php';

include '../src/config/env.php';
include '../src/templates/layout.phtml';
