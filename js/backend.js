'use strict';

(function () {
  window.backend = {
    load: function (onLoad, onError, params = '') {
      var URL = 'assets/getdata.php' + params;
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

    save: function (data, onLoad, onError, method = 'POST', params = '') {
      var URL = 'assets/setdata.php' + params;
      var xhr = new XMLHttpRequest();

      xhr.addEventListener('load', function () {

        switch (xhr.status) {
          case 200:
            onLoad(params !== '' ? params : 'Данные отправлены успешно!');
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

      xhr.timeout = 10000;
      xhr.open(method, URL);
      xhr.setRequestHeader('accept', 'application/json');
      xhr.send(data);
    }
  }
})();
