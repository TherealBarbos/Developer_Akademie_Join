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

async function addTask() { // this fills the JSON array "allTasks" which holds the title, description, etc. of the task you want to add and saves them in the remote storage
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

function toggleSelect() { // this function opens and closes the list of assignable names in the user's contacts
    document.getElementById('assignedNameContainer').classList.toggle('d-none');
}

function hideContactSelect(event) {
    if (event.target.id !== "filterNames" && event.target.id !== "assignedName" && !event.target.classList.contains('assignedNameLI') && !event.target.classList.contains('assignedNameLI-toggled') && !event.target.classList.contains('checkbox') && !event.target.classList.contains('assigned-initials') && event.target.id !== "assigned-name-span") {
        document.getElementById("assignedNameContainer").classList.add("d-none");
    }
}

function loadAssignableNames() { // this function loads the assignable contacts
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
                <div>
                    <img class="checkbox" id="checkbox${i}" src="../img/checkbox-unchecked.png">
                </div>
            </li>`;
    }
}

function filterNames() {
    const input = document.getElementById('filterNames');
    const filter = input.value.toUpperCase();
    const li = document.getElementsByClassName('assignedNameLI');

    for (let i = 0; i < li.length; i++) {
        const txtValue = li[i].querySelector(".assigned-name").textContent || li[i].querySelector(".assigned-name").innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }
}

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

function manipulateAssignedArray(i, li) { // this function assignes/splices contacts to/from the assignedToTaskArray
    const name = contacts[i]['name'];
    const index = assignedToTask.indexOf(name);

    if (li.classList.contains('assignedNameLI-toggled')) {
        assignedToTask.push(name);
    } else { assignedToTask.splice(index, 1) }
    manipulateAssignedInitials(i);
}

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
        return '../img/urgent_no_bg.svg';
    } else if (mediumButton.classList.contains('medium')) {
        return '../img/medium_no_bg.svg';
    } else if (lowButton.classList.contains('low')) {
        return '../img/low_no_bg.svg';
    }
}

function urgentButton() { //this function handles the clicking/unclicking of the urgent button
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

function mediumButton() { //this function handles the clicking/unclicking of the medium button
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

function lowButton() { //this function handles the clicking/unclicking of the low button
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

function transformIntoInput() { //this function activates the input field to add subtasks
    const subtaskButton = document.getElementById('add-subtask-button');

    const input = document.createElement('div');
    input.placeholder = 'Add Subtask';
    input.innerHTML = `
    <div id="subtask" class="subtask-button border-radius-6">
        <input onkeyup="handleKeyUp(event)" id="subtask-input" class="subtask-input" placeholder="Contact Form">
        <div>
            <img onclick="revertBackToButton()" class="exit" id="exit" src="../img/cancel.png">
            <img onclick="addNewSubtaskToList()" class="tick" id="tick" src="../img/check.png">
        </div>
    </div>`;

    subtaskButton.replaceWith(input);
    document.getElementById('subtask-input').focus();
}

function handleKeyUp(event) {
    if (event.key === 'Enter' || event.keyCode === 13) {
        addNewSubtaskToList();
    }
}

function addNewSubtaskToList() { // this function pushes added subtasks into an array and renders them into a list below the input field
    let newSubtask = document.getElementById('subtask-input').value;
    
    if (newSubtask != '') {
    SubtaskArray.subtaskContent.push(newSubtask);
    SubtaskArray.subtaskDone.push(0);
    renderSubtaskContainer();
    revertBackToButton();} else {
        document.getElementById('is-required-subtask').classList.remove('d-none');
    }
}

function renderSubtaskContainer() { // This function renders the list of subtasks. It is called when a Subtask is added or deleted.
    let subtaskContainer = document.getElementById('subtask-list');
    subtaskContainer.innerHTML = '';
    for (let i = 0; i < SubtaskArray.subtaskContent.length; i++) {
        const addedTask = SubtaskArray.subtaskContent[i];
        subtaskContainer.innerHTML +=
            `<li id="subtaskListItem${i}" class="addsubtask-list-element">
            <div style="display: flex; align-items: center; gap: 8px;">
              <img style="height: 6px; width: 6px" src="../img/list_marker.png">
              <input onclick="editSubtaskItem(${i})" readonly id="readonly-Input${i}" value="${addedTask}" class="input-edit-subtask"></input>
            </div>
            <div id="edit-and-delete${i}" class="edit-and-delete">
              <img id="edit${i}" onclick="editSubtaskItem(${i})" class="edit-and-delete-img" src="../img/edit.png">
              <img src="../img/short_separating_line.png">
              <img id="delete${i}" onclick="deleteSubtaskItem(${i})" class="edit-and-delete-img delete" src="../img/delete.png">
            </div>
          </li>`;
    }
}

function editSubtaskItem(i) { // this function allows the user to edit the text in a subtask
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

function acceptChanges(i) { // this function replaces the old subtask with the edited one in the SubtaskArray and calls the function to revert the list item
    let replacingElement = document.getElementById(`readonly-Input${i}`).value;
    SubtaskArray.subtaskContent.splice(i, 1, replacingElement);
    renderSubtaskContainer();
}

function deleteSubtaskItem(i) {
    SubtaskArray.subtaskContent.splice(i, 1);
    SubtaskArray.subtaskDone.splice(i, 1);
    renderSubtaskContainer();
}

function revertBackToButton() { // this function handles the deactivation of the subtask-input
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

async function load() {
    await loadContacts();
    loadAssignableNames();
}

//  form validation

function formValidation() {
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
        addTask();
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

document.addEventListener("click", hideContactSelect);

