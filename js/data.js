'use strict';

(function () {

  // Variables

  // Load data from server

  var loadPhotos = function (data) {
    var photos = data;
    console.log(photos);

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

      photoCardInOverlay.querySelector('.gallery-overlay-image').src = elem.url;
      photoCardInOverlay.querySelector('.gallery-overlay-controls-comments').textContent = elem.comments;
      photoCardInOverlay.querySelector('.gallery-overlay-controls-like').textContent = elem.likes;
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

    var picturesBlock = document.querySelector('.pictures');
    picturesBlock.appendChild(fragmentCard);

    document.body.insertBefore(fragmentOverlay, galleryOverlay);

    window.showHidePhotos();
  }

  var errorLoad = function (message) {
    console.log(message);
  }

  window.backend.load(loadPhotos, errorLoad);

  // var likesMin = 15;
  // var likesMax = 200;
  // var variousComments = [
  //   'Всё отлично!',
  //   'В целом всё неплохо. Но не всё.',
  //   'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  //   'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  //   'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  //   'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
  // ];

  // var minComments = 1;
  // var maxComments = 2;


  // // Create PhotoLabel object

  // var generatePhotoLabel = function (i) {
  //   photoLabel = {
  //     url: 'photos/' + [i + 1] + '.jpg',
  //     likes: window.lib.getValueInRange(likesMin, likesMax),
  //     comments: []
  //   };

  //   return photoLabel;
  // };


  // // Create PhotoCards from template

  // var template = document.querySelector('template').content;
  // var picture = template.querySelector('.picture');

  // var generateCard = function (elem) {
  //   var photoCardElement = picture.cloneNode(true);

  //   photoCardElement.querySelector('img').src = elem.url;
  //   photoCardElement.querySelector('.picture-comments').textContent = elem.comments;
  //   photoCardElement.querySelector('.picture-likes').textContent = elem.likes;
  //   photoCardElement.classList.add('picture--label');

  //   return photoCardElement;
  // };


  // // Create Card in overlay

  // var galleryOverlay = document.querySelector('.gallery-overlay');

  // var generateCardInOverlay = function (elem) {
  //   var photoCardInOverlay = galleryOverlay.cloneNode(true);

  //   photoCardInOverlay.querySelector('.gallery-overlay-image').src = elem.url;
  //   photoCardInOverlay.querySelector('.gallery-overlay-controls-comments').textContent = elem.comments;
  //   photoCardInOverlay.querySelector('.gallery-overlay-controls-like').textContent = elem.likes;
  //   photoCardInOverlay.querySelector('.gallery-overlay-close').setAttribute('tabindex', '0');
  //   photoCardInOverlay.classList.add('gallery-overlay--card');

  //   return photoCardInOverlay;
  // };


  // // Create fragments

  // var fragmentCard = document.createDocumentFragment();
  // var fragmentOverlay = document.createDocumentFragment();


  // Generate photo labels and add to fragments

  // var photosNumber = 25;
  // var photoLabels = [];

  // for (var i = 0; i < photosNumber; i++) {

  //   var photoLabel = generatePhotoLabel(i);

  //   photoLabel.comments = window.lib.getRandomValues(variousComments, minComments, maxComments).join(' ');

  //   photoLabels[i] = photoLabel;

  //   fragmentCard.appendChild(generateCard(photoLabels[i]));
  //   fragmentOverlay.appendChild(generateCardInOverlay(photoLabels[i]));
  // }


  // // Add fragments in document

  // var picturesBlock = document.querySelector('.pictures');
  // picturesBlock.appendChild(fragmentCard);

  // var body = document.querySelector('body');
  // body.insertBefore(fragmentOverlay, galleryOverlay);

})();
