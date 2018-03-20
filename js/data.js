'use strict';

(function () {

  // Variables

  var picturesBlock = document.querySelector('.pictures');
  var overlayContainer = document.querySelector('.overlay__container');

  // Load data from server

  var updateLikesCounter = function (params) {

    window.backend.load(function (obj) {
      var card = document.querySelector('div[data-id="' + obj.id + '"]');
      var likeCounter = card.querySelector('.likes-count');
      likeCounter.textContent = obj.likes;

      var likeBtn = card.querySelector('.likes-button');
      likeBtn.setAttribute('disabled', 'disabled');
      likeBtn.classList.add('likes-button--active');
    }, function () {console.log('Ошибка')}, params);
  };

  var updateComments = function (params) {

    window.backend.load(function (obj) {
      var card = document.querySelector('div[data-id="' + obj.id + '"]'),
          commentsBlock = card.querySelector('.gallery-overlay-controls-comments'),
          commentCounter = card.querySelector('.comments-count');
          commentsCount = elem.comments[0] === "" ? 0 : elem.comments.length;
      likeCounter.textContent = commentsCount;

      commentsBlock.querySelector('.comments-sub').textContent = window.lib.setEndings(commentsCount, ['комментарий', 'комментария', 'комментариев']);

      obj.comments.forEach(function(com) {
        var comment = document.createElement('div');
        comment.className = 'gallery-comment';
        comment.textContent = com;
        commentsBlock.insertAdjacentElement('beforeEnd', comment);
      })
    },
    function () {console.log('Ошибка')},
    params);
  };

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

  var loadPhotos = function (data) {
    var photos = data;

    // Create PhotoCards from template

    var template = document.querySelector('template').content;
    var picture = template.querySelector('.picture');

    var generateCard = function (elem) {
      var photoCardElement = picture.cloneNode(true);

      photoCardElement.querySelector('img').src = elem.url;
      photoCardElement.querySelector('.picture-likes').textContent = elem.likes;
      photoCardElement.classList.add('picture--label');

      return photoCardElement;
    };

    var galleryOverlay = document.querySelector('.gallery-overlay');

    var generateCardInOverlay = function (elem) {
      var photoCardInOverlay = galleryOverlay.cloneNode(true),
          commentsBlock = photoCardInOverlay.querySelector('.gallery-overlay-controls-comments'),
          likeForm = photoCardInOverlay.querySelector('.like-form'),
          commentForm = photoCardInOverlay.querySelector('.comment-form');

      photoCardInOverlay.setAttribute('data-id', parseInt(elem.id, 10));
      photoCardInOverlay.querySelector('.gallery-overlay-image').src = elem.url;

      elem.comments.forEach(function(com) {
        var comment = document.createElement('div');
        comment.className = 'gallery-comment';
        comment.textContent = com;
        commentsBlock.insertAdjacentElement('beforeEnd', comment);
      })

      var commentsCount = elem.comments[0] === "" ? 0 : elem.comments.length;
      console.log(elem);
      commentsBlock.querySelector('.comments-count').textContent = commentsCount;
      commentsBlock.querySelector('.comments-sub').textContent = window.lib.setEndings(commentsCount, ['комментарий', 'комментария', 'комментариев']);

      photoCardInOverlay.querySelector('.gallery-overlay-controls-like .likes-count').textContent = elem.likes;
      photoCardInOverlay.querySelector('.gallery-overlay-close').setAttribute('tabindex', '0');
      photoCardInOverlay.classList.add('gallery-overlay--card');
      photoCardInOverlay.querySelector('.photo-id').value = elem.id;

      likeForm.addEventListener('submit', function (evt) {
        var formData = new FormData(likeForm);
        window.backend.save(formData, updateLikesCounter, errorLoad, 'GET', '?like&id=' + elem.id);
        evt.preventDefault();
      });

      commentForm.addEventListener('submit', function (evt) {
        var formData = new FormData(commentForm);
        window.backend.save(formData, updateCounter, errorLoad, 'POST', '?comment&id=' + elem.id);
        evt.preventDefault();
      });

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

  window.backend.load(loadPhotos, errorLoad, '?data');

  window.data = {
    updatePhotos: function () {
      picturesBlock.innerHTML = '';
      overlayContainer.innerHTML = '';

      window.backend.load(loadPhotos, errorLoad, '?data');
    }
  }

})();
