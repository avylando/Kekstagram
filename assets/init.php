<?php

require_once 'db.php';

$db_link = mysqli_connect($db['host'], $db['user'], $db['password'], $db['database']);
mysqli_set_charset($db_link, 'utf-8');
