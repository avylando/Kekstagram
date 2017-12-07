'use strict';

(function () {

  window.initializeScale = function (elemDec, elemInc, callback) {

    // Variables

    var sizeValueField = document.querySelector('.upload-resize-controls-value');
    var sizeValueStep = parseInt(sizeValueField.step);
    var sizeValueMin = parseInt(sizeValueField.min);
    var sizeValueMax = parseInt(sizeValueField.max);
    var sizeValueNumber = null;
    var scaleK = null;

    elemDec.addEventListener('click', function (evt) {
      evt.preventDefault();
      sizeValueNumber = parseInt(sizeValueField.value);
      if (sizeValueNumber > sizeValueMin && sizeValueNumber <= sizeValueMax) {
        scaleK = sizeValueNumber - sizeValueStep;
        callback(scaleK);
      }
    })

    elemInc.addEventListener('click', function (evt) {
      evt.preventDefault();
      sizeValueNumber = parseInt(sizeValueField.value);
      if (sizeValueNumber >= sizeValueMin && sizeValueNumber < sizeValueMax) {
        scaleK = sizeValueNumber + sizeValueStep;
        callback(scaleK);
      }
    })
  }
})();
