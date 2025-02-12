const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');
const addButton = document.getElementById('addButton');

let taskIdCounter = 0;

taskInput.addEventListener('input', () => {
    addButton.disabled = taskInput.value.trim() === '';
});

addButton.addEventListener('click', addTask);

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

    const saveButton = document.createElement('button');
    saveButton.className = 'save';
    saveButton.textContent = 'Save';
    saveButton.addEventListener('click', () => saveEdit(input, span, li, editButton, saveButton));
    li.querySelector('.actions').appendChild(saveButton);

    editButton.style.display = 'none';
    input.focus();
}

function saveEdit(input, span, li, editButton, saveButton) {
    const newText = input.value.trim();
    if (newText === '') {
        alert('Task cannot be empty.');
        input.focus();
        return;
    }
    span.textContent = newText;
    li.insertBefore(span, input);
    li.removeChild(input);

    saveButton.remove();
    editButton.style.display = 'inline-block';
}

function deleteTask(taskId) {
    const taskToDelete = document.getElementById(taskId);
    taskList.removeChild(taskToDelete);
}
