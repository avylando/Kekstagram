<?php

require_once 'init.php';

if (!$db_link) {
  print(mysqli_connect_error());
  exit();
}

if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['data'])) {
  $sql = "SELECT photo.id, url, likes,
          (SELECT GROUP_CONCAT(comment.message SEPARATOR '&&') FROM comment
          WHERE photo.id = comment.photo_id) AS comments
          FROM photo
          GROUP BY photo.id ORDER BY likes DESC
          LIMIT 26";

  $result = mysqli_query($db_link, $sql);

  if (!$result) {
    print(mysqli_error($db_link));
    exit();
  }

  $data = [];
  $photos = mysqli_fetch_all($result, MYSQLI_ASSOC);
  // print_r($photos);

  foreach ($photos as &$photo) {
    $comments = strval($photo['comments']);

    $com_array = explode('&&', $comments);
    $photo['comments'] = $com_array;
  }

  $response = json_encode($photos);
  echo $response;
}
