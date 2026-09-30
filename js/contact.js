'use strict';

// Inscription pédagogique : validation, retour accessible, puis effacement des champs.
// Aucune requête, aucun cookie, aucun stockage ni journalisation des données.
const form = document.querySelector('#registration-form');
if (form) {
  const fields = [...form.querySelectorAll('input')];
  const status = document.querySelector('#form-status');
  const submitButton = form.querySelector('button[type="submit"]');

  function validateField(field) {
    field.setCustomValidity('');
    let message = '';
    if (!field.value.trim()) {
      message = 'Veuillez renseigner ce champ.';
    } else if (field.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value.trim())) {
      message = 'Saisissez une adresse email valide, par exemple nom@exemple.fr.';
    } else if (!field.validity.valid) {
      message = 'Vérifiez le format de ce champ.';
    }
    field.setCustomValidity(message);
    field.setAttribute('aria-invalid', String(Boolean(message)));
    const error = document.querySelector('#' + field.id + '-error');
    error.textContent = message;
    error.hidden = !message;
    return !message;
  }

  form.addEventListener('submit', event => {
    event.preventDefault();
    status.textContent = '';
    fields.forEach(field => { field.value = field.value.trim(); });
    const valid = fields.map(validateField).every(Boolean);
    if (!valid) {
      status.textContent = 'Le formulaire contient des erreurs. Vérifiez les champs indiqués.';
      fields.find(field => !field.validity.valid).focus();
      return;
    }
    form.reset();
    fields.forEach(field => { field.setCustomValidity(''); field.removeAttribute('aria-invalid'); });
    status.textContent = 'Votre formulaire est valide. Dans le cadre de ce projet, aucune inscription n’est enregistrée et aucune donnée n’est envoyée.';
  });
  fields.forEach(field => {
    field.addEventListener('input', () => {
      status.textContent = '';
      if (field.hasAttribute('aria-invalid')) validateField(field);
    });
  });
  // Activation après installation de l'interception de la soumission.
  form.noValidate = true;
  submitButton.disabled = false;
}

// Les liens légaux ouvrent leur panneau HTML natif.
function openLegalSection() {
  const section = document.getElementById(window.location.hash.slice(1));
  if (section && section.tagName === 'DETAILS') section.open = true;
}
openLegalSection();
window.addEventListener('hashchange', openLegalSection);
