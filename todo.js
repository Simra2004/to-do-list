// DOM Elements
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');
const addButton = document.getElementById('addButton');
const taskForm = document.getElementById('taskForm');

let taskIdCounter = 0;

// Toggle Add button state based on input value
taskInput.addEventListener('input', () => {
    addButton.disabled = taskInput.value.trim() === '';
});

// Handle form submission for adding task
taskForm.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form reload
    addTask();
});

function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText === '') return;

    const taskId = `task-${taskIdCounter++}`;

    const li = document.createElement('li');
    li.setAttribute('id', taskId);

    const span = document.createElement('span');
    span.textContent = taskText;
    li.appendChild(span);

    const actions = document.createElement('div');
    actions.className = 'actions';

    const editButton = document.createElement('button');
    editButton.className = 'edit';
    editButton.textContent = 'Edit';
    editButton.addEventListener('click', () => editTask(taskId, span, editButton));
    actions.appendChild(editButton);

    const deleteButton = document.createElement('button');
    deleteButton.className = 'delete';
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => deleteTask(taskId));
    actions.appendChild(deleteButton);

    li.appendChild(actions);
    taskList.appendChild(li);

    taskInput.value = '';
    addButton.disabled = true;
}

function editTask(taskId, span, editButton) {
    const li = document.getElementById(taskId);
    const currentText = span.textContent;

    const input = document.createElement('input');
    input.type = 'text';
    input.value = currentText;
    input.className = 'edit-input';
    li.insertBefore(input, span);
    li.removeChild(span);

    input.focus();

    input.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            saveEdit(input, span, li, editButton);
        } else if (event.key === 'Escape') {
            cancelEdit(input, span, li, currentText);
        }
    });
}

function saveEdit(input, span, li, editButton) {
    const newText = input.value.trim();
    span.textContent = newText || "Untitled Task";
    li.insertBefore(span, input);
    li.removeChild(input);
}

function cancelEdit(input, span, li, originalText) {
    span.textContent = originalText;
    li.insertBefore(span, input);
    li.removeChild(input);
}

function deleteTask(taskId) {
    const taskToDelete = document.getElementById(taskId);
    taskList.removeChild(taskToDelete);
}
