<?php

require_once 'init.php';

if (!$db_link) {
  print(mysqli_connect_error());
  exit();
}

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
  if (isset($_GET['data'])) {
    $sql = "SELECT photo.id, url, likes,
              (SELECT GROUP_CONCAT(comment.message SEPARATOR '&&') FROM comment
              WHERE photo.id = comment.photo_id) AS comments
              FROM photo
              GROUP BY photo.id ORDER BY creation_date DESC
              LIMIT 26";

    $result = mysqli_query($db_link, $sql);

    if (!$result) {
      print(mysqli_error($db_link));
      exit();
    }

    $data = [];
    $photos = mysqli_fetch_all($result, MYSQLI_ASSOC);

    foreach ($photos as &$photo) {
      $comments = strval($photo['comments']);

      $com_array = explode('&&', $comments);
      $photo['comments'] = $com_array;
    }

    $response = json_encode($photos);
    echo $response;
  }

  if (isset($_GET['like'])) {
    $like = $_GET;

    $sql = "SELECT id, likes FROM photo WHERE id = " . intval($like['id']);

    $result = mysqli_query($db_link, $sql);

    if (!$result) {
      print(mysqli_error($db_link));
    }

    $array = mysqli_fetch_assoc($result);
    $response = json_encode($array);

    echo $response;
  }

  if (isset($_GET['comment'])) {
    $comment = $_GET;

    $sql = "SELECT message, photo_id FROM comment
            WHERE photo_id = " .intval($comment['id']). " ORDER BY id DESC LIMIT 1";

    $result = mysqli_query($db_link, $sql);

    if (!$result) {
      print(mysqli_error($db_link));
    }

    $array = mysqli_fetch_assoc($result);
    $response = json_encode($array);

    echo $response;
  }
}
