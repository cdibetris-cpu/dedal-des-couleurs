'use strict';

// Sans JavaScript, la navigation reste visible. Avec JS, le menu mobile se replie.
document.documentElement.classList.add('js');
const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation-principale');
const mobileScreen = window.matchMedia('(max-width: 760px)');

function closeMenu() {
  if (!menuButton || !navigation) return;
  menuButton.setAttribute('aria-expanded', 'false');
  navigation.classList.remove('is-open');
}
if (menuButton && navigation) {
  menuButton.addEventListener('click', () => {
    const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', String(!isOpen));
    navigation.classList.toggle('is-open', !isOpen);
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && navigation.classList.contains('is-open')) {
      closeMenu();
      menuButton.focus();
    }
  });
  navigation.addEventListener('click', event => {
    if (event.target.closest('a') && mobileScreen.matches) closeMenu();
  });
  mobileScreen.addEventListener('change', () => {
    if (mobileScreen.matches && navigation.contains(document.activeElement)) menuButton.focus();
    if (!mobileScreen.matches && document.activeElement === menuButton) navigation.querySelector('a').focus();
    closeMenu();
  });
}
