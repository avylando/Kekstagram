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

    getFieldValuesFromArray: function (arr) {
      var fieldValues = [];
      for (var i = 0; i < arr.length; i++) {
        var fieldValue = arr[i].getAttribute('value');
        fieldValues[i] = fieldValue;
      }
      return fieldValues;
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

    // from keksobooking

    getRandomValue: function (array) {
      var randomIndex = Math.floor(Math.random() * array.length);
      return array[randomIndex];
    },

    getValueInRange: function (min, max) {
      return Math.round(Math.random() * (max - min) + min);
    },

    getUniqueValues: function (array) {
      var filteredArray = array.filter(function (it, i) {
        return array.indexOf(it) === i;
      });
      return filteredArray;
    },

    findClass: function (element, className) {
      return element.classList.contains(className);
    },

    addClassToAll: function (array, className) {
      array.forEach(function (elem) {
        elem.classList.add(className);
      });
    },

    addClassToRandom: function (array, className, number) {
      for (var i = 0; i < number; i++) {
        var randomIndex = Math.floor(Math.random() * array.length);
        array[randomIndex].classList.add(className);
      }
    },

    removeClassFromAll: function (array, className) {
      array.forEach(function (elem) {
        elem.classList.remove(className);
      });
    },

    removeClassFromRandom: function (array, className, number) {
      for (var i = 0; i < number; i++) {
        if (i < array.length) {
          var randomIndex = Math.floor(Math.random() * array.length);
          if (array[randomIndex].classList.contains(className)) {
            array[randomIndex].classList.remove(className);
          } else {
            --i;
          }
        } else {
          break;
        }

      }
    },

    removeElementsAttribute: function (array, attribute) {
      array.forEach(function (elem) {
        elem.removeAttribute(attribute);
      });
    },

    setEndings: function (number, titles) {
      var cases = [2, 0, 1, 1, 1, 2];
      return titles[ (number%100>4 && number%100<20)? 2 : cases[(number%10<5)?number%10:5] ];
    }
  }

})();
