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

  cancelButton.addEventListener('click', clickFormClose);

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

  var filterControls = uploadForm.querySelector('.upload-effect-controls');
  var imagePreview = uploadForm.querySelector('.effect-image-preview');
  var filterButtons = uploadForm.querySelectorAll('input[name="effect"]');
  var filterClasses = [];
  var filterClass = null;

  (function () {
    for (var i = 0; i < filterButtons.length; i++) {
      filterClass = (filterButtons[i].name + '-' + filterButtons[i].value).toString();
      filterClasses[i] = filterClass;
    }
  })();


  var addFilterByClass = function (elem, className, evt) {
    for (var i = 0; i < filterClasses.length; i++) {
      if (imagePreview.classList.contains(filterClasses[i]) && filterClasses[i] !== className) {
        imagePreview.classList.remove(filterClasses[i]);
      }
    }

    elem.classList.add(className);
  }

  filterControls.addEventListener('click', function (evt) {
    console.log(evt.target.tagName.toLowerCase());
    if (evt.target.tagName.toLowerCase() === 'input') {
      var filterClassActive = (evt.target.name + '-' + evt.target.value).toString();

      addFilterByClass(imagePreview, filterClassActive, evt);
    }
  }, true);

})();
