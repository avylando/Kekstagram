'use strict';

(function () {

  // Variables

  var labelCards = document.querySelectorAll('.picture--label');
  var overlayCards = document.querySelectorAll('.gallery-overlay--card');
  var overlayClose = document.querySelectorAll('.gallery-overlay--card .gallery-overlay-close');


  // Add event listeners

  // Show/hide overlay

  for (var i = 0; i < labelCards.length; i++) {
    labelCards[i].addEventListener('click', function (event) {
      event.preventDefault();
      for (var i = 0; i < overlayCards.length; i++) {
        window.lib.showHideToggle(labelCards[i], overlayCards[i], event);
      }
    })

    overlayClose[i].addEventListener('click', function (evt) {
      evt.preventDefault();
      for (var i = 0; i < overlayCards.length; i++) {
        overlayCards[i].classList.add('hidden');
        window.lib.hideKeydownHandler(overlayCards[i], evt);
      }
    })
  }

  document.addEventListener('keydown', function (evt) {
    for (var i = 0; i < overlayCards.length; i++) {
      window.lib.hideKeydownHandler(overlayCards[i], evt);
    }
  })

})();
