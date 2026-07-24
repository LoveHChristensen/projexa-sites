document.getElementById('year').textContent = new Date().getFullYear();

document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', event => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      event.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

/* En lugn liten 8-bitars bil som söker sig mot musen och annars cruisar vidare. */
(() => {
  const car = document.getElementById('road-runner');
  if (!car || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const state = {
    x: window.innerWidth * 0.72,
    y: window.innerHeight * 0.26,
    tx: window.innerWidth * 0.58,
    ty: window.innerHeight * 0.48,
    mouseX: 0,
    mouseY: 0,
    lastMove: 0,
    wanderAt: 0,
    direction: 0
  };

  const carWidth = 56;
  const carHeight = 34;
  const mouseIsActive = () => performance.now() - state.lastMove < 1200;
  const clamp = (value, min, max) => Math.max(min, Math.min(max, value));

  function chooseWanderTarget() {
    const padding = 35;
    state.tx = padding + Math.random() * Math.max(1, window.innerWidth - padding * 2);
    state.ty = padding + Math.random() * Math.max(1, window.innerHeight - padding * 2);
    state.wanderAt = performance.now() + 2200 + Math.random() * 2600;
  }

  window.addEventListener('pointermove', event => {
    state.mouseX = event.clientX;
    state.mouseY = event.clientY;
    state.lastMove = performance.now();
  }, { passive: true });

  window.addEventListener('resize', () => {
    state.x = clamp(state.x, 0, window.innerWidth - carWidth);
    state.y = clamp(state.y, 0, window.innerHeight - carHeight);
  });

  function drive(now) {
    if (mouseIsActive()) {
      state.tx = state.mouseX;
      state.ty = state.mouseY;
    } else if (now > state.wanderAt || Math.hypot(state.tx - state.x, state.ty - state.y) < 24) {
      chooseWanderTarget();
    }

    const dx = state.tx - state.x;
    const dy = state.ty - state.y;
    const distance = Math.hypot(dx, dy);
    const speed = mouseIsActive() ? 1.15 : 0.62;

    if (distance > 2) {
      state.x += (dx / distance) * Math.min(speed, distance);
      state.y += (dy / distance) * Math.min(speed, distance);
      state.direction = Math.atan2(dy, dx) * 180 / Math.PI;
    }

    const boundedX = clamp(state.x, 0, window.innerWidth - carWidth);
    const boundedY = clamp(state.y, 0, window.innerHeight - carHeight);
    state.x = boundedX;
    state.y = boundedY;
    car.style.transform = `translate3d(${boundedX - carWidth / 2}px, ${boundedY - carHeight / 2}px, 0) rotate(${state.direction}deg)`;
    requestAnimationFrame(drive);
  }

  chooseWanderTarget();
  requestAnimationFrame(drive);
})();
