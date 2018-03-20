<?php

require_once 'init.php';
require_once 'functions.php';

if (!$db_link) {
  print(mysqli_connect_error());
  exit();
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  if (isset($_POST['add-photo'])) {
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

  if (isset($_POST['add-comment'])) {
    $message = $_POST;

    $id = intval($message['id']);
    $comment = mysqli_real_escape_string($message['comment']);

    $result = add_comment($db_link, $comment, $id);

    if (!$result) {
      print(mysqli_error($db_link));
    }
  }

}

if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['like'])) {
  $like = $_GET;

  $sql = "UPDATE photo SET likes = (likes + 1) WHERE id = " . intval($like['id']);

  $result = mysqli_query($db_link, $sql);

  if (!$result) {
    print(mysqli_error($db_link));
  }
}
