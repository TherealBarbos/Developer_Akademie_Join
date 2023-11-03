let states = [];

/**
 * This function opens an Overlay that lets the user add a task while still being on the board page. If the screensize is below 820, the overlay will not open. Instead, the user will be redirected to the Add Task page 
 * @param {string} state - represents "to do", "in Progress", or "await feedback"
 */

function openAddTaskOverlay(state) {
    states.splice(0, 1, state);
    if (window.innerWidth >= 820) {
        document.getElementById('add-task-on-board').classList.add('active');
        document.getElementById('board').classList.add('blurout');
        load();
    } else {window.location.replace("../html/add_task.html")}
}


/**
 * This function closes the Overlay.
 * 
 */
function closeAddTaskOverlay() {
    document.getElementById('add-task-on-board').classList.remove('active');
    document.getElementById('board').classList.remove('blurout')
}


/**
 * This functions adds the task to the board and assigns the state depending on which plus-sign the user clicked
 * 
 */
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

/**
 * This function checks if all the required fields hold text in them. If not, it visiualizes the missing information to the user.
 * 
 */
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

/**
 * This function closes the message and overlay. After that, it reloads the page to show the new task.
 * 
 */
function closeMessageAndOverlay() {
    setTimeout(() => {
        document.getElementById('creation-message').classList.remove('active');
        closeAddTaskOverlay();
    }, "1000");
    setTimeout(() => {
        window.location.replace("../html/board.html");
    }, "1500");
}