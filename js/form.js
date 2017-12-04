'use strict';

(function () {

  // Variables

  var uploadButton = document.querySelector('#upload-file');
  var uploadForm = document.querySelector('.upload-form');
  var uploadOverlay = uploadForm.querySelector('.upload-overlay');
  // var uploadMessage = uploadForm.querySelector('.upload-message');
  var cancelButton = uploadForm.querySelector('.upload-form-cancel');
  var inputComment = uploadForm.querySelector('.upload-form-description');

  // Add events to show/hide form


  var escFormClose = function (evt) {
    window.lib.hideKeydownHandler(uploadOverlay, evt);
  }

  var clickFormClose = function () {
    uploadOverlay.classList.add('hidden');
  }

  uploadButton.addEventListener('change', function () {
    uploadOverlay.classList.remove('hidden');
  })

  cancelButton/addEventListener('click', clickFormClose);

  cancelButton.addEventListener('keydown', escFormClose);

  document.addEventListener('keydown', escFormClose);


  // Focus on comment field

  inputComment.addEventListener('focus', function () {
    document.removeEventListener('keydown', escFormClose);
  });

  inputComment.addEventListener('blur', function () {
    document.addEventListener('keydown', escFormClose);
  });


  // Setup filters

  var imagePreview = uploadForm.querySelectorAll('.effect-image-preview');
  var filterButtons = uploadForm.querySelectorAll('input[name="effect"]');
  console.log(filterButtons);

  for (var i = 0; i < filterButtons.length; i++) {
    filterButtons[i].addEventListener('change', function (evt) {
      if (filterButtons[i].checked) {
        imagePreview.classList.add('' + filterButtons[i].name + '-' + filterButtons[i].value);
      }
    })
  }

})();
