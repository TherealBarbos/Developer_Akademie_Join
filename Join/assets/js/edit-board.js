/**
 * This function activates the edit mode
 * @param {number} id - A task's id-number
 */
async function editTask(id) {
    await loadContacts();
    card = document.getElementById(`taskoverlay`);
    card.innerHTML = `

    <div class="bOverlayClose-edit" onclick="closeOverlay()">
      <svg class="close-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
          <mask index="mask0_93030_4211" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="24"
              height="24">
              <rect width="24" height="24" fill="#D9D9D9" />
          </mask>
          <g mask="url(#mask0_93030_4211)">
              <path
                  d="M12 13.4L7.09999 18.3C6.91665 18.4834 6.68332 18.575 6.39999 18.575C6.11665 18.575 5.88332 18.4834 5.69999 18.3C5.51665 18.1167 5.42499 17.8834 5.42499 17.6C5.42499 17.3167 5.51665 17.0834 5.69999 16.9L10.6 12L5.69999 7.10005C5.51665 6.91672 5.42499 6.68338 5.42499 6.40005C5.42499 6.11672 5.51665 5.88338 5.69999 5.70005C5.88332 5.51672 6.11665 5.42505 6.39999 5.42505C6.68332 5.42505 6.91665 5.51672 7.09999 5.70005L12 10.6L16.9 5.70005C17.0833 5.51672 17.3167 5.42505 17.6 5.42505C17.8833 5.42505 18.1167 5.51672 18.3 5.70005C18.4833 5.88338 18.575 6.11672 18.575 6.40005C18.575 6.68338 18.4833 6.91672 18.3 7.10005L13.4 12L18.3 16.9C18.4833 17.0834 18.575 17.3167 18.575 17.6C18.575 17.8834 18.4833 18.1167 18.3 18.3C18.1167 18.4834 17.8833 18.575 17.6 18.575C17.3167 18.575 17.0833 18.4834 16.9 18.3L12 13.4Z"
                  fill="#2A3647" />
          </g>
      </svg>
    </div>

    <section class="edit-section">

    <div class="enter-title-container gap-8">
      <h3> Title </h3>
      <input class="radius-and-border edit-input" id="edit-title${id}" value="${todos[id].title}"></input>
    </div>  

    <div class="enter-description-container-edit gap-8">
      <h3> Description </h3>
      <textarea class="radius-and-border textarea-edit" id="edit-description${id}">${todos[id].description}</textarea>
    </div>

    <div class="enter-date gap-8"v>
      <h3> Due date </h3>
      <input class="radius-and-border edit-input" id="edit-dueDate${id}" type="date" value="${formatDateToDDMMYYYY(todos[id].dueDate)}"></input>
    </div>

    <div class="priority-edit gap-8">
        <h3> Priority </h3>
        <div class="prio-select-edit">
            <button onclick="urgentButtonEdit(${id})" id="urgentEdit${id}" class="prio-button border-radius-6 light-border"> Urgent <img
                id="urgent-img-edit${id}" src="../img/urgent_no_bg.svg"></button>
            <button onclick="mediumButtonEdit(${id})" id="mediumEdit${id}" class="prio-button medium-clicked border-radius-6 light-border"> Medium
                <img id="medium-img-edit${id}" src="../img/medium_no_bg.svg"></button>
            <button onclick="lowButtonEdit(${id})" id="lowEdit${id}" class="prio-button low-clicked border-radius-6 light-border"> Low <img
                id="low-img-edit${id}" src="../img/low_no_bg.svg"></button>
        </div>
        <span id="is-required-priority" class="is-required d-none"> Please assign priority </span>
    </div>

    <div class="assigned-to-container-edit gap-8">
        <h3> Assigned to </h3>
        <input class="edit-input" onclick="toggleSelect()" onkeyup="filterNames()" id="filterNames" 
        class="border-radius-6 border-color assignedNameSelector" placeholder="Select contacts to assign to">
        <div class="d-none" id="assignedNameContainer">
            <ul class="assignedName-edit" id="assignedName-edit${id}"></ul>
            <a class="add-new-contact-link" href="contact.html">
            <button class="add-task-contact-create-btn">
                Add new contact
                <img class="add-person" src="../img/person_add.png" alt="person-add">
            </button>
            </a>
        </div>
    </div>
    <div class="initials-display-edit" id="initials-display-edit${id}"></div>


    <div class="subtask-edit-mode-container gap-8">
        <h3> Subtasks </h3>
        <button class="subtask-button-inactive-edit width100 border-radius-6" onclick="transformIntoInputEdit(${id})"
            id="add-subtask-button-edit${id}">
            <span> Add new subtask </span>
            <img src="../img/add.svg" class="plus-sign-edit${id}" id="plus-sign-edit${id}">
        </button>
        <span id="is-required-subtask${id}" class="is-required d-none"> Field cannot be empty </span>
    </div>
    <ul class="subtask-list-edit" id="subtask-list-edit${id}"></ul>
        
    </section>

    <div class="accept-button-container">
        <button class="acceptEditButton" onclick="acceptEdit(${id})">
            <span>Ok</span>
            <img src="../img/check-task.png">
        </button>
    </div>
    `;

    loadAssignableNamesEdit(id);
    determineClickedButton(id);
    renderSubtaskContainerEdit(id);
    displayInitialsEdit(id);
};

/**
 * This function activates the input field to add subtasks.
 * @param {number} id - A task's id-number
 */

function transformIntoInputEdit(id) {
    const subtaskButton = document.getElementById(`add-subtask-button-edit${id}`);

    const input = document.createElement('div');
    input.placeholder = 'Add Subtask';
    input.innerHTML = `
    <div id="subtask-edit${id}" class="subtask-button border-radius-6">
        <input onkeyup="handleKeyUp(event)" id="subtask-input-edit${id}" class="subtask-input" placeholder="Contact Form">
        <div class="little-flex">
            <img onclick="revertBackToButtonEdit(${id})" class="exit" id="exit" src="../img/cancel.svg">
            <img onclick="addNewSubtaskToListEdit(${id})" class="tick" id="tick" src="../img/check.svg">
        </div>
    </div>`;

    subtaskButton.replaceWith(input);
    document.getElementById(`subtask-input-edit${id}`).focus();
}

/**
 * This function pushes added subtasks into the corresponding array.
 * @param {number} id - A task's id-number
 */
async function addNewSubtaskToListEdit(id) {
    let newSubtask = document.getElementById(`subtask-input-edit${id}`).value;

    if (newSubtask != '') {
        todos[id].subtasks.subtaskContent.push(newSubtask);
        todos[id].subtasks.subtaskDone.push(0);
        await setItem('allTasks', JSON.stringify(todos));
        renderSubtaskContainerEdit(id);
        revertBackToButtonEdit(id);
    } else {
        document.getElementById(`is-required-subtask${id}`).classList.remove('d-none');
    }
}

/**
 * This function renders the list of subtasks. It is called when a Subtask is added or deleted.
 * @param {number} id - A task's id-number
 */

function renderSubtaskContainerEdit(id) { 
    let subtaskContainer = document.getElementById(`subtask-list-edit${id}`);
    subtaskContainer.innerHTML = '';
    for (let i = 0; i < todos[id].subtasks.subtaskContent.length; i++) {
        const addedTask = todos[id].subtasks.subtaskContent[i];
        newID = 1 + id.toString() + i.toString();
        subtaskContainer.innerHTML +=
            `<li id="subtaskListItem-edit${newID}" class="addsubtask-list-element-edit">
            <div style="display: flex; align-items: center; gap: 8px;">
              <img style="height: 6px; width: 6px" src="../img/list_marker.png">
              <input onclick="editSubtaskItemEdit(${newID}, ${i}, ${id})" readonly id="readonly-Input-edit${newID}" value="${addedTask}" class="input-edit-subtask-edit-mode"></input>
            </div>
            <div id="edit-and-delete-edit${newID}" class="edit-and-delete">
              <img id="edit-edit${newID}" onclick="editSubtaskItemEdit(${newID}, ${i}, ${id})" class="edit-and-delete-img" src="../img/edit.svg">
              <img src="../img/short_separating_line.svg">
              <img id="delete-edit${i}" onclick="deleteSubtaskItemEdit(${i}, ${id})" class="edit-and-delete-img delete" src="../img/delete.svg">
            </div>
          </li>`;
    }
}

/**
 * This function handles the deactivation of the subtask-input
 * @param {number} id - A task's id-number
 */

function revertBackToButtonEdit(id) {
    const input = document.getElementById(`subtask-edit${id}`);
    const subtaskButton = document.createElement('div');

    subtaskButton.innerHTML = `
        <button class="subtask-button-inactive-edit border-radius-6" onclick="transformIntoInputEdit(${id})" id="add-subtask-button-edit${id}">
            <span> Add new subtask </span>
            <img src="../img/addtask.png" class="plus-sign" id="plus-sign">
        </button>
    `;

    input.replaceWith(subtaskButton);
}
/**
 * This function allows the user to edit the text in a subtask.
 * @param {number} id - A task's id-number.
 * @param {number} i - The subtask's number in the list.
 * @param {number} newID - A combination of id and i to identify every subtask in every task
 */ 

function editSubtaskItemEdit(newID, i, id) { // 
    const editIcon = document.getElementById(`edit-edit${newID}`);
    const acceptChangesIcon = document.createElement('img');
    editIcon.replaceWith(acceptChangesIcon);
    acceptChangesIcon.src = '../img/check.svg';
    acceptChangesIcon.id = `edit-edit${newID}`;
    acceptChangesIcon.onclick = () => acceptChangesEdit(newID, i, id);

    const listItem = document.getElementById(`subtaskListItem-edit${newID}`);
    listItem.classList.add('editable-list-element-edit-mode');
    listItem.classList.remove('addsubtask-list-element-edit');
    document.getElementById(`edit-and-delete-edit${newID}`).classList.add('row-reverse');

    const input = document.getElementById(`readonly-Input-edit${newID}`);
    input.removeAttribute('readonly');
    input.focus();
    input.selectionStart = input.selectionEnd = input.value.length;
}

/**
 * This function allows the user to delete the text in a subtask
 * @param {number} id - A task's id-number
 * @param {number} i - The subtask's number in the list.
 */

async function deleteSubtaskItemEdit(i, id) {
    todos[id].subtasks.subtaskContent.splice(i, 1);
    todos[id].subtasks.subtaskDone.splice(i, 1);
    await setItem('allTasks', JSON.stringify(todos));
    renderSubtaskContainerEdit(id);
}

/**
 * This function replaces the old subtask with the edited one in the SubtaskArray and calls the function to revert the list item.
 * @param {number} id - A task's id-number.
 * @param {number} i - The subtask's number in the list.
 * @param {number} newID - A combination of id and i to identify every subtask in every task
 */

async function acceptChangesEdit(newID, i, id) { // this function replaces the old subtask with the edited one in the SubtaskArray and calls the function to revert the list item
    let replacingElement = document.getElementById(`readonly-Input-edit${newID}`).value;
    todos[id].subtasks.subtaskContent[i] = replacingElement;
    await setItem('allTasks', JSON.stringify(todos));
    renderSubtaskContainerEdit(id);
}

/**
 * This functions saves the changes.
 * @param {number} id - A task's id-number
 */

async function acceptEdit(id) {
    todos[id].title = document.getElementById(`edit-title${id}`).value;
    todos[id].description = document.getElementById(`edit-description${id}`).value;
    todos[id].dueDate = document.getElementById(`edit-dueDate${id}`).value;
    todos[id].priority = getEditedPriority(id);
    todos[id].priorityImageSource = getEditedPrioritySource(id);
    await setItem('allTasks', JSON.stringify(todos));
    closeOverlay();
}

/**
 * This function determines which button is clicked.
 * @param {number} id - A task's id-number
 */

function determineClickedButton(id) {
    if (todos[id].priority == 'urgent') {
        document.getElementById(`urgentEdit${id}`).classList.add('urgent');
        document.getElementById(`urgent-img-edit${id}`).src = '../img/urgent.svg';
    } else if (todos[id].priority == 'medium') {
        document.getElementById(`mediumEdit${id}`).classList.add('medium');
        document.getElementById(`medium-img-edit${id}`).src = '../img/medium.svg';
    } else {
        document.getElementById(`lowEdit${id}`).classList.add('low');
        document.getElementById(`low-img-edit${id}`).src = '../img/low.svg';
    }
};

/**
 * This function handles the clicking/unclicking of the urgent button.
 * @param {number} id - A task's id-number
 */

function urgentButtonEdit(id) { 
    let img = document.getElementById(`urgent-img-edit${id}`);
    const urgentButton = document.getElementById(`urgentEdit${id}`);

    if (!urgentButton.classList.contains('urgent')) {
        urgentButton.classList.add('urgent');
        img.src = '../img/urgent.svg';
    } else {
        urgentButton.classList.remove('urgent');
        img.src = '../img/urgent_no_bg.svg';
    }

    document.getElementById(`medium-img-edit${id}`).src = '../img/medium_no_bg.svg';
    document.getElementById(`low-img-edit${id}`).src = '../img/low_no_bg.svg';
    document.getElementById(`mediumEdit${id}`).classList.remove('medium');
    document.getElementById(`lowEdit${id}`).classList.remove('low');
}

/**
 * This function handles the clicking/unclicking of the medium button.
 * @param {number} id - A task's id-number
 */

function mediumButtonEdit(id) { 
    let img = document.getElementById(`medium-img-edit${id}`);
    const mediumButton = document.getElementById(`mediumEdit${id}`);

    if (!mediumButton.classList.contains('medium')) {
        mediumButton.classList.add('medium');
        img.src = '../img/medium.svg';
    } else {
        mediumButton.classList.remove('medium');
        img.src = '../img/medium_no_bg.svg';
    }

    document.getElementById(`urgent-img-edit${id}`).src = '../img/urgent_no_bg.svg';
    document.getElementById(`low-img-edit${id}`).src = '../img/low_no_bg.svg';
    document.getElementById(`urgentEdit${id}`).classList.remove('urgent');
    document.getElementById(`lowEdit${id}`).classList.remove('low');
}

/**
 * This function handles the clicking/unclicking of the low button.
 * @param {number} id - A task's id-number
 */

function lowButtonEdit(id) { //this function handles the clicking/unclicking of the low button
    let img = document.getElementById(`low-img-edit${id}`);
    const lowButton = document.getElementById(`lowEdit${id}`);

    if (!lowButton.classList.contains('low')) {
        lowButton.classList.add('low');
        img.src = '../img/low.svg';
    } else {
        lowButton.classList.remove('low')
        img.src = '../img/low_no_bg.svg';
    }

    document.getElementById(`urgent-img-edit${id}`).src = '../img/urgent_no_bg.svg';
    document.getElementById(`medium-img-edit${id}`).src = '../img/medium_no_bg.svg';
    document.getElementById(`urgentEdit${id}`).classList.remove('urgent');
    document.getElementById(`mediumEdit${id}`).classList.remove('medium');
}

/**
 * This function registers which button is currently clicked. It is called in the addTask function in order to determine the priority.
 * @param {number} id - A task's id-number
 */

function getEditedPriority(id) {
    const urgentButton = document.getElementById(`urgentEdit${id}`);
    const mediumButton = document.getElementById(`mediumEdit${id}`);
    const lowButton = document.getElementById(`lowEdit${id}`);

    if (urgentButton.classList.contains('urgent')) {
        return 'urgent';
    } else if (mediumButton.classList.contains('medium')) {
        return 'medium';
    } else if (lowButton.classList.contains('low')) {
        return 'low';
    }
};

/**
 * This function registers which button is currently. It is called in the addTask function to determine the image source according to priority.
 * @param {number} id - A task's id-number
 */

function getEditedPrioritySource(id) {
    const urgentButton = document.getElementById(`urgentEdit${id}`);
    const mediumButton = document.getElementById(`mediumEdit${id}`);
    const lowButton = document.getElementById(`lowEdit${id}`);

    if (urgentButton.classList.contains('urgent')) {
        return '../img/urgent_no_bg.svg';
    } else if (mediumButton.classList.contains('medium')) {
        return '../img/medium_no_bg.svg';
    } else if (lowButton.classList.contains('low')) {
        return '../img/low_no_bg.svg';
    }
}

/**
 *This function accesses the contact-array and creates a list so the user may assign/unassign their contacts.
 * @param {number} id - A task's id-number
 */

function loadAssignableNamesEdit(id) { // this function loads the assignable contacts
    const selectElement = document.getElementById(`assignedName-edit${id}`);
    for (let i = 0; i < contacts.length; i++) {
        newID = 1 + id.toString() + i.toString();
        const initial = contacts[i]['firstLetter'];
        const name = contacts[i]['name'];
        selectElement.innerHTML += `
            <li onclick="toggleNameEdit(${i}, ${id}, ${newID})" id="toggle-name-edit${newID}" class="assignedNameLI">
                <div class="name-and-initials">
                    <div id="to-display${newID}" class="assigned-initials color${i + 1}">${initial}</div>
                    <span id="assigned-name-span${newID}">${name}</span>
                </div>
                <img class="checkbox" id="checkbox-edit${newID}" src="${getCheckboxSource(id, name)}">
            </li>`;
        getClassForLI(id, newID, name);
    }
}

/**
 * This function checks which checkbox has been marked and which has not.
 * @param {number} id - A task's id-number
 * @param {string} name - A contact's name
 */

function getCheckboxSource(id, name) {
    if (todos[id].assignedName.includes(name)) {
        return '../img/checkbox-checked.png'
    } else {
        return '../img/checkbox-unchecked.png'
    };
}

/**
 * This function checks which name has been marked. If marked, the class changes.
 * @param {number} id - A task's id-number
 */

function getClassForLI(id, newID, name) {
    li = document.getElementById(`toggle-name-edit${newID}`);
    if (todos[id].assignedName.includes(name)) {
        li.classList.add('assignedNameLI-toggled')
    }
}

/**
 * This function allows the user to edit the text in a subtask
 * @param {number} id - A task's id-number.
 * @param {number} i - The subtask's number in the list.
 * @param {number} newID - A combination of id and i to identify every subtask in every task
 */

function toggleNameEdit(i, id, newID) {
    let li = document.getElementById(`toggle-name-edit${newID}`);
    let checkbox = document.getElementById(`checkbox-edit${newID}`);

    li.classList.toggle('assignedNameLI-toggled');

    if (checkbox.src.endsWith('checkbox-unchecked.png')) {
        checkbox.src = '../img/checkbox-checked.png';
    } else {
        checkbox.src = '../img/checkbox-unchecked.png';
    }
    manipulateAssignedArrayEdit(i, li, id);
}

/**
 * this function assignes/splices contacts to/from todos[i].assignedNames/assignedInitials
 * @param {number} id - A task's id-number.
 * @param {number} i - The subtask's number in the list.
 * @param {HTMLElement} li - The respective list item that holds a contact's name
 */

function manipulateAssignedArrayEdit(i, li, id) { // 
    const name = contacts[i]['name'];
    const index = todos[id].assignedName.indexOf(name);

    if (li.classList.contains('assignedNameLI-toggled')) {
        todos[id].assignedName.push(name);
    } else { todos[id].assignedName.splice(index, 1) }
    manipulateAssignedInitialsEdit(i, id, li);
}

/**
 * This function allows the user to edit the text in a subtask
 * @param {number} i - The subtask's number in the list.
 * @param {number} id - A task's id-number
 * @param {HTMLElement} li - The respective list item that holds a contact's name
 */

async function manipulateAssignedInitialsEdit(i, id, li) {
    const toBeAssigned = contacts[i]['firstLetter'];
    const index = assignedInitial.indexOf(toBeAssigned);

    if (li.classList.contains('assignedNameLI-toggled')) {
        todos[id].assignedInitial.push(toBeAssigned);
    } else {
        todos[id].assignedInitial.splice(index, 1);
    }
    await setItem('allTasks', JSON.stringify(todos));
    displayInitialsEdit(id);
}

/**
 * This function displays the intials of the contacts assigned to the task.
 * @param {number} id - A task's id-number
 */

function displayInitialsEdit(id) {
    let container = document.getElementById(`initials-display-edit${id}`);
    container.innerHTML = '';
    for (let j = 0; j < todos[id].assignedInitial.length; j++) {
        const displayedInitial = todos[id].assignedInitial[j];
        container.innerHTML += `<span class="assigned-initials color${j + 1}">${displayedInitial}</span>`;
    }
}

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

async function getItem(key) {
    const url = `${STORAGE_URL}?key=${key}&token=${STORAGE_TOKEN}`;
    return fetch(url).then(res => res.json()).then(res => {
        if (res.data) {
            return res.data.value;
        } throw `Could not find data with key "${key}".`;
    });
}
