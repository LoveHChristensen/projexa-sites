const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
if (toggle) {
  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', open);
    toggle.setAttribute('aria-label', open ? 'Stäng meny' : 'Öppna meny');
  });
}
document.querySelectorAll('.nav a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open');
  toggle?.setAttribute('aria-expanded', 'false');
}));
document.querySelector('.newsletter form')?.addEventListener('submit', event => {
  event.preventDefault();
  const input = event.currentTarget.querySelector('input');
  input.value = '';
  input.placeholder = 'Tack — vi hörs snart!';
});
