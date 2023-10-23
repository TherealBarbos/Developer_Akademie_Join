// -edit${id}

function editTask(id) {
    id;
    card = document.getElementById(`taskoverlay`);
    card.innerHTML = `
    <section>
      <span> Title </span>
      <input id="edit-title${id}" value="${todos[id].title}"></input>
      
      <span> Description </span>
      <textarea id="edit-description${id}">${todos[id].description}</textarea>
  
      <span> Due date </span>
      <input id="edit-dueDate${id}" type="date" value="${formatDateToDDMMYYYY(todos[id].dueDate)}"></input>

        <div class="priority gap-8">
            <h2> Prio </h2>
            <div class="prio-select">
                <button onclick="urgentButtonEdit(${id})" id="urgentEdit${id}" class="prio-button border-radius-6 light-border"> Urgent <img
                    id="urgent-img-edit${id}" src="../img/urgent_no_bg.svg"></button>
                <button onclick="mediumButtonEdit(${id})" id="mediumEdit${id}" class="prio-button medium-clicked border-radius-6 light-border"> Medium
                    <img id="medium-img-edit${id}" src="../img/medium_no_bg.svg"></button>
                <button onclick="lowButtonEdit(${id})" id="lowEdit${id}" class="prio-button low-clicked border-radius-6 light-border"> Low <img
                    id="low-img-edit${id}" src="../img/low_no_bg.svg"></button>
            </div>
            <span id="is-required-priority" class="is-required d-none"> Please assign priority </span>
        </div>

        <div>
              <span> Subtasks </span>
              <button class="subtask-button-inactive border-radius-6" onclick="transformIntoInputEdit(${id})"
                id="add-subtask-button-edit${id}">
                <span> Add new subtask </span>
                <img src="../img/addtask.png" class="plus-sign-edit${id}" id="plus-sign-edit${id}">
              </button>
              <span id="is-required-subtask${id}" class="is-required d-none"> Field cannot be empty </span>
        </div>

        <ul id="subtask-list-edit${id}"></ul>
        

    </section>

    <button class="acceptEditButton" onclick="acceptEdit(${id})">
        <span>Ok</span>
        <img src="../img/check-task.png"> 
    `;

    determineclickedButton(id);
    renderSubtaskContainerEdit(id);
};




function transformIntoInputEdit(id) {
    const subtaskButton = document.getElementById(`add-subtask-button-edit${id}`);

    const input = document.createElement('div');
    input.placeholder = 'Add Subtask';
    input.innerHTML = `
    <div id="subtask-edit${id}" class="subtask-button border-radius-6">
        <input onkeyup="handleKeyUp(event)" id="subtask-input-edit${id}" class="subtask-input" placeholder="Contact Form">
        <div>
            <img onclick="revertBackToButtonEdit(${id})" class="exit" id="exit" src="../img/cancel.png">
            <img onclick="addNewSubtaskToListEdit(${id})" class="tick" id="tick" src="../img/check.png">
        </div>
    </div>`;

    subtaskButton.replaceWith(input);
    document.getElementById(`subtask-input-edit${id}`).focus();
}

async function addNewSubtaskToListEdit(id) { // this function pushes added subtasks into an array and renders them into a list below the input field
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

function renderSubtaskContainerEdit(id) { // This function renders the list of subtasks. It is called when a Subtask is added or deleted.
    let subtaskContainer = document.getElementById(`subtask-list-edit${id}`);
    subtaskContainer.innerHTML = '';
    for (let i = 0; i < todos[id].subtasks.subtaskContent.length; i++) {
        const addedTask = todos[id].subtasks.subtaskContent[i];
        newID = 1 + id.toString() + i.toString();
        subtaskContainer.innerHTML +=
            `<li id="subtaskListItem-edit${newID}" class="addsubtask-list-element">
            <div style="display: flex; align-items: center; gap: 8px;">
              <img style="height: 6px; width: 6px" src="../img/list_marker.png">
              <input onclick="editSubtaskItemEdit(${newID}, ${i}, ${id})" readonly id="readonly-Input-edit${newID}" value="${addedTask}" class="input-edit-subtask"></input>
            </div>
            <div id="edit-and-delete-edit${newID}" class="edit-and-delete">
              <img id="edit-edit${newID}" onclick="editSubtaskItemEdit(${newID}, ${i}, ${id})" class="edit-and-delete-img" src="../img/edit.png">
              <img src="../img/short_separating_line.png">
              <img id="delete-edit${i}" onclick="deleteSubtaskItemEdit(${i}, ${id})" class="edit-and-delete-img delete" src="../img/delete.png">
            </div>
          </li>`;
    }
}

function revertBackToButtonEdit(id) { // this function handles the deactivation of the subtask-input
    const input = document.getElementById(`subtask-edit${id}`);
    const subtaskButton = document.createElement('div');

    subtaskButton.innerHTML = `
        <button class="subtask-button-inactive border-radius-6" onclick="transformIntoInputEdit(${id})" id="add-subtask-button-edit${id}">
            <span> Add new subtask </span>
            <img src="../img/addtask.png" class="plus-sign" id="plus-sign">
        </button>
    `;

    input.replaceWith(subtaskButton);
}

// change to editable state
function editSubtaskItemEdit(newID, i, id) { // this function allows the user to edit the text in a subtask
    // replace pen-icon with tick-icon and assing function to it
    const editIcon = document.getElementById(`edit-edit${newID}`);
    const acceptChangesIcon = document.createElement('img');
    editIcon.replaceWith(acceptChangesIcon);
    acceptChangesIcon.src = '../img/check.png';
    acceptChangesIcon.id = `edit-edit${newID}`;
    acceptChangesIcon.onclick = () => acceptChangesEdit(newID, i, id);

    const listItem = document.getElementById(`subtaskListItem-edit${newID}`);
    listItem.classList.add('editable-list-element');
    listItem.classList.remove('addsubtask-list-element');
    document.getElementById(`edit-and-delete-edit${newID}`).classList.add('row-reverse');

    const input = document.getElementById(`readonly-Input-edit${newID}`);
    input.removeAttribute('readonly');
    input.focus();
    input.selectionStart = input.selectionEnd = input.value.length;
}

async function deleteSubtaskItemEdit(i, id) {
    todos[id].subtasks.subtaskContent.splice(i, 1);
    todos[id].subtasks.subtaskDone.splice(i, 1);
    await setItem('allTasks', JSON.stringify(todos));
    renderSubtaskContainerEdit(id);
}

async function acceptChangesEdit(newID, i, id) { // this function replaces the old subtask with the edited one in the SubtaskArray and calls the function to revert the list item
    let replacingElement = document.getElementById(`readonly-Input-edit${newID}`).value;
    todos[id].subtasks.subtaskContent[i] = replacingElement;
    await setItem('allTasks', JSON.stringify(todos));
    renderSubtaskContainerEdit(id);
}


async function acceptEdit(id) {
    todos[id].title = document.getElementById(`edit-title${id}`).value;
    todos[id].description = document.getElementById(`edit-description${id}`).value;
    todos[id].dueDate = document.getElementById(`edit-dueDate${id}`).value;
    todos[id].priority = getEditedPriority(id);
    todos[id].priorityImageSource = getEditedPrioritySource(id);

    await setItem('allTasks', JSON.stringify(todos));
}


































function determineclickedButton(id) {
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

function urgentButtonEdit(id) { //this function handles the clicking/unclicking of the urgent button
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

function mediumButtonEdit(id) { //this function handles the clicking/unclicking of the medium button
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











