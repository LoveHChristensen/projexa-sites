const menu = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
menu?.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menu.setAttribute('aria-expanded', open);
  menu.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
});
document.querySelectorAll('.nav a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open'); menu?.setAttribute('aria-expanded', 'false');
}));
const form = document.querySelector('#signup-form');
const message = document.querySelector('#form-message');
form?.addEventListener('submit', event => {
  event.preventDefault();
  const email = document.querySelector('#email').value;
  message.textContent = `You’re on the list — see you soon at ${email}.`;
  form.reset();
});
