document.querySelectorAll('.task button').forEach(button => {
  button.addEventListener('click', () => {
    const task = button.closest('.task');
    task.classList.toggle('is-complete');
    button.textContent = task.classList.contains('is-complete') ? '✓' : '○';
  });
});

const filterButton = document.getElementById('filterButton');
const tasks = [...document.querySelectorAll('.task')];
let filter = 'all';
filterButton.addEventListener('click', () => {
  filter = filter === 'all' ? 'build' : filter === 'build' ? 'project' : filter === 'project' ? 'explore' : 'all';
  const labels = { all: 'Alla uppgifter', build: 'Bygg', project: 'Projekt', explore: 'Utforska' };
  filterButton.innerHTML = `${labels[filter]} <span>⌄</span>`;
  tasks.forEach(task => task.style.display = filter === 'all' || task.dataset.type === filter ? 'grid' : 'none');
});

document.getElementById('completeToggle').addEventListener('click', () => {
  document.getElementById('resan').scrollIntoView({ behavior: 'smooth' });
});
