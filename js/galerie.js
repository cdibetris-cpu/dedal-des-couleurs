'use strict';

// Les filtres masquent les cartes localement ; aucune requête réseau.
const filterBar = document.querySelector('[data-filters]');
if (filterBar) {
  const cards = [...document.querySelectorAll('[data-category]')];
  const count = document.querySelector('#filter-count');
  filterBar.hidden = false;
  filterBar.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', () => {
      const selected = button.dataset.filter;
      let visible = 0;
      cards.forEach(card => {
        card.hidden = selected !== 'all' && card.dataset.category !== selected;
        if (!card.hidden) visible++;
      });
      filterBar.querySelectorAll('button').forEach(control => {
        control.setAttribute('aria-pressed', String(control === button));
      });
      count.textContent = visible + (visible === 1 ? ' œuvre affichée' : ' œuvres affichées');
    });
  });
}
