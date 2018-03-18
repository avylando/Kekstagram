'use strict';

(function () {

  var uploadInput = document.querySelector('#upload-file');
  var imagePreview = document.querySelector('.upload-form-preview img');

  var MIME_TYPES = ['image/jpeg', 'image/png','image/gif'];

  var checkValidity = function (file, types) {
    var fileType = file.type.toLowerCase();
    var fileTypeValidity = types.some(function(type) {
      return type === fileType;
    })

    return fileTypeValidity;
  }

  uploadInput.addEventListener('change', function () {
    var uploadFile = uploadInput.files[0];

    if (checkValidity(uploadFile, MIME_TYPES)) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        imagePreview.src = reader.result;
      })

      reader.readAsDataURL(uploadFile);
    } else {
      console.log('Неверный формат файла');
    }

  })
})();
