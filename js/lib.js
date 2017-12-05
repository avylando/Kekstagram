'use strict';

(function () {
  window.lib = {
    getValueInRange: function (min, max) {
      var valueInRange = Math.round(Math.random() * (max - min) + min);
      return valueInRange;
    },

    getRandomValues: function (array, min, max) {
      var output = [];

      for (var j = 0; j < lib.getValueInRange(min, max); j++) {
        var randomValue = array[Math.floor(Math.random() * array.length)];
        output[j] = randomValue;
      }
      return output;
    },

    showElement: function (elem) {
      elem.classList.remove('hidden');
    },

    hideElement: function (elem) {
      elem.classList.add('hidden');
    },

    findClass: function (element, className) {
      return element.classList.contains(className);
    },

    showHideToggle: function (elemToggle, elemSet, evt) {
      if (evt.currentTarget === elemToggle && lib.findClass(elemSet, 'hidden') || evt.keyCode === lib.ENTER_KEYCODE) {
        elemSet.classList.remove('hidden');
      }

      if (evt.currentTarget !== elemToggle && !lib.findClass(elemSet, 'hidden') || evt.keyCode === lib.ESC_KEYCODE) {
        elemSet.classList.add('hidden');
      }
    },

    ENTER_KEYCODE: 13,
    ESC_KEYCODE: 27,

    showEnterKeydownHandler: function (elem, evt) {
      if (lib.findClass(elem, 'hidden') && evt.keyCode === ENTER_KEYCODE) {
        elem.classList.remove('hidden');
      }
    },

    hideKeydownHandler: function (elem, evt) {
      if (!lib.findClass(elem, 'hidden') && evt.keyCode === lib.ESC_KEYCODE || evt.keyCode === lib.ENTER_KEYCODE) {
        elem.classList.add('hidden');
      }
    },
  }

})();
