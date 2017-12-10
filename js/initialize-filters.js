'use strict';

(function () {

  window.initializeFilters = function (filter, image, callback) {

    var filtersArray = document.querySelectorAll('input[name="effect"]');
    var filtersValues = window.lib.getFieldValuesFromArray(filtersArray);

    filter.addEventListener('click', function () {

      for (var i = 0; i < filtersValues.length; i++) {
        if (filter.value !== filtersValues[i] && image.classList.contains('effect-' + filtersValues[i]));
        callback(filter.value, filtersValues[i]);
      }

      // Set default filter values

      var filterScale = document.querySelector('.upload-effect-level');
      var filterToggle = document.querySelector('.upload-effect-level-pin');
      var scaleLevel = document.querySelector('.upload-effect-level-val');
      window.lib.hideElement(filterScale);

      var defaultFilterValue = '20%';
      var setFilterEffectsDefault = function (effect, coefficient, unit) {
        filterToggle.style.left = defaultFilterValue;
        scaleLevel.style.width = defaultFilterValue;
        return image.style.filter = effect + '(' + (parseInt(defaultFilterValue) / coefficient) + unit + ')';
      };

      if (filter.value !== 'none') {
        window.lib.showElement(filterScale);

        switch (filter.value) {
          case 'chrome': setFilterEffectsDefault('grayscale', 100, '');
            break;
          case 'sepia': setFilterEffectsDefault('sepia', 100, '');
            break;
          case 'marvin': setFilterEffectsDefault('invert', 1, '%');
            break;
          case 'phobos': setFilterEffectsDefault('blur', 33, 'px');
            break;
          case 'heat': setFilterEffectsDefault('brightness', 33, '');
            break;
        }
      } else if (filter.value === 'none') {
        window.lib.hideElement(filterScale);
        image.style.filter = '';
      }
    });
  };

  window.filterSlider = function (toggle, scaleLevel, image) {

    var scaleWidth = 455;
    var percentScale = 4.55;
    var minScaleValue = 0;
    var maxScaleValue = 100;
    var effectLevel = document.querySelector('input[name="effect-level"]');

    toggle.addEventListener('mousedown', function (evt) {
      evt.preventDefault();

      var startCoords = {
        x: evt.clientX
      }

      var pinMouseMoveHandler = function (moveEvt) {
        moveEvt.preventDefault();

        var shift = {
          x: startCoords.x - moveEvt.clientX
        }

        startCoords = {
          x: moveEvt.clientX
        };

        toggle.style.left = ((toggle.offsetLeft - shift.x) / percentScale) + '%';
        scaleLevel.style.width = toggle.style.left;
        effectLevel.value = Math.floor((toggle.offsetLeft - shift.x) / percentScale);

        var toggleOffsetPercent = parseInt(toggle.style.left);

        if (toggleOffsetPercent <= minScaleValue) {
          toggle.style.left = minScaleValue + '%';
        } else if (toggleOffsetPercent >= maxScaleValue) {
          toggle.style.left = maxScaleValue + '%';
        }

        var setFilterEffects = function (filterName, effect, k, unit) {
          if (image.classList.contains(filterName)) {
            image.style.filter = effect + '(' + (toggleOffsetPercent / k) + unit + ')';
          }
        };

        setFilterEffects('effect-chrome', 'grayscale', 100, '');
        setFilterEffects('effect-sepia', 'sepia', 100, '');
        setFilterEffects('effect-marvin', 'invert', 1, '%');
        setFilterEffects('effect-phobos', 'blur', 33, 'px');
        setFilterEffects('effect-heat', 'brightness', 33, '');
      }

      var pinMouseUpHandler = function () {
        document.removeEventListener('mousemove', pinMouseMoveHandler);
        document.removeEventListener('mouseup', pinMouseUpHandler);
      }

      document.addEventListener('mousemove', pinMouseMoveHandler);
      document.addEventListener('mouseup', pinMouseUpHandler);
    })
  }

})();
