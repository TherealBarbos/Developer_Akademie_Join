let states = [];

function openAddTaskOverlay(state) {
    states.splice(0, 1, state);
    if (window.innerWidth >= 820) {
        document.getElementById('add-task-on-board').classList.add('active');
        document.getElementById('board').classList.add('blurout')
    } else {window.location.replace("../html/add_task.html")}
}

function closeAddTaskOverlay() {
    document.getElementById('add-task-on-board').classList.remove('active');
    document.getElementById('board').classList.remove('blurout')
}

async function addTaskBoard() { // this fills the JSON array "allTasks" which holds the title, description, etc. of the task you want to add and saves them in the remote storage
    const uniqueID = new Date().getTime();
    const taskTitle = document.getElementById('task-title').value;
    const taskDescription = document.getElementById('task-description').value;
    const dueDateStr = document.getElementById('dueDate').value;
    const dueDate = new Date(dueDateStr).getTime();
    const priority = getSelectedPriority();
    const prioritySource = getSelectedPriorityImageSource();
    const category = document.getElementById('category').value;
    const subtask = SubtaskArray;

    let task = {
        'id': uniqueID,
        'state': states,
        'title': taskTitle,
        'description': taskDescription,
        'assignedName': assignedToTask,
        'assignedInitial': assignedInitial,
        'dueDate': dueDate,
        'priority': priority,
        'priorityImageSource': prioritySource,
        'category': category,
        'subtasks': subtask,
    }

    allTasks.push(task);
    await setItem('allTasks', JSON.stringify(allTasks));
    clearInputs();
}

function clearInputs() {
    document.getElementById('task-title').value = '';
    document.getElementById('task-description').value = '';
    document.getElementById('assignedName').value = '';
    document.getElementById('dueDate').value = '';
    document.getElementById('urgent').classList.remove('urgent');
    document.getElementById('urgent-img').src = '../img/urgent_no_bg.svg';
    document.getElementById('medium').classList.remove('medium');
    document.getElementById('medium-img').src = '../img/medium_no_bg.svg';
    document.getElementById('low').classList.remove('low');
    document.getElementById('low-img').src = '../img/low_no_bg.svg';
    document.getElementById('category').value = '';
    document.getElementById('subtask-list').innerHTML = '';
    SubtaskArray = {};
    renderSubtaskContainer;
    const subtaskinput = document.getElementById('subtask-input');
    if (subtaskinput) {
        subtask.value = '';
        revertBackToButton();
    };
    revertContactSelect();
}

async function formValidationBoard() {
    const taskTitle = document.getElementById('task-title');
    const taskDescription = document.getElementById('task-description');
    const dueDateStr = document.getElementById('dueDate');
    const category = document.getElementById('category');
    const urgentButton = document.getElementById('urgent');
    const mediumButton = document.getElementById('medium');
    const lowButton = document.getElementById('low');

    if (taskTitle.value == '') {
        taskTitle.classList.add('border-color-red');
        document.getElementById('is-required-task').classList.remove('d-none');
    };
    if (taskDescription.value == '') {
        taskDescription.classList.add('border-color-red');
        document.getElementById('is-required-description').classList.remove('d-none');
    };
    if (dueDateStr.value == '') {
        dueDateStr.classList.add('border-color-red');
        document.getElementById('is-required-date').classList.remove('d-none');
    };
    if (category.value == '') {
        category.classList.add('border-color-red');
        document.getElementById('is-required-category').classList.remove('d-none');
    };
    if (!(urgentButton.classList.contains('urgent') || mediumButton.classList.contains('medium') || lowButton.classList.contains('low'))) {
        document.getElementById('is-required-priority').classList.remove('d-none');
    }

    if (
        taskTitle.value !== '' &&
        taskDescription.value !== '' &&
        dueDateStr.value !== '' &&
        category.value !== '' &&
        (urgentButton.classList.contains('urgent') || mediumButton.classList.contains('medium') || lowButton.classList.contains('low'))
    ) {
        await addTaskBoard();
        showMessage();
        closeMessageAndOverlay();
    }
}

function closeMessageAndOverlay() {
    setTimeout(() => {
        document.getElementById('creation-message').classList.remove('active');
        closeAddTaskOverlay();
        updateHTML();
    }, "1000");
}