'use strict';

(function () {

  // Variables

  var picturesBlock = document.querySelector('.pictures');
  var overlayContainer = document.querySelector('.overlay__container');

  // Load data from server

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

  var updateLikesCounter = function (params) {

    var loadLikes = function(obj) {
      var card = document.querySelector('div[data-card-id="' + obj.id + '"]'),
          likeCounter = card.querySelector('.likes-count'),
          picture = document.querySelector('a[data-pic-id="' + obj.id + '"]'),
          likeStat = picture.querySelector('.picture-likes'),
          likeBtn = card.querySelector('.likes-button');
      likeCounter.textContent = obj.likes;
      likeStat.textContent = obj.likes;

      likeBtn.setAttribute('disabled', 'disabled');
      likeBtn.classList.add('likes-button--active');
    }

    window.backend.load(loadLikes, errorLoad, params);
  };

  var updateComments = function (params) {

    var loadComment = function (obj) {
      var card = document.querySelector('div[data-card-id="' + obj.photo_id + '"]'),
          commentsBlock = card.querySelector('.gallery-overlay-controls-comments'),
          commentCounter = card.querySelector('.comments-count'),
          textarea = card.querySelector('.comment-textarea'),
          commentsNumber = parseInt(commentCounter.textContent, 10) + 1,
          comment = document.createElement('div');

      if (obj.message !== "") {
        commentCounter.textContent = commentsNumber;
        card.querySelector('.comments-sub').textContent = window.lib.setEndings(commentsNumber, [' комментарий', ' комментария', ' комментариев']);
        comment.className = 'gallery-comment';
        comment.innerHTML = '<img class="comment-icon" src="img/user-icon.svg" width="20" height="20"> «' + obj.message + '»';
        commentsBlock.insertAdjacentElement('beforeEnd', comment);
        textarea.value = '';
      }
    };

    window.backend.load(loadComment, errorLoad, params);
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
      photoCardElement.setAttribute('data-pic-id', parseInt(elem.id, 10));

      return photoCardElement;
    };

    var galleryOverlay = document.querySelector('.gallery-overlay');

    var generateCardInOverlay = function (elem) {
      var photoCardInOverlay = galleryOverlay.cloneNode(true),
          commentsBlock = photoCardInOverlay.querySelector('.gallery-overlay-controls-comments'),
          likeForm = photoCardInOverlay.querySelector('.like-form'),
          commentForm = photoCardInOverlay.querySelector('.comment-form'),
          commentsCount = elem.comments[0] === "" ? 0 : elem.comments.length;

      photoCardInOverlay.setAttribute('data-card-id', parseInt(elem.id, 10));
      photoCardInOverlay.querySelector('.gallery-overlay-image').src = elem.url;

      elem.comments.forEach(function(com) {
        if (com !== "") {
          var comment = document.createElement('div');
          comment.className = 'gallery-comment';
          comment.innerHTML = '<img class="comment-icon" src="img/user-icon.svg" width="20" height="20"> «' + com + '»';
          commentsBlock.insertAdjacentElement('beforeEnd', comment);
        }
      })

      photoCardInOverlay.querySelector('.comments-count').textContent = commentsCount;
      photoCardInOverlay.querySelector('.comments-sub').textContent = window.lib.setEndings(commentsCount, [' комментарий', ' комментария', ' комментариев']);

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
        var textarea = commentForm.querySelector('textarea');
        if (textarea.validity.valueMissing || textarea.validity.tooShort) {
          evt.preventDefault();
          textarea.setCustomValidity("Напишите Ваш комментарий");
        } else {
          var formData = new FormData(commentForm);
          window.backend.save(formData, updateComments, errorLoad, 'POST', '?comment&id=' + elem.id);
          evt.preventDefault();
        }
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
