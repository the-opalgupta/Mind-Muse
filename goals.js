// goals.js with enhanced edit/delete buttons, point edit, and scroll/profile buttons

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

const form = document.querySelector('form');
const taskInput = document.getElementById('task');
const taskSection = document.querySelector('section');
const signOffBtn = document.querySelector('#sign-off button');
const signOffContainer = document.getElementById('sign-off');

function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function createTaskElement(taskObj, index) {
  const container = document.createElement('div');
  container.classList.add('task-item');
  container.style.marginBottom = '1rem';
  container.style.position = 'relative';

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.id = `task-${index}`;
  checkbox.checked = taskObj.completed;

  const label = document.createElement('label');
  label.setAttribute('for', checkbox.id);
  label.textContent = `${taskObj.name} (${taskObj.points} pts)`;
  label.style.marginLeft = '8px';

  checkbox.addEventListener('change', () => {
    taskObj.completed = checkbox.checked;
    saveTasks();
    if (checkbox.checked) triggerConfetti(container);
  });

  const btnWrapper = document.createElement('div');
  btnWrapper.style.display = 'inline-block';
  btnWrapper.style.marginLeft = '12px';

  const editBtn = document.createElement('button');
  editBtn.innerHTML = '✏️ Edit';
  editBtn.className = 'task-btn edit';
  editBtn.onclick = () => {
    const newName = prompt('Edit task name:', taskObj.name);
    if (newName && newName.trim() !== '') {
      taskObj.name = newName.trim();
    }
    const newPoints = prompt('Edit points for this task:', taskObj.points);
    const pts = parseInt(newPoints);
    if (!isNaN(pts)) {
      taskObj.points = pts;
    }
    saveTasks();
    renderTasks();
  };

  const deleteBtn = document.createElement('button');
  deleteBtn.innerHTML = '🗑️ Remove';
  deleteBtn.className = 'task-btn delete';
  deleteBtn.onclick = () => {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
  };

  btnWrapper.appendChild(editBtn);
  btnWrapper.appendChild(deleteBtn);

  container.appendChild(checkbox);
  container.appendChild(label);
  container.appendChild(btnWrapper);

  return container;
}

function renderTasks() {
  taskSection.innerHTML = '<h3>Your Current Tasks</h3>';
  tasks.forEach((task, i) => {
    const el = createTaskElement(task, i);
    taskSection.appendChild(el);
  });
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const taskName = taskInput.value.trim();
  if (taskName === '') return;

  const points = prompt('Assign points for this task (1-100):', '10');
  const task = {
    name: taskName,
    points: parseInt(points) || 10,
    completed: false,
  };
  tasks.push(task);
  saveTasks();
  renderTasks();
  taskInput.value = '';
});

signOffBtn.addEventListener('click', () => {
  const totalPoints = tasks.reduce((sum, t) => sum + t.points, 0);
  const completedPoints = tasks.filter(t => t.completed).reduce((sum, t) => sum + t.points, 0);
  const percent = totalPoints ? Math.round((completedPoints / totalPoints) * 100) : 0;

  const quotes = [
    '“Little steps make big dreams.” ✨',
    '“You showed up. That’s enough.” 🌸',
    '“Keep becoming — you’re doing great.” 🌱',
    '“The quiet effort matters too.” 🌙'
  ];
  const quote = quotes[Math.floor(Math.random() * quotes.length)];

  let existingBox = document.getElementById('summary-box');
  if (existingBox) existingBox.remove();

  const summaryBox = document.createElement('div');
  summaryBox.id = 'summary-box';
  summaryBox.innerHTML = `
    <div style="
      background: linear-gradient(to right, #f3e5f5, #e0f7fa);
      border-radius: 18px;
      padding: 2rem;
      max-width: 500px;
      margin: 1.5rem auto 0 auto;
      box-shadow: 0 6px 24px rgba(171, 143, 200, 0.25);
      font-family: 'Lora', serif;
      text-align: center;
      animation: fadeIn 1s ease;
    ">
      <h2>✨ Daily Summary ✨</h2>
      <p><strong>Tasks Completed:</strong> ${tasks.filter(t => t.completed).length} / ${tasks.length}</p>
      <p><strong>Points Earned:</strong> ${completedPoints} / ${totalPoints}</p>
      <p><strong>Accomplished:</strong> ${percent}%</p>
      <p style="font-style: italic; margin-top: 1rem;">${quote}</p>
    </div>
  `;

  signOffContainer.appendChild(summaryBox);
});

function triggerConfetti(container) {
  const sparkle = document.createElement('span');
  sparkle.textContent = '✨';
  sparkle.style.position = 'absolute';
  sparkle.style.fontSize = '1.5rem';
  sparkle.style.left = '10%';
  sparkle.style.animation = 'floatUp 1s ease-out';

  container.appendChild(sparkle);
  setTimeout(() => sparkle.remove(), 1000);
}

const style = document.createElement('style');
style.textContent = `
@keyframes floatUp {
  0% { transform: translateY(0); opacity: 1; }
  100% { transform: translateY(-30px); opacity: 0; }
}

@keyframes fadeIn {
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
}

.task-btn {
  border: none;
  border-radius: 8px;
  padding: 5px 10px;
  margin: 0 4px;
  font-size: 0.85rem;
  cursor: pointer;
  font-family: 'Quicksand', sans-serif;
  transition: background 0.3s;
}
.task-btn.edit {
  background-color: #d8c4ff;
  color: #4b0082;
}
.task-btn.edit:hover {
  background-color: #bca4ec;
}
.task-btn.delete {
  background-color: #ffcdd2;
  color: #c62828;
}
.task-btn.delete:hover {
  background-color: #f8a5ae;
}

#scrollTopBtn, #profileBtn {
  position: fixed;
  z-index: 999;
  padding: 10px 14px;
  border: none;
  border-radius: 50%;
  font-size: 18px;
  cursor: pointer;
  box-shadow: 0 4px 10px rgba(0,0,0,0.2);
  transition: all 0.3s ease;
}

#scrollTopBtn {
  bottom: 20px;
  right: 20px;
  background-color: #a678de;
  color: white;
}
#scrollTopBtn:hover {
  background-color: #7d55c7;
}

#profileBtn {
  top: 20px;
  right: 20px;
  background-color: #eadcf8;
  color: #5B3E96;
}
#profileBtn:hover {
  background-color: #d3b4ef;
}
`;
document.head.appendChild(style);

// Add scroll & profile buttons
const scrollBtn = document.createElement('button');
scrollBtn.id = 'scrollTopBtn';
scrollBtn.innerHTML = '↑';
scrollBtn.onclick = () => window.scrollTo({ top: 0, behavior: 'smooth' });
document.body.appendChild(scrollBtn);

const profileBtn = document.createElement('button');
profileBtn.id = 'profileBtn';
profileBtn.innerHTML = '👤';
profileBtn.onclick = () => window.location.href = '/profile.html';
document.body.appendChild(profileBtn);

renderTasks();

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
tasks.push({ text: taskText, completed: false }); // When adding
localStorage.setItem("tasks", JSON.stringify(tasks));

