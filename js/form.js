'use strict';

(function () {

  // Variables

  var uploadButton = document.querySelector('#upload-file');
  var uploadForm = document.querySelector('.upload-form');
  var uploadOverlay = uploadForm.querySelector('.upload-overlay');
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


  var defaultFilterValue = '20%';
  var setFilterEffectsDefault = function (effect, k, unit) {
    return imagePreview.style.filter = effect + '(' + (parseInt(defaultFilterValue) / k) + unit + ')';
  };

  // Hide scale by default
  var filterScale = uploadForm.querySelector('.upload-effect-level');
  var numberScale = filterScale.querySelector('.upload-effect-level-value');

  window.lib.hideElement(filterScale);
  window.lib.hideElement(numberScale);

  var addFilterByClass = function (elem, className, evt) {
    for (var i = 0; i < filterClasses.length; i++) {
      if (elem.classList.contains(filterClasses[i]) && filterClasses[i] !== className) {
        elem.classList.remove(filterClasses[i]);
      }
    }

    elem.classList.add(className);

    // Set default filter values
    if (className !== 'effect-none') {
      window.lib.showElement(filterScale);

      switch (className) {
        case 'effect-chrome': setFilterEffectsDefault('grayscale', 100, '');
          break;
        case 'effect-sepia': setFilterEffectsDefault('sepia', 100, '');
          break;
        case 'effect-marvin': setFilterEffectsDefault('invert', 1, '%');
          break;
        case 'effect-phobos': setFilterEffectsDefault('blur', 33, 'px');
          break;
        case 'effect-heat': setFilterEffectsDefault('brightness', 33, '');
          break;
      }
    } else if (className === 'effect-none') {
      window.lib.hideElement(filterScale);
      imagePreview.style.filter = '';
    }
  }

  var filterToggle = uploadForm.querySelector('.upload-effect-level-pin');
  var scaleLevel = uploadForm.querySelector('.upload-effect-level-val');

  filterControls.addEventListener('click', function (evt) {

    if (evt.target.tagName.toLowerCase() === 'input') {
      var filterClassActive = (evt.target.name + '-' + evt.target.value).toString();

      addFilterByClass(imagePreview, filterClassActive, evt);
      filterToggle.style.left = defaultFilterValue;
      scaleLevel.style.width = defaultFilterValue;
    }
  }, true);


  // Filter toggle drag

  var scaleWidth = 455;
  var percentScale = 4.55;
  var minScaleValue = 0;
  var maxScaleValue = 100;

  filterToggle.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    }

    var pinMouseMoveHandler = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      }

      console.log(filterToggle.offsetLeft);

      startCoords = {
        x: moveEvt.clientX
      };

      filterToggle.style.left = ((filterToggle.offsetLeft - shift.x) / percentScale) + '%';
      scaleLevel.style.width = filterToggle.style.left;

      var toggleOffsetPercent = parseInt(filterToggle.style.left);

      if (toggleOffsetPercent <= minScaleValue) {
        filterToggle.style.left = minScaleValue + '%';
      } else if (toggleOffsetPercent >= maxScaleValue) {
        filterToggle.style.left = maxScaleValue + '%';
      }

      var setFilterEffects = function (filterName, effect, k, unit) {
        if (imagePreview.classList.contains(filterName)) {
          // filterToggle.style.left = defaultFilterValue;
          // scaleLevel.style.width = defaultFilterValue;
          imagePreview.style.filter = effect + '(' + (toggleOffsetPercent / k) + unit + ')';
        }
      };

      setFilterEffects('effect-chrome', 'grayscale', 100, '');
      setFilterEffects('effect-sepia', 'sepia', 100, '');
      setFilterEffects('effect-marvin', 'invert', 1, '%');
      setFilterEffects('effect-phobos', 'blur', 33, 'px');
      setFilterEffects('effect-heat', 'brightness', 33, '');

      // if (imagePreview.classList.contains('effect-chrome')) {
      //   imagePreview.style.filter = 'grayscale(' + (toggleOffsetPercent / 100) + ')';
      // } else if (imagePreview.classList.contains('effect-sepia')) {
      //   imagePreview.style.filter = 'sepia(' + (toggleOffsetPercent / 100) + ')';
      // } else if (imagePreview.classList.contains('effect-marvin')) {
      //   imagePreview.style.filter = 'invert(' + toggleOffsetPercent + '%)';
      // } else if (imagePreview.classList.contains('effect-phobos')) {
      //   imagePreview.style.filter = 'blur(' + (toggleOffsetPercent / 33) + 'px)';
      // } else if (imagePreview.classList.contains('effect-heat')) {
      //   imagePreview.style.filter = 'brightness(' + (toggleOffsetPercent / 33) + ')';
      // }
    }

    var pinMouseUpHandler = function () {
      document.removeEventListener('mousemove', pinMouseMoveHandler);
    }

    document.addEventListener('mousemove', pinMouseMoveHandler);
    document.addEventListener('mouseup', pinMouseUpHandler);
  })


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
