'use strict';

var likesMin = 15;
var likesMax = 200;
var variousComments = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

var minComments = 1;
var maxComments = 2;


// Useful functions

var getValueInRange = function (min, max) {
  var valueInRange = Math.round(Math.random() * (max - min) + min);

  return valueInRange;
};

var getRandomValues = function (array, min, max) {
  var output = [];

  for (var j = 0; j < getValueInRange(min, max); j++) {
    var randomValue = array[Math.floor(Math.random() * array.length)];
    output[j] = randomValue;
  }

  return output;

};

var generatePhotoLabel = function () {
  photoLabel = {
    url: 'photos/' + [i + 1] + '.jpg',
    likes: getValueInRange(likesMin, likesMax),
    comments: []
  };

  return photoLabel;
};

// Create PhotoCards from template

var template = document.querySelector('template').content;
var picture = template.querySelector('.picture');

var generateCard = function () {
  var photoCard = picture.cloneNode(true);

  photoCard.querySelector('img').src = photoLabel.url;
  photoCard.querySelector('.picture-comments').textContent = photoLabel.comments;
  photoCard.querySelector('.picture-likes').textContent = photoLabel.likes;

  return photoCard;
};

var galleryOverlay = document.querySelector('.gallery-overlay');

galleryOverlay.classList.remove('hidden');

var generateCardInOverlay = function () {
  var photoCardInOverlay = galleryOverlay.cloneNode(true);

  photoCardInOverlay.querySelector('.gallery-overlay-image').src = photoLabel.url;
  photoCardInOverlay.querySelector('.gallery-overlay-controls-comments').textContent = photoLabel.comments;
  photoCardInOverlay.querySelector('.gallery-overlay-controls-like').textContent = photoLabel.likes;

  return photoCardInOverlay;
};

// Create fragments

var fragmentCard = document.createDocumentFragment();
var fragmentOverlay = document.createDocumentFragment();

var labelsNumber = 25;
var labels = [];

for (var i = 0; i < labelsNumber; i++) {

  var photoLabel = generatePhotoLabel();

  photoLabel.comments = getRandomValues(variousComments, minComments, maxComments);

  labels[i] = photoLabel;

  fragmentCard.appendChild(generateCard());
  fragmentOverlay.appendChild(generateCardInOverlay());
}

var pictures = document.querySelector('.pictures');

pictures.appendChild(fragmentCard);
galleryOverlay.appendChild(fragmentOverlay);


