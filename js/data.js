'use strict';

(function () {

  // Variables

  var picturesBlock = document.querySelector('.pictures');
  var overlayContainer = document.querySelector('.overlay__container');

  // Load data from server

  var loadPhotos = function (data) {
    var photos = data;

    // Create PhotoCards from template

    var template = document.querySelector('template').content;
    var picture = template.querySelector('.picture');

    var generateCard = function (elem) {
      var photoCardElement = picture.cloneNode(true);

      photoCardElement.querySelector('img').src = elem.url;
      photoCardElement.querySelector('.picture-comments').textContent = elem.comments;
      photoCardElement.querySelector('.picture-likes').textContent = elem.likes;
      photoCardElement.classList.add('picture--label');

      return photoCardElement;
    };

    var galleryOverlay = document.querySelector('.gallery-overlay');

    var generateCardInOverlay = function (elem) {
      var photoCardInOverlay = galleryOverlay.cloneNode(true);
      var commentsBlock = photoCardInOverlay.querySelector('.gallery-overlay-controls-comments');

      photoCardInOverlay.querySelector('.gallery-overlay-image').src = elem.url;

      elem.comments.forEach(function(com) {
        var comment = document.createElement('div');
        comment.className = 'gallery-comment';
        comment.textContent = com;
        commentsBlock.insertAdjacentElement('beforeEnd', comment);
      })

      commentsBlock.querySelector('.comments-count').textContent = elem.comments.length;
      commentsBlock.querySelector('.comments-sub').textContent = window.lib.setEndings(elem.comments.length, ['комментарий', 'комментария', 'комментариев']);
      photoCardInOverlay.querySelector('.gallery-overlay-controls-like .likes-count').textContent = elem.likes;
      photoCardInOverlay.querySelector('.gallery-overlay-close').setAttribute('tabindex', '0');
      photoCardInOverlay.classList.add('gallery-overlay--card');

      return photoCardInOverlay;
    };


    // Create fragments

    var fragmentCard = document.createDocumentFragment();
    var fragmentOverlay = document.createDocumentFragment();

    // Filling fragments

    for (var i = 0; i < photos.length; i++) {
      fragmentCard.appendChild(generateCard(photos[i]));
      fragmentOverlay.appendChild(generateCardInOverlay(photos[i]));
    }

    // Add fragments in document

    picturesBlock.appendChild(fragmentCard);
    overlayContainer.appendChild(fragmentOverlay);

    window.showHidePhotos();
  }

  var errorLoad = function (message) {
    var errorPopup = document.createElement('div');
    // Popup position
    errorPopup.style.position = 'absolute';
    errorPopup.style.left = '40px';
    errorPopup.style.top = '20px';
    errorPopup.style.zIndex = '100';
    // Popup style
    errorPopup.style.width = '150px';
    errorPopup.style.padding = '10px';
    errorPopup.style.backgroundColor = 'red';
    errorPopup.style.opacity = '0.7';
    errorPopup.style.borderRadius = '10px';
    // Popup font style
    errorPopup.style.fontSize = '12px';
    errorPopup.style.color ='#ffffff';
    errorPopup.style.textAlign = 'center';
    //
    errorPopup.textContent = message;

    document.body.insertAdjacentElement('afterbegin', errorPopup);
  };

  window.backend.load(loadPhotos, errorLoad);

  window.data = {
    updatePhotos: function () {
      picturesBlock.innerHTML = '';
      overlayContainer.innerHTML = '';

      window.backend.load(loadPhotos, errorLoad);
    }
  }

})();
