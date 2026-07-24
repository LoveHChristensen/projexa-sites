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
    direction: 0,
    speed: 0
  };

  const carWidth = 46;
  const carHeight = 56;
  const mouseIsActive = () => performance.now() - state.lastMove < 1200;
  const clamp = (value, min, max) => Math.max(min, Math.min(max, value));
  const normalizeAngle = angle => Math.atan2(Math.sin(angle), Math.cos(angle));

  function chooseWanderTarget() {
    const padding = 48;
    state.tx = padding + Math.random() * Math.max(1, window.innerWidth - padding * 2);
    state.ty = padding + Math.random() * Math.max(1, window.innerHeight - padding * 2);
    state.wanderAt = performance.now() + 2400 + Math.random() * 3000;
  }

  window.addEventListener('pointermove', event => {
    state.mouseX = event.clientX;
    state.mouseY = event.clientY;
    state.lastMove = performance.now();
  }, { passive: true });

  window.addEventListener('resize', () => {
    state.x = clamp(state.x, 0, window.innerWidth);
    state.y = clamp(state.y, 0, window.innerHeight);
  });

  function drive(now) {
    const active = mouseIsActive();
    if (active) {
      state.tx = state.mouseX;
      state.ty = state.mouseY;
    } else if (now > state.wanderAt || Math.hypot(state.tx - state.x, state.ty - state.y) < 24) {
      chooseWanderTarget();
    }

    const dx = state.tx - state.x;
    const dy = state.ty - state.y;
    const distance = Math.hypot(dx, dy);
    const targetSpeed = active ? 1.2 : 0.68;

    if (distance > 2) {
      const desiredDirection = Math.atan2(dy, dx) + Math.PI / 2;
      const steering = normalizeAngle(desiredDirection - state.direction);
      const maxTurn = 0.042;
      state.direction += clamp(steering, -maxTurn, maxTurn);
      state.speed += (targetSpeed - state.speed) * 0.035;

      const alignment = Math.max(0.25, Math.cos(normalizeAngle(desiredDirection - state.direction)));
      const forward = Math.min(state.speed * alignment, distance);
      state.x += Math.sin(state.direction) * forward;
      state.y -= Math.cos(state.direction) * forward;
    } else {
      state.speed *= 0.95;
    }

    const marginX = carWidth / 2;
    const marginY = carHeight / 2;
    state.x = clamp(state.x, marginX, window.innerWidth - marginX);
    state.y = clamp(state.y, marginY, window.innerHeight - marginY);
    car.style.transform = `translate3d(${state.x - marginX}px, ${state.y - marginY}px, 0) rotate(${state.direction}rad)`;
    requestAnimationFrame(drive);
  }

  chooseWanderTarget();
  requestAnimationFrame(drive);
})();
