<?php
//error_reporting(E_ALL);
//ini_set("display_errors", 1);
include 'DotEnvParser.php';
use EnvVar\DotEnvParser;
(new DotEnvParser(__DIR__ . '/.env'))->load();
