import pets from '../assets/pets.json';

let cardsWrapper = document.querySelector('.pets__cards-wrapper');
let cardsContainer = document.querySelector('.pets__cards-container');
let widthWrapper = cardsWrapper.clientWidth;

let btnFirst = document.querySelector('.pets__pagination-btn--first');
let btnBack = document.querySelector('.pets__pagination-btn--back');
let btnNext = document.querySelector('.pets__pagination-btn--next');
let btnLast = document.querySelector('.pets__pagination-btn--last');
let page = document.querySelector('.pets__pagination-btn--page');

let fortyEightPets = [];
let psevdoRandomArr;

// utils

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function create48Pets(array) {
  let result = [];
  for (let i = 0; i < 6; i++) {
    shuffleArray(array);
    result.push(...array);
  }
  return result
}

fortyEightPets = create48Pets(pets);

function getPseudoRandomArr() {
  let res = fortyEightPets.splice(0, 8);
  let index = 0;

  while (fortyEightPets.length >= 1) {
    let nextItems = fortyEightPets[index];
    let sliceLastFive = res.slice(-5);
    if (!sliceLastFive.includes(nextItems)) {
      fortyEightPets.splice(index, 1)
      res.push(nextItems);
      index = 0;
    } else {
      index++;
    }
  }

  return res;
}

psevdoRandomArr = getPseudoRandomArr();

function createPetCards(arr) {
  let result = []

  arr.forEach(element => {
    let cardWrap = document.createElement('div');
    cardWrap.classList.add('friend-card');
    cardWrap.id = `${element.name}`;

    let img = document.createElement('img');
    img.classList.add('friend-card__img');
    img.src = `${element.img}`;
    cardWrap.append(img);

    let p = document.createElement('p');
    p.classList.add('friend-card__name');
    p.innerHTML = `${element.name}`;
    cardWrap.append(p);

    let btn = document.createElement('button');
    btn.classList.add('friend-card__learn-btn');
    btn.innerHTML = 'Learn more';
    cardWrap.append(btn);

    result.push(cardWrap)
  });

  return result;
}

let petsCard = createPetCards(psevdoRandomArr);
cardsContainer.innerHTML = '';
cardsContainer.append(...petsCard);


let left = 0;
let countPage = 1;
let stepLeft;
let lastPage;

if (widthWrapper > 1199) {
  stepLeft = 1240;
  lastPage = 6;
} else if (widthWrapper > 579) {
  stepLeft = 620;
  lastPage = 8;
} else {
  stepLeft = 310;
  lastPage = 16;
}

function moveToNext() {
  left -= stepLeft;
  countPage++;
  cardsContainer.style.left = `${left}px`;
  page.innerHTML = countPage;
  btnBack.classList.add('pets__pagination-btn--active');
  btnFirst.classList.add('pets__pagination-btn--active');
  btnBack.addEventListener('click', moveToBack);
  btnFirst.addEventListener('click', moveToFirst);
  if (left === -stepLeft * (lastPage - 1)) {
    btnNext.classList.remove('pets__pagination-btn--active');
    btnLast.classList.remove('pets__pagination-btn--active');
    btnNext.removeEventListener('click', moveToNext);
    btnLast.removeEventListener('click', moveToLast);
  }
}

function moveToLast() {
  left = -stepLeft * (lastPage - 1);
  cardsContainer.style.left = `${left}px`;
  countPage = lastPage;
  page.innerHTML = countPage;

  btnNext.classList.remove('pets__pagination-btn--active');
  btnLast.classList.remove('pets__pagination-btn--active');
  btnBack.classList.add('pets__pagination-btn--active');
  btnFirst.classList.add('pets__pagination-btn--active');
  btnBack.addEventListener('click', moveToBack);
  btnFirst.addEventListener('click', moveToFirst);
  btnNext.removeEventListener('click', moveToNext);
  btnLast.removeEventListener('click', moveToLast);
}

function moveToBack() {
  left += stepLeft;
  cardsContainer.style.left = `${left}px`;
  countPage--;
  page.innerHTML = countPage;
  btnNext.classList.add('pets__pagination-btn--active');
  btnLast.classList.add('pets__pagination-btn--active');
  btnNext.addEventListener('click', moveToNext);
  btnLast.addEventListener('click', moveToLast);
  if (left === 0) {
    btnBack.classList.remove('pets__pagination-btn--active');
    btnFirst.classList.remove('pets__pagination-btn--active');
    btnBack.removeEventListener('click', moveToBack);
    btnFirst.removeEventListener('click', moveToFirst);
  }
}

function moveToFirst() {
  left = 0;
  cardsContainer.style.left = `${left}px`;
  countPage = 1;
  page.innerHTML = countPage;

  btnBack.classList.remove('pets__pagination-btn--active');
  btnFirst.classList.remove('pets__pagination-btn--active');
  btnNext.classList.add('pets__pagination-btn--active');
  btnLast.classList.add('pets__pagination-btn--active');

  btnNext.addEventListener('click', moveToNext);
  btnLast.addEventListener('click', moveToLast);
  btnBack.removeEventListener('click', moveToBack);
  btnFirst.removeEventListener('click', moveToFirst);
}


btnNext.addEventListener('click', moveToNext);
btnLast.addEventListener('click', moveToLast);
