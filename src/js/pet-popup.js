import pets from '../assets/pets.json';

let pageBody = document.querySelector('.page__body');
let cardsContainer = document.querySelector('.our-friends__cards-container');

let petPopup = document.querySelector('.pet-popup');
let petPopupImg = petPopup.querySelector('.pet-popup__img');
let petPopupName = petPopup.querySelector('.pet-popup__name');
let petPopupBreed = petPopup.querySelector('.pet-popup__breed');
let petPopupAbout = petPopup.querySelector('.pet-popup__about');
let petPopupAge = petPopup.querySelector('.pet-popup__age');
let petPopupInoculations = petPopup.querySelector('.pet-popup__inoculations');
let petPopupDiseases = petPopup.querySelector('.pet-popup__diseases');
let petPopupParasites = petPopup.querySelector('.pet-popup__parasites');

let closeBtn = petPopup.querySelector('.pet-popup__close-btn');
let background;

function createBackground() {
  let element = document.createElement('div');
  element.classList.add('page__popup-background');
  return element;
}

function closePopup() {
  petPopup.classList.remove('pet-popup--open');
  pageBody.style.overflow = '';
  background.remove();
}

// open / close popup

cardsContainer.addEventListener('click', function (event) {
  let target = event.target;

  if (target.closest('.friend-card')) {
    let ClickCard = target.closest('.friend-card');
    let idClickCard = ClickCard.id;

    let getCardData = pets.find(item => item.name === idClickCard);
    petPopup.id = getCardData.name;
    petPopupImg.src = getCardData.img;
    petPopupName.innerHTML = getCardData.name;
    petPopupBreed.innerHTML = getCardData.type + ' - ' + getCardData.breed;
    petPopupAbout.innerHTML = getCardData.description;
    petPopupAge.innerHTML = getCardData.age;
    petPopupInoculations.innerHTML = getCardData.inoculations.join(', ');
    petPopupDiseases.innerHTML = getCardData.diseases.join(', ');
    petPopupParasites.innerHTML = getCardData.parasites.join(', ');

    pageBody.style.overflow = 'hidden';
    background = createBackground();
    petPopup.before(background);
    petPopup.classList.add('pet-popup--open')
  }
})

closeBtn.addEventListener('click', function () {
  closePopup()
})

pageBody.addEventListener('click', function (event) {
  if (event.target === background) {
    closePopup()
  }
})