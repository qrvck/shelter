let pageBody = document.querySelector('.page__body');

let header = document.querySelector('.header');
let navToggle = document.querySelector('.header__toggle');
let headerNav = document.querySelector('.header__nav');
let headerNavList = document.querySelector('.header__nav-list');
let background;

function closeMenu() {
  navToggle.classList.remove('header__toggle--mobile-open');
  headerNav.classList.remove('header__nav--mobile-open');
  pageBody.style.overflow = '';
  background.remove()
}

// opening / closing menu

function createGrayBackground() {
  let element = document.createElement('div');
  element.classList.add('page__mobile-menu-background');
  return element;
}

navToggle.addEventListener('click', function () {
  if (!navToggle.classList.contains('header__toggle--mobile-open')) {
    navToggle.classList.add('header__toggle--mobile-open');
    headerNav.classList.add('header__nav--mobile-open');
    pageBody.style.overflow = 'hidden';
    background = createGrayBackground();
    header.prepend(background);
  } else {
    closeMenu()
  }
});

// close menu on link click

headerNavList.addEventListener('click', function (event) {
  if (event.target.tagName === 'A') {
    closeMenu()
  }
})

// close menu on dark area click

pageBody.addEventListener('click', function (event) {
  if (event.target === background) {
    closeMenu()
  }
})
