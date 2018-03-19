<?php

require_once 'init.php';
require_once 'mysql_helper.php';
require_once 'functions.php';

if (!$db_link) {
  print(mysqli_connect_error());
  exit();
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  $photo = $_POST;

  if (is_uploaded_file($_FILES['image']['tmp_name'])) {
    $path = check_image_format($_FILES['image'], '../photos/');

    if ($path) {
      $photo['url'] = $path;
    }
  }

  mysqli_query($db_link, "START TRANSACTION");

  $res1 = add_photo($db_link, $photo['url']);

  $photo_id = mysqli_insert_id($db_link);

  $res2 = add_comment($db_link, $photo['comment'], $photo_id);

  if ($res1 && $res2) {
    mysqli_query($db_link, "COMMIT");
    header('Location: /');
    exit();

  } else {
      mysqli_query($db_link, "ROLLBACK");
  }
}
