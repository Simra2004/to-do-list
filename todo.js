const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');
const addButton = document.getElementById('addButton');

let taskIdCounter = 0;

function toggleAddButton() {
    addButton.disabled = taskInput.value.trim() === '';
}

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
    editButton.innerHTML = '<span class="material-icons">edit</span>';
    editButton.onclick = () => editTask(taskId, span);
    actions.appendChild(editButton);

    const deleteButton = document.createElement('button');
    deleteButton.className = 'delete';
    deleteButton.innerHTML = '<span class="material-icons">delete</span>';
    deleteButton.onclick = () => deleteTask(taskId);
    actions.appendChild(deleteButton);

    li.appendChild(actions);

    taskList.appendChild(li);
    taskInput.value = '';
    toggleAddButton();
}

function editTask(taskId, span) {

    const li = document.getElementById(taskId);
    const currentText = span.textContent;

    const input = document.createElement('input');
    input.type = 'text';
    input.value = currentText;
    input.className = 'edit-input';
    input.onblur = () => saveEdit(input, span, li);
    input.onkeydown = (e) => {
        if (e.key === 'Enter') saveEdit(input, span, li); 
        if (e.key === 'Escape') cancelEdit(input, span, li, currentText); 
    };

    li.replaceChild(input, span);
    input.focus();
}

function saveEdit(input, span, li) {
    const newText = input.value.trim();
    if (newText === '') {
     alert('Task cannot be empty.');
        input.focus();
        return;
    }
    span.textContent = newText;
    li.replaceChild(span, input);
}

function cancelEdit(input, span, li, originalText) {
    span.textContent = originalText; // Restore original text
    li.replaceChild(span, input);
}

function deleteTask(taskId) {
    const taskToDelete = document.getElementById(taskId);
    taskList.removeChild(taskToDelete);
}
