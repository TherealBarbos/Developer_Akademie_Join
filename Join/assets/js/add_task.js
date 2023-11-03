const STORAGE_TOKEN = '4AVD74O6ONTUSWYBIKRAF3SC5B2U9YW3OCE1JRVE';
const STORAGE_URL = 'https://remote-storage.developerakademie.org/item';

let allTasks = loadTasks();
let SubtaskArray = {
    'subtaskContent': [],
    'subtaskDone': []
};
let contacts = [];
let assignedToTask = [];
let assignedInitial = [];

/**
 * This function adds tasks to the JSON "allTasks" which hold the title, description, due date, etc. After pushing, the JSON is saved in the remote storage.
 */
async function addTask() {
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
        'state': 'toDo',
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

function determineState() {
    if (states.length == 1) {
        return states 
    } else {
        return 'todo'
    }
}

/**
 * This function clears the input fields.
 */
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
/**
 * This function is called after clearing the inputs/adding a task. It empties the arrays that handle the contacts assigned to a task. 
 */
function revertContactSelect() {
    document.getElementById('initials-display').innerHTML = '';
    document.getElementById('assignedNameContainer').classList.add('d-none');
    assignedInitial = [];
    assignedToTask = [];
    const checkboxes = document.getElementsByClassName('checkbox');
    for (let i = 0; i < checkboxes.length; i++) {
        checkboxes[i].src = '../img/checkbox-unchecked.png';
    }
    const assignedNameLIs = document.getElementsByClassName('assignedNameLI');
    for (let i = 0; i < assignedNameLIs.length; i++) {
        assignedNameLIs[i].classList.remove('assignedNameLI-toggled');
    }
}

// Contact Section
/**
 * This function this function opens and closes the list of assignable names in the user's contacts
 */
function toggleSelect() {
    document.getElementById('assignedNameContainer').classList.toggle('d-none');
}

/**
 * This function hides the contact select when clicking anywhere outside the cointainer. The event listener below this function is associated with it.
 */
function hideContactSelect(event) {
    let nameContainer = document.getElementById('assignedNameContainer');
    if (nameContainer) {
        if (event.target.id !== "filterNames" && event.target.id !== "assignedName" && !event.target.classList.contains('assignedNameLI') && !event.target.classList.contains('assignedNameLI-toggled') && !event.target.classList.contains('checkbox') && !event.target.classList.contains('assigned-initials') && event.target.id !== "assigned-name-span") {
            nameContainer.classList.add("d-none");
        }
    }
}

document.addEventListener("click", hideContactSelect);

/**
 * This function accesses the contact-array and creates a list so the user may assign/unassign their contacts
 */
function loadAssignableNames() {
    const selectElement = document.getElementById("assignedName");
    for (let i = 0; i < contacts.length; i++) {
        const initial = contacts[i]['firstLetter'];
        const name = contacts[i]['name'];
        selectElement.innerHTML += `
            <li onclick="toggleName(${i})" id="toggle-name${i}" class="assignedNameLI">
                <div class="name-and-initials">
                    <div id="to-display${i}" class="assigned-initials color${i + 1}">${initial}</div>
                    <span id="assigned-name-span">${name}</span>
                </div>
                <img class="checkbox" id="checkbox${i}" src="../img/checkbox-unchecked.png">
            </li>`;
    }
}

/**
 * This function handles the visual representation of assigning/unassigning a contact
 * 
 * @param i - This is a contact's index on the list
 */
function toggleName(i) {
    let li = document.getElementById(`toggle-name${i}`);
    let checkbox = document.getElementById(`checkbox${i}`);

    li.classList.toggle('assignedNameLI-toggled');

    if (checkbox.src.endsWith('checkbox-unchecked.png')) {
        checkbox.src = '../img/checkbox-checked.png';
    } else {
        checkbox.src = '../img/checkbox-unchecked.png';
    }
    manipulateAssignedArray(i, li);
}

/**
 * This function assignes/splices contacts to/from the assignedToTask-Array
 * 
 * @param {number} i - Represents a contact's index on the list
 * @param {number} li - Represents the whole list-element, including its index (<li>)
 */

function manipulateAssignedArray(i, li) {
    const name = contacts[i]['name'];
    const index = assignedToTask.indexOf(name);

    if (li.classList.contains('assignedNameLI-toggled')) {
        assignedToTask.push(name);
    } else { assignedToTask.splice(index, 1) }
    manipulateAssignedInitials(i);
}

/**
 * This function assignes/splices contacts to/from the assignedToTaskArray-Intials
 * 
 * @param i - Represents a contact's index on the list
 */
function manipulateAssignedInitials(i) {
    const toBeAssigned = contacts[i]['firstLetter'];
    const index = assignedInitial.indexOf(toBeAssigned);
    let checkbox = document.getElementById(`checkbox${i}`);
    let container = document.getElementById('initials-display');

    if (checkbox.src.endsWith('checkbox-checked.png')) {
        assignedInitial.push(toBeAssigned);
    } else {
        if (index !== -1) {
            assignedInitial.splice(index, 1);
        }
    }
    container.innerHTML = '';
    for (let j = 0; j < assignedInitial.length; j++) {
        const displayedInitial = assignedInitial[j];
        container.innerHTML += `<span class="assigned-initials color${j + 1}">${displayedInitial}</span>`;
    }
}

// priority section

/**
 * This function registers which button is currently clicked. It is called in the addTask function in order to determine the priority.
 * 
 */
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

/**
 * This function registers which button is currently. It is called in the addTask function to determine the image source according to priority.
 * 
 */

function getSelectedPriorityImageSource() {
    const urgentButton = document.getElementById('urgent');
    const mediumButton = document.getElementById('medium');
    const lowButton = document.getElementById('low');

    if (urgentButton.classList.contains('urgent')) {
        return '../img/urgent_no_bg.svg';
    } else if (mediumButton.classList.contains('medium')) {
        return '../img/medium_no_bg.svg';
    } else if (lowButton.classList.contains('low')) {
        return '../img/low_no_bg.svg';
    }
}

/**
 * This function handles the clicking/unclicking of the urgent button.
 * 
 */

function urgentButton() { 
    let img = document.getElementById('urgent-img');
    const urgentButton = document.getElementById('urgent');

    if (!urgentButton.classList.contains('urgent')) {
        urgentButton.classList.add('urgent');
        img.src = '../img/urgent.svg';
    } else {
        urgentButton.classList.remove('urgent');
        img.src = '../img/urgent_no_bg.svg';
    }

    document.getElementById('medium-img').src = '../img/medium_no_bg.svg';
    document.getElementById('low-img').src = '../img/low_no_bg.svg';
    document.getElementById('medium').classList.remove('medium');
    document.getElementById('low').classList.remove('low');
}

/**
 * This function handles the clicking/unclicking of the medium button.
 * 
 */

function mediumButton() {
    let img = document.getElementById('medium-img');
    const mediumButton = document.getElementById('medium');

    if (!mediumButton.classList.contains('medium')) {
        mediumButton.classList.add('medium');
        img.src = '../img/medium.svg';
    } else {
        mediumButton.classList.remove('medium');
        img.src = '../img/medium_no_bg.svg';
    }

    document.getElementById('urgent-img').src = '../img/urgent_no_bg.svg';
    document.getElementById('low-img').src = '../img/low_no_bg.svg';
    document.getElementById('urgent').classList.remove('urgent');
    document.getElementById('low').classList.remove('low');
}

/**
 * This function handles the clicking/unclicking of the low button.
 * 
 */

function lowButton() {
    let img = document.getElementById('low-img');
    const lowButton = document.getElementById('low');

    if (!lowButton.classList.contains('low')) {
        lowButton.classList.add('low');
        img.src = '../img/low.svg';
    } else {
        lowButton.classList.remove('low')
        img.src = '../img/low_no_bg.svg';
    }

    document.getElementById('urgent-img').src = '../img/urgent_no_bg.svg';
    document.getElementById('medium-img').src = '../img/medium_no_bg.svg';
    document.getElementById('urgent').classList.remove('urgent');
    document.getElementById('medium').classList.remove('medium');
}

// Subtask-Section

/**
 * This function activates the input field to add subtasks.
 * 
 */

function transformIntoInput() { 
    const subtaskButton = document.getElementById('add-subtask-button');

    const input = document.createElement('div');
    input.placeholder = 'Add Subtask';
    input.innerHTML = `
    <div id="subtask" class="subtask-button border-radius-6">
        <input onkeyup="handleKeyUp(event)" id="subtask-input" class="subtask-input" placeholder="Contact Form">
        <div class="exit-and-delete" style="display: flex;">
            <img onclick="revertBackToButton()" class="exit" id="exit" src="../img/cancel.svg">
            <img onclick="addNewSubtaskToList()" class="tick" id="tick" src="../img/check.svg">
        </div>
    </div>`;

    subtaskButton.replaceWith(input);
    document.getElementById('subtask-input').focus();
}

/**
 * This function allow the user to add a subtask by clicking the enter-button
 * 
 */

function handleKeyUp(event) {
    if (event.key === 'Enter' || event.keyCode === 13) {
        addNewSubtaskToList();
    }
}

/**
 * This function pushes added subtasks into the corresponding array.
 * 
 */
function addNewSubtaskToList() { 
    let newSubtask = document.getElementById('subtask-input').value;

    console.log(newSubtask);

    if (newSubtask != '') {
        SubtaskArray.subtaskContent.push(newSubtask);
        SubtaskArray.subtaskDone.push(0);
        renderSubtaskContainer();
        revertBackToButton();
    } else {
        document.getElementById('is-required-subtask').classList.remove('d-none');
    }
}

/**
 * This function renders the list of subtasks. It is called when a Subtask is added or deleted.
 * 
 */

function renderSubtaskContainer() { 
    let subtaskContainer = document.getElementById('subtask-list');
    subtaskContainer.innerHTML = '';
    for (let i = 0; i < SubtaskArray.subtaskContent.length; i++) {
        const addedTask = SubtaskArray.subtaskContent[i];
        subtaskContainer.innerHTML +=
            `<li id="subtaskListItem${i}" class="addsubtask-list-element">
        <div style="display: flex; align-items: center; gap: 8px;">
            <img style="height: 6px; width: 6px" src="../img/list_marker.png">
            <input onclick="editSubtaskItem(${i})" readonly id="readonly-Input${i}" value="${addedTask}"
                class="input-edit-subtask"></input>
            <div id="edit-and-delete${i}" class="edit-and-delete">
                <img id="edit${i}" onclick="editSubtaskItem(${i})" class="edit-and-delete-img" src="../img/edit.svg">
                <img src="../img/short_separating_line.svg">
                <img id="delete${i}" onclick="deleteSubtaskItem(${i})" class="edit-and-delete-img delete"
                    src="../img/delete.svg">
            </div>
        </div>
    </li>`;
    }
}

/**
 * This function allows the user to edit the text in a subtask
 * 
 */

function editSubtaskItem(i) { 
    const editIcon = document.getElementById(`edit${i}`);
    const acceptChangesIcon = document.createElement('img');
    editIcon.replaceWith(acceptChangesIcon);
    acceptChangesIcon.src = '../img/check.png';
    acceptChangesIcon.id = `edit${i}`;
    acceptChangesIcon.onclick = () => acceptChanges(i);

    const listItem = document.getElementById(`subtaskListItem${i}`);
    listItem.classList.add('editable-list-element');
    listItem.classList.remove('addsubtask-list-element');
    document.getElementById(`edit-and-delete${i}`).classList.add('row-reverse');

    const input = document.getElementById(`readonly-Input${i}`);
    input.removeAttribute('readonly');
    input.focus();
    input.selectionStart = input.selectionEnd = input.value.length;
}

/**
 * This function replaces the old subtask with the edited one in the SubtaskArray and calls the function to revert the list item.
 * 
 */

function acceptChanges(i) {
    let replacingElement = document.getElementById(`readonly-Input${i}`).value;
    SubtaskArray.subtaskContent.splice(i, 1, replacingElement);
    renderSubtaskContainer();
}

/**
 * This function allow the user to delete an item on the subtask list.
 * 
 */

function deleteSubtaskItem(i) {
    SubtaskArray.subtaskContent.splice(i, 1);
    SubtaskArray.subtaskDone.splice(i, 1);
    renderSubtaskContainer();
}

/**
 * This function handles the deactivation of the subtask-input
 * 
 */

function revertBackToButton() {
    const input = document.getElementById('subtask');
    const subtaskButton = document.createElement('div');

    subtaskButton.innerHTML = `
        <button class="subtask-button-inactive border-radius-6" onclick="transformIntoInput()" id="add-subtask-button">
            <span> Add new subtask </span>
            <img src="../img/addtask.png" class="plus-sign" id="plus-sign">
        </button>
    `;

    input.replaceWith(subtaskButton);
}

/**
 * This function calls the functions to load the contacts and the assignables names
 * 
 */
async function load() {
    await loadContacts();
    loadAssignableNames();
}

//  form validation


/**
 * This function checks if all the required fields hold text in them. If not, it visiualizes the missing information to the user.
 * 
 */
async function formValidation() {
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
        await addTask();
        showMessage();
        openBoard();
    }
}
/**
 * This function shows a message to the user that a task was succesfully added to the board
 * 
 */
function showMessage() {
    document.getElementById('creation-message').classList.add('active');
}
/**
 * This function calls the board. It loads the board after 1 second has passed so the user may see the message that a task was created.
 * 
 */
function openBoard() {
    setTimeout(() => {
        window.location.replace("../html/board.html");
    }, "1000"); 
}

// remote storage

/**
 * This function loads the contacts from the remote storage.
 * 
 */
async function loadContacts() {
    try {
        contacts = JSON.parse(await getItem('contacts'));
    } catch (e) {
        console.error('Loading error:', e);
    }
}

/**
 * This function loads the tasks from the remote storage.
 * 
 */
async function loadTasks() {
    try {
        allTasks = JSON.parse(await getItem('allTasks'));
    } catch (e) {
        console.error('loading error:', e);
    }
}
/**
 * this function sets an array into the remote storage
 * @param {string} key - name of the key
 * @param {*} value - the array
 * @returns 
 */
async function setItem(key, value) {
    const payload = { key, value, token: STORAGE_TOKEN };
    return fetch(STORAGE_URL, { method: 'POST', body: JSON.stringify(payload) })
        .then(res => res.json());
}

/**
 * this function takes the key out of the remote storage
 * @param {string} key - name of the key 
 * @returns 
 */
async function getItem(key) {
    const url = `${STORAGE_URL}?key=${key}&token=${STORAGE_TOKEN}`;
    return fetch(url).then(res => res.json()).then(res => {
        if (res.data) {
            return res.data.value;
        } throw `Could not find data with key "${key}".`;
    });
}



