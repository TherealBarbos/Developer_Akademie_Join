let todos = [];

let currentDraggedElement;

const subtasksContainer = document.getElementById("subtasksContainer");

// Load and disply CARDS

function updateHTML() {
  showTaskListByState("toDo");
  showTaskListByState("inProgress");
  showTaskListByState("done");
  showTaskListByState("awaitFeedback");
}
// filter das Arry nach den Kategorien 
function showTaskListByState(state) {
  let filteredTasksByState = todos.filter((t) => t["state"] == state);

  document.getElementById(state).innerHTML = "";

  for (let index = 0; index < filteredTasksByState.length; index++) {
    const element = filteredTasksByState[index];
    document.getElementById(state).innerHTML += generateTaskCard(element);
  }
}

// Drag functuality

// Drag Initiation
function startDregging(index) {
  currentDraggedElement = index;
  document.getElementById(`card-${index}`).classList.add("cardDragging");
}
// Generische Funktion zum Erzeugen der Task-Karten
function generateTaskCard(task) {

  return ` <div id="card-${task.id}" class="card" draggable="true" ondragstart="startDregging('${task.id}')" onclick="showOverlay('${task.id}')">
    <div class="cardFrame">
      <div class="cardLable">${task.category}</div>
      <div class="cardTextbox">
        <div class="cardTextI">${task.title}</div>
        <div class="cardTextII">${task.description}</div>
      </div>
      <div class="cardProgress">
        <div class="cardProgressbar">${task.progressbar}</div>
        <div class="cardProgressText">/${task.subtasks.length} Subtasks</div>
      </div>
      <div class="cardContacts">
        <div class="cardContactsBadge">
          <img src="${task.assignedName}" alt="" class="cardContactsBadgeImg" />
        </div>
        <div class="cardContactsPrio">
          <img src="${task.priorityImageSource}" alt="" class="cardContactsPrioImg" />
        </div>
      </div>
    </div>
  </div>`;
}

function allowDrop(ev) {
  ev.preventDefault();
}

// Function zum Wechseln der Category
function moveTo(state) {
  let id = todos.findIndex((item) => {
    return item.id == currentDraggedElement;
  });
  todos[id]["state"] = state;
  updateHTML();
  setItem("allTasks", JSON.stringify(todos));
  unhighlight(state);
}

// Drag  styl- Effekte
function highlight(index) {
  document.getElementById(index).classList.add("drag-over");
}
function unhighlight(index) {
  document.getElementById(index).classList.remove("drag-over");
}


// Overlay Task

function showOverlay(index) {
  let id = todos.findIndex((item) => {
    return item.id == index;
  });
  let overlay = document.getElementById("taskoverlay");
  overlay.innerHTML = renderTask(todos[id], id);
  document.getElementById("boardHeader").classList.add("blurout");
  document.getElementById("board").classList.add("blurout");
  document.getElementById("overlay").classList.add("overlayposition");
  taskoverlay.classList.remove("d-none");

  displaySubtasks(index); // index = z.B.: 1698364123489791324514
}

// Task Overlay erzeugen

// Subtasks filtern und als Liste darstellen

function displaySubtasks(index) {
  let id = todos.findIndex((item) => {
    return item.id == index; //id = id des GESAMTEN Tasks
  });
  let container = document.getElementById(`subtask-list-container${id}`);
  for (let i = 0; i < todos[id].subtasks.length; i++) {
    const subtask = todos[id].subtasks[i];
    container.innerHTML += `
    <li class="subtaskListItem" onclick="toggleNameSubtask${i}"">
      <img class="checkboxSubtask" id="checkboxSubtask${i}" src="../img/checkbox-unchecked.png">
      <span>${subtask}<span>
    </li>
    `;
  }
}

function toggleNameSubtask(i) {
  let li = document.getElementById(`subtaskListItem${i}`);
  let checkbox = document.getElementById(`checkboxSubtask${i}`);

  if (checkbox.src.endsWith('checkbox-unchecked.png')) {
      checkbox.src = '../img/checkbox-checked.png';
  } else {
      checkbox.src = '../img/checkbox-unchecked.png';
  }
}
// function displaySubtasks(index) {
//   let id = todos.findIndex((item) => {
//     return item.id == index;
//   });
//   if (todos[id].subtasks && todos[id].subtasks.length > 0) {
//     const ul = document.createElement("ul");

//     todos[id].subtasks.forEach((subtask) => {
//       const li = document.createElement("li");
//       li.textContent = subtask;
//       ul.appendChild(li);
//     });

//     const subtasksContainer = document.getElementById("subtasksContainer");
//     subtasksContainer.appendChild(ul);
//   } else {
//     console.log("no subtasks");
//   }
// }


// Unix-Timestamp entschlüsseln
function formatDateToDDMMYYYY(dateString) {
  const date = new Date(dateString);

  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
}
// Overlay rendern
function renderTask(todo, id) {
  
  const formattedDueDate = formatDateToDDMMYYYY(todo.dueDate);
  
  return `
  <div class="bOverlayCategory">${todo.category}
  <div class="bOverlayClose" onclick="closeOverlay()">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
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
</div>
<div class="bOverlayTitle">${todo.title}</div>
<div class="bOverlayText">${todo.description}</div>
<div class="bOverlayText">Due date: ${formattedDueDate}</div>
<div class="bOverlayText bOverlayuppercase">Priority:${todo.priority}<img src="${todo.priorityImageSource}" alt="" class="cardContactsPrioImg" /></div>
<div class="bOverlayAssigned">
  Assigned To:
  <div class="bOverlayAssignedNames">${todo.assignedName}</div>
</div>
<ul id="subtask-list-container${id}" class="bOverlaySub"></ul> 
</div>
<div class="bOverlaycontrolls">
  <div class="bOverlaycontrollsbutton">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
          <mask index="mask0_93030_4270" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="24"
              height="24">
              <rect width="24" height="24" fill="#D9D9D9" />
          </mask>
          <g mask="url(#mask0_93030_4270)">
              <path
                  d="M7 21C6.45 21 5.97917 20.8042 5.5875 20.4125C5.19583 20.0208 5 19.55 5 19V6C4.71667 6 4.47917 5.90417 4.2875 5.7125C4.09583 5.52083 4 5.28333 4 5C4 4.71667 4.09583 4.47917 4.2875 4.2875C4.47917 4.09583 4.71667 4 5 4H9C9 3.71667 9.09583 3.47917 9.2875 3.2875C9.47917 3.09583 9.71667 3 10 3H14C14.2833 3 14.5208 3.09583 14.7125 3.2875C14.9042 3.47917 15 3.71667 15 4H19C19.2833 4 19.5208 4.09583 19.7125 4.2875C19.9042 4.47917 20 4.71667 20 5C20 5.28333 19.9042 5.52083 19.7125 5.7125C19.5208 5.90417 19.2833 6 19 6V19C19 19.55 18.8042 20.0208 18.4125 20.4125C18.0208 20.8042 17.55 21 17 21H7ZM7 6V19H17V6H7ZM9 16C9 16.2833 9.09583 16.5208 9.2875 16.7125C9.47917 16.9042 9.71667 17 10 17C10.2833 17 10.5208 16.9042 10.7125 16.7125C10.9042 16.5208 11 16.2833 11 16V9C11 8.71667 10.9042 8.47917 10.7125 8.2875C10.5208 8.09583 10.2833 8 10 8C9.71667 8 9.47917 8.09583 9.2875 8.2875C9.09583 8.47917 9 8.71667 9 9V16ZM13 16C13 16.2833 13.0958 16.5208 13.2875 16.7125C13.4792 16.9042 13.7167 17 14 17C14.2833 17 14.5208 16.9042 14.7125 16.7125C14.9042 16.5208 15 16.2833 15 16V9C15 8.71667 14.9042 8.47917 14.7125 8.2875C14.5208 8.09583 14.2833 8 14 8C13.7167 8 13.4792 8.09583 13.2875 8.2875C13.0958 8.47917 13 8.71667 13 9V16Z"
                  fill="#2A3647" />
          </g>
      </svg>
      <div class="bOverlaycontrollsText" onclick="deleteTask(${todo.id})">Delete</div>
  </div>
  <div class="bOverlaycontrollsbutton">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
          <mask index="mask0_93030_4276" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="24"
              height="24">
              <rect width="24" height="24" fill="#D9D9D9" />
          </mask>
          <g mask="url(#mask0_93030_4276)">
              <path
                  d="M5 19H6.4L15.025 10.375L13.625 8.975L5 17.6V19ZM19.3 8.925L15.05 4.725L16.45 3.325C16.8333 2.94167 17.3042 2.75 17.8625 2.75C18.4208 2.75 18.8917 2.94167 19.275 3.325L20.675 4.725C21.0583 5.10833 21.2583 5.57083 21.275 6.1125C21.2917 6.65417 21.1083 7.11667 20.725 7.5L19.3 8.925ZM17.85 10.4L7.25 21H3V16.75L13.6 6.15L17.85 10.4Z"
                  fill="#2A3647" />
          </g>
      </svg>
      <div class="bOverlaycontrollsText">Edit</div>
  </div>    
`;
}

// Overlay Schließen
function closeOverlay() {
  document.getElementById("boardHeader").classList.remove("blurout");
  document.getElementById("board").classList.remove("blurout");
  document.getElementById("overlay").classList.remove("overlayposition");
  taskoverlay.classList.add("d-none");
}

// Overlay Task Edit
function editTask(index) {
  let id = todos.findIndex((item) => {
    return item.id == index;
  });
}

// Overlay Task Delete
function deleteTask(index) {
  let id = todos.findIndex((item) => {
    return item.id == index;
  });
  todos.splice(id, 1);
  setItem("allTasks", JSON.stringify(todos));
  updateHTML();
  closeOverlay();
}

// remote storage Funktionen

async function loadTasks() {
  try {
    todos = JSON.parse(await getItem("allTasks"));
    console.log(todos);
  } catch (e) {
    console.error("loading error:", e);
  }
  updateHTML();
}

async function getItem(key) {
  const url = `${STORAGE_URL}?key=${key}&token=4AVD74O6ONTUSWYBIKRAF3SC5B2U9YW3OCE1JRVE`;
  return fetch(url)
    .then((res) => res.json())
    .then((res) => {
      if (res.data) {
        return res.data.value;
      }
      throw `Could not find data with key "${key}".`;
    });
}

async function setItem(key, value) {
  const payload = { key, value, token: STORAGE_TOKEN };
  return fetch(STORAGE_URL, {
    method: "POST",
    body: JSON.stringify(payload),
  }).then((res) => res.json());
}
