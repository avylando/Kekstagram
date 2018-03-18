<?php


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

function add_pin($connect, $array) {
  if (!$connect) {
    print(mysqli_connect_error());
      return;
  }

  $location = explode(',', $array['address']);
  $location_x = intval(substr($location[0], 3));
  $location_y = intval(substr($location[1], 3));
  if (empty($array['avatar'])) {
    $array['avatar'] = "img/avatars/default.png";
  }

  $sql = 'INSERT INTO offer (avatar, title, adress, price, type_id, rooms, guests, checkin, checkout, description, location_x, location_y)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';

  $stmt = db_get_prepare_stmt($connect, $sql, [$array['avatar'], $array['title'], $array['address'], $array['price'], $array['type'], $array['rooms'], $array['capacity'], $array['timein'], $array['timeout'], $array['description'], $location_x, $location_y]);
  $result = mysqli_stmt_execute($stmt);

  if (!$result) {
      print(mysqli_error($connect));
  }

  return $result;
}

function add_features($connect, $array, $offer_id) {
  if (!$connect) {
    return false;
  }

  if (empty($array)) {
    return true;
  }

  foreach ($array as $value) {
    $sql = 'INSERT INTO of_feature (offer_id, feature_id) VALUES (?, ?)';
    $stmt = db_get_prepare_stmt($connect, $sql, [$offer_id, $value]);
    $result = mysqli_stmt_execute($stmt);

    if (!$result) {
      return false;
    }
  }

  return $result;
}

function add_photos($connect, $array, $offer_id) {
  if (!$connect) {
    return false;
  }

  if (empty($array)) {
    return true;
  }

  foreach ($array as $photo) {
    $sql = 'INSERT INTO of_photo (offer_id, path) VALUES (?, ?)';
    $stmt = db_get_prepare_stmt($connect, $sql, [$offer_id, $photo]);
    $result = mysqli_stmt_execute($stmt);

    if (!$result) {
      return false;
    }
  }

  return $result;
}
