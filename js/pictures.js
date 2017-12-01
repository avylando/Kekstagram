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

var generateCard = function (elem) {
  var photoCardElement = picture.cloneNode(true);

  photoCardElement.querySelector('img').src = elem.url;
  photoCardElement.querySelector('.picture-comments').textContent = elem.comments;
  photoCardElement.querySelector('.picture-likes').textContent = elem.likes;

  return photoCardElement;
};

var galleryOverlay = document.querySelector('.gallery-overlay');

// galleryOverlay.classList.remove('hidden');

var generateCardInOverlay = function (elem) {

  var photoCardInOverlay = galleryOverlay.cloneNode(true);

  photoCardInOverlay.querySelector('.gallery-overlay-image').src = elem.url;
  photoCardInOverlay.querySelector('.gallery-overlay-controls-comments').textContent = elem.comments;
  photoCardInOverlay.querySelector('.gallery-overlay-controls-like').textContent = elem.likes;

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

  fragmentCard.appendChild(generateCard(photoLabel));
  fragmentOverlay.appendChild(generateCardInOverlay(photoLabel));
}
var pictures = fragmentCard.querySelectorAll('.picture');
var cardsOverlay = fragmentOverlay.querySelectorAll('.gallery-overlay');

var picturesBlock = document.querySelector('.pictures');
picturesBlock.appendChild(fragmentCard);

var body = document.querySelector('body');
body.appendChild(fragmentOverlay);


console.log(cardsOverlay);

// Add event listeners on photos

var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

var mapPinsClickHandler = function (evt) {
  for (var j = 0; j < pictures.length; j++) {
    if (evt.currentTarget === pictures[j] || evt.keyCode === ENTER_KEYCODE) {
      cardsOverlay[j].classList.remove('hidden');
      debugger;
    }

    if (evt.currentTarget !== pictures[j]) {
      cardsOverlay[j].classList.add('hidden');
    }
  }
};

pictures[0].addEventListener('click', function () {
  cardsOverlay[0].classList.remove('hidden');
});

// for (var j = 0; j < pictures.length; j++) {
//   pictures[j].addEventListener('click', mapPinsClickHandler);

//   // popupClose = cardsArr[j].querySelector('.popup__close');
//   // popupClose.addEventListener('click', popupCloseClickHandler);
//   // popupClose.addEventListener('keydown', popupEnterCloseHandler);
// }

// if (window.event) {
//   window.event.returnValue = false;
// } else {
//   evt.returnValue = false;
// return false;
// }


// var photoCards = document.querySelectorAll('.picture');

// var showOverlayClickHandler = function (evt, arrCards, arrOverlay) {
//   for (var j = 0; j < arrCards.length; j++) {
//     console.log(arrCards[j].querySelector('img'));
//     if (evt.target === arrCards[j].querySelector('img')) {
//       console.log(arrOverlay[j]);
//       arrOverlay[j].classList.remove('hidden');
//       return false;
//     }
//   }
// };

// body.addEventListener('click', function (evt) {
//   showOverlayClickHandler(evt, photoCards, cardsOverlay);
// })

// console.log(photoCards[1].querySelector('img').getAttribute('src'));
// console.log(photoCards);

// var fragmentAdd = function (elem, arrLabels) {
//   console.log(elem);
//   for (var j = 0; j < arrLabels.length; j++) {
//     if (elem.querySelector('img').getAttribute('src') === arrLabels[j].url) {
//       fragmentOverlay.appendChild(generateCardInOverlay(arrLabels[j]));
//       console.log(fragmentOverlay);
//       return fragmentOverlay;
//       // body.insertBefore(fragmentOverlay, galleryOverlay);
//     }
//   }
//   // body.removeChild(galleryOverlay);
//   // console.log(body);
//   // return body.insertBefore(fragmentOverlay, templateTag);
// };

// var showOverlayClickHandler = function (arrCards, arrLabels) {
//   for (var j = 0; j < arrCards.length; j++) {
//     arrCards[j].addEventListener('click', function (evt) {
//       for (var j = 0; j < arrCards.length; j++) {
//         if (evt.currentTarget === arrCards[j]) {
//           var x = fragmentAdd(arrCards[j], arrLabels);
//           console.log(x);
//           return x;
//         }
//       }
//     })
//   }
// }
// var y = showOverlayClickHandler(photoCards, labels);
// console.log(y);

// console.log(fragmentOverlay.content);


