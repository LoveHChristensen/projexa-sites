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

/* Lugn 8-bitarsbil: följer musen under rörelse och jagar sedan fotgängare. */
(() => {
  const car = document.getElementById('road-runner');
  const pedestrianLayer = document.getElementById('pixel-pedestrians');
  const scoreElement = document.getElementById('score-value');
  const scoreBox = document.getElementById('game-score');
  if (!car || !pedestrianLayer || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const state = {
    x: window.innerWidth * 0.72,
    y: window.innerHeight * 0.26,
    tx: window.innerWidth * 0.58,
    ty: window.innerHeight * 0.48,
    mouseX: 0,
    mouseY: 0,
    lastMove: 0,
    direction: 0,
    speed: 0,
    score: 0,
    mode: 'hunt',
    targetPerson: null
  };
  const people = [];
  const carWidth = 46;
  const carHeight = 56;
  const mouseIsActive = () => performance.now() - state.lastMove < 800;
  const clamp = (value, min, max) => Math.max(min, Math.min(max, value));
  const normalizeAngle = angle => Math.atan2(Math.sin(angle), Math.cos(angle));

  function randomPosition() {
    const padding = 55;
    return {
      x: padding + Math.random() * Math.max(1, window.innerWidth - padding * 2),
      y: padding + Math.random() * Math.max(1, window.innerHeight - padding * 2)
    };
  }

  function makePerson(index) {
    const person = document.createElement('div');
    person.className = 'pixel-person walking';
    person.innerHTML = '<i class="pp-head"></i><i class="pp-hair"></i><i class="pp-body"></i><i class="pp-arm pp-arm-left"></i><i class="pp-arm pp-arm-right"></i><i class="pp-leg pp-leg-left"></i><i class="pp-leg pp-leg-right"></i>';
    pedestrianLayer.appendChild(person);
    const position = randomPosition();
    people.push({
      element: person,
      x: position.x,
      y: position.y,
      direction: Math.random() * Math.PI * 2,
      turnAt: performance.now() + 900 + Math.random() * 2300,
      active: true,
      index
    });
  }

  function respawnPerson(person) {
    const position = randomPosition();
    person.x = position.x;
    person.y = position.y;
    person.direction = Math.random() * Math.PI * 2;
    person.turnAt = performance.now() + 1000 + Math.random() * 2200;
    person.active = true;
    person.element.classList.remove('collected');
    person.element.classList.add('walking');
  }

  function updateScore() {
    state.score += 10;
    scoreElement.textContent = String(state.score).padStart(3, '0');
    scoreBox.classList.remove('scored');
    void scoreBox.offsetWidth;
    scoreBox.classList.add('scored');
  }

  function updatePeople(now) {
    people.forEach(person => {
      if (!person.active) return;
      if (now > person.turnAt) {
        person.direction += (Math.random() - 0.5) * 1.9;
        person.turnAt = now + 1100 + Math.random() * 2600;
      }
      const walkSpeed = 0.22;
      person.x += Math.cos(person.direction) * walkSpeed;
      person.y += Math.sin(person.direction) * walkSpeed;
      const margin = 16;
      if (person.x < margin || person.x > window.innerWidth - margin || person.y < margin || person.y > window.innerHeight - margin) {
        person.direction += Math.PI * (0.7 + Math.random() * 0.6);
        person.x = clamp(person.x, margin, window.innerWidth - margin);
        person.y = clamp(person.y, margin, window.innerHeight - margin);
      }
      person.element.style.transform = `translate3d(${person.x - 9}px, ${person.y - 15}px, 0)`;
      if (Math.hypot(state.x - person.x, state.y - person.y) < 27) {
        person.active = false;
        if (state.targetPerson === person) state.targetPerson = null;
        person.element.classList.remove('walking');
        person.element.classList.add('collected');
        updateScore();
        window.setTimeout(() => respawnPerson(person), 1500 + Math.random() * 1200);
      }
    });
  }

  function chooseTargetPerson() {
    const activePeople = people.filter(person => person.active);
    if (!activePeople.length) return null;
    return activePeople.reduce((closest, person) => {
      const personDistance = Math.hypot(person.x - state.x, person.y - state.y);
      const closestDistance = Math.hypot(closest.x - state.x, closest.y - state.y);
      return personDistance < closestDistance ? person : closest;
    });
  }

  window.addEventListener('pointermove', event => {
    state.mouseX = event.clientX;
    state.mouseY = event.clientY;
    state.lastMove = performance.now();
    state.mode = 'mouse';
  }, { passive: true });

  window.addEventListener('resize', () => {
    state.x = clamp(state.x, 0, window.innerWidth);
    state.y = clamp(state.y, 0, window.innerHeight);
  });

  function drive(now) {
    const active = mouseIsActive();
    const mouseDistance = Math.hypot(state.mouseX - state.x, state.mouseY - state.y);

    if (active && mouseDistance > 24) {
      state.mode = 'mouse';
      state.tx = state.mouseX;
      state.ty = state.mouseY;
    } else {
      /* När bilen nått musen, eller musen slutat röra sig, börjar den jaga en gubbe. */
      state.mode = 'hunt';
      if (!state.targetPerson || !state.targetPerson.active) state.targetPerson = chooseTargetPerson();
      if (state.targetPerson) {
        state.tx = state.targetPerson.x;
        state.ty = state.targetPerson.y;
      }
    }

    const dx = state.tx - state.x;
    const dy = state.ty - state.y;
    const distance = Math.hypot(dx, dy);
    const targetSpeed = state.mode === 'mouse' ? 1.2 : 0.82;
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
    updatePeople(now);
    requestAnimationFrame(drive);
  }

  for (let index = 0; index < 3; index += 1) makePerson(index);
  requestAnimationFrame(drive);
})();
