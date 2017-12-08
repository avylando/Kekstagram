'use strict';

(function () {

  // Variables

  var uploadButton = document.querySelector('#upload-file');
  var uploadForm = document.querySelector('.upload-form');
  var uploadOverlay = uploadForm.querySelector('.upload-overlay');
  var cancelButton = uploadForm.querySelector('.upload-form-cancel');
  var imagePreview = uploadForm.querySelector('.effect-image-preview');
  var filterButtons = uploadForm.querySelectorAll('input[name="effect"]');
  var filterScale = document.querySelector('.upload-effect-level');
  var inputComment = uploadForm.querySelector('.upload-form-description');


  // Add events to show/hide form

  var clickFormClose = function () {
    uploadOverlay.classList.add('hidden');

    // Reset filters
    for (var i = 0; i < filterButtons.length; i++) {
      if (imagePreview.classList.contains('effect-' + filterButtons[i].value))
        imagePreview.classList.remove('effect-' + filterButtons[i].value);
      imagePreview.style.filter = '';
      imagePreview.classList.add('effect-none');
      window.lib.hideElement(filterScale);
    }

    cancelButton.removeEventListener('click', clickFormClose);
    cancelButton.removeEventListener('keydown', enterFormClose);
    document.removeEventListener('keydown', escFormClose);
  }

  var escFormClose = function (evt) {
    if (evt.keyCode === lib.ESC_KEYCODE) {
      clickFormClose();
    }
  }

  var enterFormClose = function (evt) {
    if (evt.keyCode === lib.ENTER_KEYCODE) {
      clickFormClose();
    }
  }

  uploadButton.addEventListener('change', function () {
    uploadOverlay.classList.remove('hidden');

    cancelButton.addEventListener('click', clickFormClose);
    cancelButton.addEventListener('keydown', enterFormClose);
    document.addEventListener('keydown', escFormClose);
  });


  // Focus on comment field

  inputComment.addEventListener('focus', function () {
    document.removeEventListener('keydown', escFormClose);
  });

  inputComment.addEventListener('blur', function () {
    document.addEventListener('keydown', escFormClose);
  });


  // Setup filters


  // Callback

  var setFilter = function (newFilter, oldFilter) {
    imagePreview.classList.remove('effect-' + oldFilter);
    imagePreview.classList.add('effect-' + newFilter);
  }

  // Filters init

  for (var i = 0; i < filterButtons.length; i++) {
    window.initializeFilters(filterButtons[i], imagePreview, setFilter);
  }


  // Hide scale by default

  var filterScale = uploadForm.querySelector('.upload-effect-level');
  var numberScale = filterScale.querySelector('.upload-effect-level-value');

  window.lib.hideElement(filterScale);
  window.lib.hideElement(numberScale);


  // Filter toggle drag

  var filterToggle = uploadForm.querySelector('.upload-effect-level-pin');
  var scaleLevel = uploadForm.querySelector('.upload-effect-level-val');

  window.filterSlider(filterToggle, scaleLevel, imagePreview);


  // Resizing photo

  var buttonSizeDec = uploadForm.querySelector('.upload-resize-controls-button-dec');
  var buttonSizeInc = uploadForm.querySelector('.upload-resize-controls-button-inc');
  var sizeValueField = uploadForm.querySelector('.upload-resize-controls-value');


  // Set default size value
  sizeValueField.value = '100%';
  sizeValueField.setAttribute('value', '100%');

  // Size controls events

  var adjustScale = function (scale) {
    imagePreview.style.transform = 'scale(' + scale / 100 + ')';
    sizeValueField.value = scale + '%';
    sizeValueField.setAttribute('value', scale + '%');
  };

  window.initializeScale(buttonSizeDec, buttonSizeInc, adjustScale);

  // // Comment field validation

  // var commentField = uploadForm.querySelector('.upload-form-description');
  // var maxCommentSymbols = parseInt(commentField.getAttribute('maxlength'));

  // commentField.addEventListener('invalid', function () {
  //   if (commentField.validity.tooLong) {
  //     commentField.setCustomValidity('Текстовое поле должно содержать более ' + maxCommentSymbols + ' символов');
  //   } else {
  //     commentField.setCustomValidity('');
  //   }
  // })


  // Hashtag field validation

  var hashtagField = uploadForm.querySelector('.upload-form-hashtags');
  var maxHashtagLength = 20;
  var maxHashtagsNumber = 5;
  var hashtags = [];

  hashtagField.addEventListener('input', function (evt) {
    hashtags.splice(0, hashtags.length);
    hashtags = hashtagField.value.split(' ');

    for (var i = 0; i < hashtags.length; i++) {
      if (hashtags.length > maxHashtagsNumber) {
        hashtagField.setCustomValidity('Не более ' + maxHashtagsNumber + ' тегов');
        hashtagField.style.border = '3px solid red';
      } else if (hashtags[i][0] !== '#') {
        hashtagField.style.border = '3px solid red';
        hashtagField.setCustomValidity('Хэш-тег должен начинаться с символа `#` (решётка)');
      } else if (hashtags[i].length > maxHashtagLength) {
        hashtagField.style.border = '3px solid red';
        hashtagField.setCustomValidity('Длина хэш-тега должна быть не более ' + maxHashtagLength + ' символов');
      } else {
        for (var j = 0; j < hashtags.length; j++) {
          if (hashtags[i].toLowerCase() === hashtags[j].toLowerCase() && i !== j) {
            var doubleTag = hashtags[j];
          }
        } if (doubleTag !== undefined) {
          hashtagField.style.border = '3px solid red';
          hashtagField.setCustomValidity('Теги не должны повторяться');
        } else {
          hashtagField.style.border = '';
          hashtagField.setCustomValidity('');
        }
      };
    }
  })

})();
