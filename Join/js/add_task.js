let allTasks = [];
let SubtaskArray = [];

function addTask() { // this function creates a JSON array that holds the title, description, etc. of the task you want to add
    const taskTitle = document.getElementById('task-title').value;
    const taskDescription = document.getElementById('task-description').value;
    const assignedName = document.getElementById('assignedName').value;
    const dueDateStr = document.getElementById('dueDate').value;
    const dueDate = new Date(dueDateStr).getTime();
    const priority = getSelectedPriority();
    const category = document.getElementById('category').value;
    const subtask = SubtaskArray;

    console.log('task-title', taskTitle);
    console.log('task-description', taskDescription);
    console.log('dueDate', dueDate);

    let task = {
        'title': taskTitle,
        'description': taskDescription,
        'assignedName': assignedName,
        'dueDate': dueDate, // dueDate represents Unix timestamp. Needs to be re-converted later?
        'priority': priority,
        'category': category,
        'subtasks': subtask,
    }

    allTasks.push(task);
    let allTasksAsString = JSON.stringify(allTasks);
}

function getSelectedPriority() {
    const urgentButton = document.getElementById('urgent');
    const mediumButton = document.getElementById('medium');
    const lowButton = document.getElementById('low');

    if (urgentButton.classList.contains('urgent')) {
        return 'urgent';
    } else if (mediumButton.classList.contains('medium')) {
        return 'medium';
    } else if (lowButton.classList.contains('low')) {
        return 'low';
    }
}

function urgentButton() { //this function handles the clicking/unclicking of the urgent button
    let img = document.getElementById('urgent-img');
    const urgentButton = document.getElementById('urgent');
    const mediumButton = document.getElementById('medium');
    const lowButton = document.getElementById('low');

    if (!urgentButton.classList.contains('urgent')) {
        urgentButton.classList.add('urgent');
        img.src = 'assets/img/urgent.png';
    } else {
        urgentButton.classList.remove('urgent');
        img.src = 'assets/img/urgent_no_bg.png';
    }

    mediumButton.classList.remove('medium');
    lowButton.classList.remove('low');
}

function mediumButton() { //this function handles the clicking/unclicking of the medium button
    let img = document.getElementById('medium-img');
    const urgentButton = document.getElementById('urgent');
    const mediumButton = document.getElementById('medium');
    const lowButton = document.getElementById('low');

    if (!mediumButton.classList.contains('medium')) {
        mediumButton.classList.add('medium');
        img.src = 'assets/img/medium.png';
    } else {
        mediumButton.classList.remove('medium');
        img.src = 'assets/img/medium_no_bg.png';
    }

    urgentButton.classList.remove('urgent');
    lowButton.classList.remove('low');
}

function lowButton() { //this function handles the clicking/unclicking of the low button
    let img = document.getElementById('low-img');
    const urgentButton = document.getElementById('urgent');
    const mediumButton = document.getElementById('medium');
    const lowButton = document.getElementById('low');

    if (!lowButton.classList.contains('low')) {
        lowButton.classList.add('low');
        img.src = 'assets/img/low.png';
    } else {
        lowButton.classList.remove('low')
        img.src = 'assets/img/low_no_bg.png';
    }

    urgentButton.classList.remove('urgent');
    mediumButton.classList.remove('medium');
}

    // Subtask-Section

function transformIntoInput() { //this function activates the input field to add subtasks
    const subtaskButton = document.getElementById('add-subtask-button');

    const input = document.createElement('div');
    input.placeholder = 'Add Subtask';
    input.innerHTML = `
    <div id="subtask" class="subtask-button">
        <input id="subtask-input" class="subtask-input" placeholder="Contact Form">
        <div>
            <img onclick="revertBackToButton()" class="exit" id="exit" src="assets/img/cancel.png">
            <img onclick="addNewTaskToList()" class="tick" id="tick" src="assets/img/check.png">
        </div>
    </div>`;

    subtaskButton.replaceWith(input);
    input.focus();
}

function addNewTaskToList() { // this function pushes added subtasks into an array and renders them into a list below the input field
    let subtaskContainer = document.getElementById('subtask-list');
    let newSubtask = document.getElementById('subtask-input').value;
    SubtaskArray.push(newSubtask);
    subtaskContainer.innerHTML = '';

    for (let i = 0; i < SubtaskArray.length; i++) {
        const addedTask = SubtaskArray[i];
        subtaskContainer.innerHTML += `<li class="addtask-list-element">${addedTask}</li>`;
    }
}

function revertBackToButton() { // this function handles the deactivation of the subtask-input
    const input = document.getElementById('subtask');
    const subtaskButton = document.createElement('div');

    subtaskButton.innerHTML = `
        <button class="subtask-button-inactive border-radius-6" onclick="transformIntoInput()" id="add-subtask-button">
            <span> Add new subtask </span>
            <img src="assets/img/addtask.png" class="plus-sign" id="plus-sign">
        </button>
    `;

    input.replaceWith(subtaskButton);
}