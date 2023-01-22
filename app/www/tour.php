<?php
setlocale(LC_TIME, 'fr', 'fr_FR.UTF-8'); // paramétrage locale Fr pour un affichage de la date en français

// récupération de la date sous forme d'un entier pour ensuite trier les concerts par années
function getYear($time): int
{
  return intval(date_format(date_create($time), 'Y'));
}

//----- Usage de cURL pour récupérer la liste des concerts via l'API Bandsintown ----//

//------ Concerts à venir ------//
//-------------------------------//
$ch = curl_init(); // create curl resource
// set url and return (return the transfer as a string)
curl_setopt_array($ch, [
  CURLOPT_URL => "https://rest.bandsintown.com/artists/eightsins/events?app_id=bf54ebcf185f40f87a5d9b986c3cccf9&date=upcoming",
  CURLOPT_RETURNTRANSFER => true
]);
$upcomingDates = curl_exec($ch); // assign the result to a variable
curl_close($ch); // close curl resource to free up system resources

$upcomingDates = json_decode($upcomingDates);

//------ Concerts passés ---------//
//-------------------------------//
$ch = curl_init();
curl_setopt_array($ch, [
  CURLOPT_URL => "https://rest.bandsintown.com/artists/eightsins/events?app_id=bf54ebcf185f40f87a5d9b986c3cccf9&date=past",
  CURLOPT_RETURNTRANSFER => true
]);
$pastDates = curl_exec($ch);
curl_close($ch);

$pastDates = array_reverse(json_decode($pastDates)); // tri du tableau dans l'ordre chronologique inverse

$currentYear = getYear($pastDates[0]->datetime); // on récupère l'année du dernier show afin de pouvoir classer les shows par année

$pageTitle = 'Tour - EIGHT SINS OFFICIAL WEBSITE';
$template = 'tour';
$metaDescription = 'Toutes les dates de concerts et tournées à venir pour Eight Sins, ainsi que les dates passées depuis 2013. Liens vers les évenements et tickets disponibles sur bandsintown';
$metaKeywords = 'concerts, tournées, dates, bandsintown, eight sins, tour, shows, tickets';
$canonicalUrl = 'https://eightsins.fr/tour.php';

include '../src/config/env.php';
include '../src/templates/layout.phtml';
