<?php
setlocale(LC_TIME, 'fr', 'fr_FR.UTF-8'); // paramétrage locale Fr pour un affichage de la date en français

// récupération de la date sous forme d'un entier pour ensuite trier les concerts par années
function getYear($time) {
    return intval(date_format(date_create($time), 'Y'));
}


//----- Usage de cURL pour récupérer la liste des concerts via l'API Bandsintown ----//

//------ Concerts à venir ------//
//-------------------------------//
$ch = curl_init(); // create curl resource
// set url and return (return the transfer as a string)
curl_setopt_array($ch,[
    CURLOPT_URL => "https://rest.bandsintown.com/artists/eightsins/events?app_id=bf54ebcf185f40f87a5d9b986c3cccf9&date=upcoming",
    CURLOPT_RETURNTRANSFER => true
]);
$upcomingDates = curl_exec($ch); // assign the result to a variable
curl_close($ch); // close curl resource to free up system resources

$upcomingDates = json_decode($upcomingDates);


//------ Concerts passés ---------//
//-------------------------------//
$ch = curl_init();
curl_setopt_array($ch,[
    CURLOPT_URL => "https://rest.bandsintown.com/artists/eightsins/events?app_id=bf54ebcf185f40f87a5d9b986c3cccf9&date=past",
    CURLOPT_RETURNTRANSFER => true
]);
$pastDates = curl_exec($ch);
curl_close($ch);

$pastDates = json_decode($pastDates);

$currentYear = getYear('now'); // get the actual year to construct year tabs in past shows list


$pageTitle = 'Tour - EIGHT SINS OFFICIAL WEBSITE';
$template = 'tour';

include '../src/templates/layout.phtml';