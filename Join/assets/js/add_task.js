const STORAGE_TOKEN = '4AVD74O6ONTUSWYBIKRAF3SC5B2U9YW3OCE1JRVE';
const STORAGE_URL = 'https://remote-storage.developerakademie.org/item';

let allTasks = loadTasks();
let SubtaskArray = [];
let contacts = [];
let letters = [];

async function addTask() { // this fills the JSON array "allTasks" which holds the title, description, etc. of the task you want to add and saves them in the remote storage
    const id = createID();
    const taskTitle = document.getElementById('task-title').value;
    const taskDescription = document.getElementById('task-description').value;
    const assignedName = document.getElementById('assignedName').value;
    const dueDateStr = document.getElementById('dueDate').value;
    const dueDate = new Date(dueDateStr).getTime();
    const priority = getSelectedPriority();
    const prioritySource = getSelectedPriorityImageSource();
    const category = document.getElementById('category').value;
    const subtask = SubtaskArray;

    console.log('task-title', taskTitle);
    console.log('task-description', taskDescription);
    console.log('dueDate', dueDate);

    let task = {
        'id': id,
        'state': 'toDo',
        'title': taskTitle,
        'description': taskDescription,
        'assignedName': assignedName,
        'dueDate': dueDate, // dueDate hat Unix timestamp. Muss später noch geändert werden?
        'priority': priority,
        'priorityImageSource': prioritySource,
        'category': category,
        'subtasks': subtask,
    }

    allTasks.push(task);
    await setItem('allTasks', JSON.stringify(allTasks));
    clearInputs();
}

function createID() {
    const newID = allTasks.length;
    return newID;
}

function clearInputs() {
    document.getElementById('task-title').value = '';
    document.getElementById('task-description').value = '';
    document.getElementById('assignedName').value = '';
    document.getElementById('dueDate').value = '';
    document.getElementById('urgent').classList.remove('urgent');
    document.getElementById('urgent-img').src = 'assets/img/urgent_no_bg.png';
    document.getElementById('medium').classList.remove('medium');
    document.getElementById('medium-img').src = 'assets/img/medium_no_bg.png';
    document.getElementById('low').classList.remove('low');
    document.getElementById('low-img').src = 'assets/img/low_no_bg.png';
    document.getElementById('category').value = '';
    document.getElementById('subtask-input').value = '';
    document.getElementById('subtask-list').innerHTML = '';
    SubtaskArray = [];
    renderSubtaskContainer;
    revertBackToButton();
}

// Contact Section

function createSelect() {
    const selectElement = document.getElementById("assignedName");
    selectElement.classList.remove('d-none')

    for (let i = 0; i < contacts.length; i++) {
        const initial = letters[i];
        const name = contacts[i]['name'];
        selectElement.innerHTML += `
        <li class="assignedNameLI">
            <div class="assigned-initials">${initial}</div>
            <span class="assigned-name">${name}
        </li>`;
    }
}


// Priority Section

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

function getSelectedPriorityImageSource() {
    const urgentButton = document.getElementById('urgent');
    const mediumButton = document.getElementById('medium');
    const lowButton = document.getElementById('low');

    if (urgentButton.classList.contains('urgent')) {
        return 'assets/img/urgent.png';
    } else if (mediumButton.classList.contains('medium')) {
        return 'assets/img/medium.png';
    } else if (lowButton.classList.contains('low')) {
        return 'assets/img/low.png';
    }
}

function urgentButton() { //this function handles the clicking/unclicking of the urgent button
    let img = document.getElementById('urgent-img');
    const urgentButton = document.getElementById('urgent');

    if (!urgentButton.classList.contains('urgent')) {
        urgentButton.classList.add('urgent');
        img.src = 'assets/img/urgent.png';
    } else {
        urgentButton.classList.remove('urgent');
        img.src = 'assets/img/urgent_no_bg.png';
    }

    document.getElementById('medium-img').src = 'assets/img/medium_no_bg.png';
    document.getElementById('low-img').src = 'assets/img/low_no_bg.png';
    document.getElementById('medium').classList.remove('medium');
    document.getElementById('low').classList.remove('low');
}

function mediumButton() { //this function handles the clicking/unclicking of the medium button
    let img = document.getElementById('medium-img');
    const mediumButton = document.getElementById('medium');

    if (!mediumButton.classList.contains('medium')) {
        mediumButton.classList.add('medium');
        img.src = 'assets/img/medium.png';
    } else {
        mediumButton.classList.remove('medium');
        img.src = 'assets/img/medium_no_bg.png';
    }

    document.getElementById('urgent-img').src = 'assets/img/urgent_no_bg.png';
    document.getElementById('low-img').src = 'assets/img/low_no_bg.png';
    document.getElementById('urgent').classList.remove('urgent');
    document.getElementById('low').classList.remove('low');
}

function lowButton() { //this function handles the clicking/unclicking of the low button
    let img = document.getElementById('low-img');
    const lowButton = document.getElementById('low');

    if (!lowButton.classList.contains('low')) {
        lowButton.classList.add('low');
        img.src = 'assets/img/low.png';
    } else {
        lowButton.classList.remove('low')
        img.src = 'assets/img/low_no_bg.png';
    }

    document.getElementById('urgent-img').src = 'assets/img/urgent_no_bg.png';
    document.getElementById('medium-img').src = 'assets/img/medium_no_bg.png';
    document.getElementById('urgent').classList.remove('urgent');
    document.getElementById('medium').classList.remove('medium');
}

// Subtask-Section

function transformIntoInput() { //this function activates the input field to add subtasks
    const subtaskButton = document.getElementById('add-subtask-button');

    const input = document.createElement('div');
    input.placeholder = 'Add Subtask';
    input.innerHTML = `
    <form>
    <div id="subtask" class="subtask-button border-radius-6">
        <input required id="subtask-input" class="subtask-input" placeholder="Contact Form">
        <div>
            <img onclick="revertBackToButton()" class="exit" id="exit" src="assets/img/cancel.png">
            <img onclick="addNewSubtaskToList()" class="tick" id="tick" src="assets/img/check.png">
        </div>
    </div>
    </form>`;

    subtaskButton.replaceWith(input);
    document.getElementById('subtask-input').focus();
}

function addNewSubtaskToList() { // this function pushes added subtasks into an array and renders them into a list below the input field
    let newSubtask = document.getElementById('subtask-input').value;
    SubtaskArray.push(newSubtask);
    renderSubtaskContainer();
    revertBackToButton();
}

function renderSubtaskContainer() { // This function renders the list of subtasks. It is called when a Subtask is added or deleted.
    let subtaskContainer = document.getElementById('subtask-list');
    subtaskContainer.innerHTML = '';
    for (let i = 0; i < SubtaskArray.length; i++) {
        const addedTask = SubtaskArray[i];
        subtaskContainer.innerHTML +=
            `<li id="subtaskListItem${i}" class="addsubtask-list-element">
            <div style="display: flex; align-items: center; gap: 8px;">
              <img style="height: 6px; width: 6px" src="assets/img/list_marker.png">
              <input onclick="editSubtaskItem(${i})" readonly id="readonly-Input${i}" value="${addedTask}" class="input-edit-subtask"></input>
            </div>
            <div id="edit-and-delete${i}" class="edit-and-delete">
              <img id="edit${i}" onclick="editSubtaskItem(${i})" class="edit-and-delete-img" src="assets/img/edit.png">
              <img src="assets/img/short_separating_line.png">
              <img id="delete${i}" onclick="deleteSubtaskItem(${i})" class="edit-and-delete-img delete" src="assets/img/delete.png">
            </div>
          </li>`;
    }
}

function editSubtaskItem(i) {
    const editIcon = document.getElementById(`edit${i}`);
    const acceptChangesIcon = document.createElement('img');
    editIcon.replaceWith(acceptChangesIcon);
    acceptChangesIcon.src = 'assets/img/check.png';
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

function acceptChanges(i) { // this function replaces the old subtask with the edited one in the SubtaskArray and calls the function to revert the list item
    let replacingElement = document.getElementById(`readonly-Input${i}`).value;
    SubtaskArray.splice(i, 1, replacingElement);
    renderSubtaskContainer();
    console.log('test')
}

// function revertListItem() { //this function reverts the editable list item to a non-editable list item
//     const listItem = document.getElementById(`subtaskListItem${i}`);
//     listItem.classList.remove('editable-list-element');
//     listItem.classList.add('addsubtask-list-element');
//     document.getElementById(`edit-and-delete${i}`).classList.remove('row-reverse');

//     const editIcon = document.getElementById(`edit${i}`);
//     const acceptChangesIcon = document.createElement('img');
//     editIcon.replaceWith(acceptChangesIcon);
//     acceptChangesIcon.src = 'assets/img/check.png';
//     acceptChangesIcon.onclick = () => acceptChanges(i);
// }

function deleteSubtaskItem(i) {
    SubtaskArray.splice(i, 1);
    renderSubtaskContainer();
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

async function load() {
    await loadContacts();
    collectLetters();
}

function collectLetters() {
    for (let i = 0; i < contacts.length; i++) {
        let contact = contacts[i];
        const FirstLetter = contact['name'].charAt(0).toUpperCase();
        letters.push(FirstLetter);
    }
}

// remote storage

async function loadContacts() {
    try {
        contacts = JSON.parse(await getItem('contacts'));
    } catch (e) {
        console.error('Loading error:', e);
    }
}

async function loadTasks() {
    try {
        allTasks = JSON.parse(await getItem('allTasks'));
    } catch (e) {
        console.error('loading error:', e);
    }
}

async function setItem(key, value) {
    const payload = { key, value, token: STORAGE_TOKEN };
    return fetch(STORAGE_URL, { method: 'POST', body: JSON.stringify(payload) })
        .then(res => res.json());
}

async function getItem(key) {
    const url = `${STORAGE_URL}?key=${key}&token=${STORAGE_TOKEN}`;
    return fetch(url).then(res => res.json()).then(res => {
        if (res.data) {
            return res.data.value;
        } throw `Could not find data with key "${key}".`;
    });
}