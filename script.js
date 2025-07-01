// Carrega tarefas salvas
document.addEventListener('DOMContentLoaded', loadTasks);

function addTask() {
  const input = document.getElementById('taskInput');
  const text = input.value.trim();
  if (text === '') return;

  const li = createTaskElement(text);
  document.getElementById('taskList').appendChild(li);

  saveTask(text, false);
  input.value = '';
}

function createTaskElement(text, completed = false) {
  const li = document.createElement('li');
  li.textContent = text;
  if (completed) li.classList.add('completed');

  li.addEventListener('click', () => {
    li.classList.toggle('completed');
    updateStorage();
  });

  const btn = document.createElement('button');
  btn.textContent = 'X';
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    li.remove();
    updateStorage();
  });

  li.appendChild(btn);
  return li;
}

function saveTask(text, completed) {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.push({ text, completed });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function updateStorage() {
  const tasks = [];
  document.querySelectorAll('#taskList li').forEach(li => {
    tasks.push({ text: li.childNodes[0].nodeValue, completed: li.classList.contains('completed') });
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.forEach(task => {
    const li = createTaskElement(task.text, task.completed);
    document.getElementById('taskList').appendChild(li);
  });
}
