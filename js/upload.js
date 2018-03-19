'use strict';

(function () {

  var uploadInput = document.querySelector('#upload-file');
  var imagePreview = document.querySelector('.upload-form-preview img');
  var progress = document.querySelector(".upload__progress");;

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
      progress.style.display = 'block';
      imagePreview.src = imagePreview.getAttribute('data-default');
      reader.addEventListener('progress', function (event) {
        if (event.lengthComputable) {
          var percent = parseInt(((event.loaded / event.total) * 100), 10);
          // var time = event.total;
          progress.max = 100;
          progress.value = percent;
        }
      });

      reader.addEventListener('load', function () {
        imagePreview.src = reader.result;
        if (progress.value === progress.max) {
          progress.style.display = 'none';
        }
      })


      reader.readAsDataURL(uploadFile);
    } else {
      console.log('Неверный формат файла');
    }

  })
})();
