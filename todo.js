const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');
const addButton = document.getElementById('addButton');
const taskForm = document.getElementById('taskForm');

let tasks =JSON.parse(localStorage.getItem('tasks'))||[] ;
let taskIdCounter = tasks.length ? parseInt(tasks[tasks.length - 1].id.split('-')[1]) + 1 : 0;

window.addEventListener('DOMContentLoaded', displayTasks);

taskInput.addEventListener('input', () => {
    addButton.disabled = taskInput.value.trim() === '';
});

taskForm.addEventListener('submit', function(event) {
    event.preventDefault(); 
    addTask();
});
function addTask() {
    const taskText = taskInput.value.trim();
    const taskId = `task-${taskIdCounter++}`;
    const newTask = { id: taskId, title: taskText };
    tasks.push(newTask);
  localStorage.setItem('tasks', JSON.stringify(tasks));
    displayTasks();
    taskInput.value = '';
    addButton.disabled = true;
}

function createTaskElement(task) {
    const li = document.createElement('li');
    li.setAttribute('id', task.id);

    const span = document.createElement('span');
    span.textContent = task.title;
    li.appendChild(span);

    const actions = document.createElement('div');
    actions.className = 'actions';

    const editButton = document.createElement('button');
    editButton.className = 'edit';
    editButton.textContent = 'Edit';
    editButton.addEventListener('click', () => editTask(task.id, span, editButton));
    actions.appendChild(editButton);

    const deleteButton = document.createElement('button');
    deleteButton.className = 'delete';
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => deleteTask(task.id));
    actions.appendChild(deleteButton);

    li.appendChild(actions);
    taskList.appendChild(li);
}

function displayTasks() {
    tasks.forEach(task => createTaskElement(task));
}

function editTask(taskId, span, editButton) {
    const li = document.getElementById(taskId);
    const currentText = span.textContent;

    let input = document.createElement('input');
    input.type = 'text';
    input.value = currentText;
    input.className = 'edit-input';
    li.insertBefore(input, span);
    li.removeChild(span);

    input.focus();

    editButton.disabled = input.value.trim() === '';

    input.addEventListener('input', function() {
        editButton.disabled = input.value.trim() === '';
    });

    input.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            if (input.value.trim() !== '') {
                saveEdit(input, span, li, editButton, taskId);
            }
        } else if (event.key === 'Escape') {
            cancelEdit(input, span, li, currentText);
        }
    });

    input.addEventListener('blur', function() {
        if (input.value.trim() !== '') {
            saveEdit(input, span, li, editButton, taskId);
        } else {
            cancelEdit(input, span, li, currentText);
        }
    });
}

function saveEdit(input, span, li, editButton, taskId) {
    const newText = input.value.trim();
    span.textContent = newText;
    li.insertBefore(span, input);
    li.removeChild(input);
    editButton.disabled = false;

    const taskIndex = tasks.findIndex(task => task.id === taskId);
    tasks[taskIndex].title = newText;
    storage.set('tasks', tasks);
}

function cancelEdit(input, span, li, originalText) {
    span.textContent = originalText;
    li.insertBefore(span, input);
    li.removeChild(input);
}

function deleteTask(taskId) {
    const taskToDelete = document.getElementById(taskId);
    taskList.removeChild(taskToDelete);

    tasks = tasks.filter(task => task.id !== taskId);
    storage.set('tasks', tasks);
}

taskInput.addEventListener('keydown', function(event) {
    if (event.key === 'Enter' && taskInput.value.trim() !== '') {
        event.preventDefault();
        addTask();
    }
});
