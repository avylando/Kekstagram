<?php

require_once 'mysql_helper.php';

/** Проверка формата изображения (PNG, JPEG)
 * @param string $file Путь к файлу изображения
 * @return string/boolean Строка с путем к сохраненному файлу/false
 */

function check_image_format($file, $directory) {
  $tmp_name = $file['tmp_name'];
  $path = $directory . $file['name'];

  $file_type = mime_content_type($tmp_name);

  if ($file_type !== "image/png" && $file_type !== "image/jpeg") {
      return false;
  }

  move_uploaded_file($tmp_name, $path);
  return $path;
}

function reArrayFiles($file_post) {

  $file_ary = array();
  $file_count = count($file_post['name']);
  $file_keys = array_keys($file_post);

  for ($i=0; $i<$file_count; $i++) {
      foreach ($file_keys as $key) {
          $file_ary[$i][$key] = $file_post[$key][$i];
      }
  }

  return $file_ary;
}

function add_photo($connect, $url) {
  if (!$connect) {
    print(mysqli_connect_error());
      return;
  }

  $sql = 'INSERT INTO photo (url) VALUES (?)';

  $stmt = db_get_prepare_stmt($connect, $sql, [$url]);
  $result = mysqli_stmt_execute($stmt);

  if (!$result) {
      print(mysqli_error($connect));
  }

  return $result;
}

function add_comment($connect, $comment, $photo_id) {
  if (!$connect) {
    return false;
  }

  $sql = 'INSERT INTO comment (message, photo_id) VALUES (?, ?)';

  $stmt = db_get_prepare_stmt($connect, $sql, [$comment, $photo_id]);
  $result = mysqli_stmt_execute($stmt);

  if (!$result) {
    return false;
  }

  return $result;
}

