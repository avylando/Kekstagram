'use strict';

(function () {
  window.backend = {
    load: function (onLoad, onError) {
      var URL = 'assets/getdata.php?data';
      var xhr = new XMLHttpRequest();

      xhr.addEventListener('load', function () {
        try {
          var response = JSON.parse(xhr.responseText);
        } catch (err) {
          console.error(err.message);
        }

        switch (xhr.status) {
          case 200:
            onLoad(response);
            break;

          default:
            onError('Произошла ошибка: ' + xhr.status + ' ' + xhr.responseText);
        }
      });

      xhr.addEventListener('error', function () {
        onError('Ошибка соединения с сервером');
      });

      xhr.addEventListener('timeout', function () {
        onError('Истек таймаут ожидания ответа от сервера');
      });

      xhr.timeout = 10000;
      xhr.open('GET', URL);
      xhr.send();
    },

    save: function (data, onLoad, onError) {
      var URL = 'https://1510.dump.academy/kekstagram';
      var xhr = new XMLHttpRequest();

      xhr.responseType = 'json';
      xhr.addEventListener('load', function () {
        switch (xhr.status) {
          case 200:
            onLoad('Данные формы отправлены!');
            break;

          default: onError('Произошла ошибка: ' + xhr.status);
        }
      });

      xhr.addEventListener('error', function () {
        onError('Ошибка соединения с сервером');
      });

      xhr.addEventListener('timeout', function () {
        onError('Истек таймаут ожидания ответа от сервера');
      });

      xhr.timeout = 5000;
      xhr.open('POST', URL);
      xhr.send(data);
    }
  }
})();
