import pets from '../assets/pets.json';

let cardsContainer = document.querySelector('.our-friends__cards-container');
let btnBack = document.querySelector('.our-friends__slider-btn--back');
let btnForward = document.querySelector('.our-friends__slider-btn--forward');
let leftCards = document.querySelector('.our-friends__cards--left');
let rightCards = document.querySelector('.our-friends__cards--right');
let centerCards = document.querySelector('.our-friends__cards--center');


// click forward / back

function createPet(i) {
  let cardWrap = document.createElement('div');
  cardWrap.classList.add('friend-card');
  cardWrap.id = `${pets[i].name}`;

  let img = document.createElement('img');
  img.classList.add('friend-card__img');
  img.src = `${pets[i].img}`;
  cardWrap.append(img);
  
  let p = document.createElement('p');
  p.classList.add('friend-card__name');
  p.innerHTML = `${pets[i].name}`;
  cardWrap.append(p);
  
  let btn = document.createElement('button');
  btn.classList.add('friend-card__learn-btn');
  btn.innerHTML = 'Learn more';
  cardWrap.append(btn);

  return cardWrap;
}

function addThreeRandomCards(cards) {
  let i = 0;
  while (i < 3) {
    let randomNumber = Math.floor(Math.random() * 8);
    let id = pets[randomNumber].name;
    if (!cards.querySelector(`#${id}`) && !centerCards.querySelector(`#${id}`)) {
      let card = createPet(randomNumber);
      cards.append(card);
      i++;
    }
  }
}

function moveLeft() {
  leftCards.innerHTML = '';
  addThreeRandomCards(leftCards);
  cardsContainer.classList.add('our-friends__cards-container--transition-left');
  btnBack.removeEventListener('click', moveLeft);
  btnForward.removeEventListener('click', moveRight);
}

function moveRight() {
  rightCards.innerHTML = '';
  addThreeRandomCards(rightCards);
  cardsContainer.classList.add('our-friends__cards-container--transition-right');
  btnBack.removeEventListener('click', moveLeft);
  btnForward.removeEventListener('click', moveRight);
}

btnBack.addEventListener('click', moveLeft);
btnForward.addEventListener('click', moveRight);


// end slider animation

cardsContainer.addEventListener('animationend', function (event) {
  if (event.animationName === 'move-left') {
    centerCards.innerHTML = leftCards.innerHTML;
    cardsContainer.classList.remove('our-friends__cards-container--transition-left');
    btnBack.addEventListener('click', moveLeft);
    btnForward.addEventListener('click', moveRight);
  } else {
    centerCards.innerHTML = rightCards.innerHTML;
    cardsContainer.classList.remove('our-friends__cards-container--transition-right');
    btnBack.addEventListener('click', moveLeft);
    btnForward.addEventListener('click', moveRight);
  }
})
