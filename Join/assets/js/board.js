let todos = [];

let currentDraggedElement;

// Load and disply CARDS

function updateHTML() {
  let toDo = todos.filter((t) => t["state"] == "toDo");

  document.getElementById("toDo").innerHTML = "";

  for (let index = 0; index < toDo.length; index++) {
    const element = toDo[index];
    document.getElementById("toDo").innerHTML += generateTodoCard(element, index);
  }

  let inProgress = todos.filter((t) => t["state"] == "inProgress");

  document.getElementById("inProgress").innerHTML = "";

  for (let index = 0; index < inProgress.length; index++) {
    const element = inProgress[index];
    document.getElementById("inProgress").innerHTML +=
      generateInProgressCard(element, index);
  }

  let done = todos.filter((t) => t["state"] == "done");

  document.getElementById("done").innerHTML = "";

  for (let index = 0; index < done.length; index++) {
    const element = done[index];
    document.getElementById("done").innerHTML += generateDoneCard(element, index);
  }

  let awaitFeedback = todos.filter((t) => t["state"] == "awaitFeedback");

  document.getElementById("awaitFeedback").innerHTML = "";

  for (let index = 0; index < awaitFeedback.length; index++) {
    const element = awaitFeedback[index];
    document.getElementById("awaitFeedback").innerHTML +=
      generateAwaitFeedbackCard(element, index);
  }
}

// Drang functuality

function startDregging(id) {
  currentDraggedElement = id;
  document.getElementById(id).classList.add("cardDragging");
}

function generateTodoCard(todo, todoIndex) {
  return `<div class="card" draggable="true" ondragstart="startDregging(${
    todo.id
  })" onclick="showOverlay(${todoIndex})"> 
     <div class="cardFrame">
      <div class="cardLable">${todo.category}</div>
      <div class="cardTextbox">
        <div class="cardTextI">${todo.title}</div>
        <div class="cardTextII">${todo.description}</div>
      </div>
      <div class="cardProgress">
        <div class="cardProgressbar">${todo.progressbar}</div>
        <div class="cardProgressText">${todo.subtasks}/${
    todo.subtasks.length
  } Subtasks</div>
      </div>
      <div class="cardContacts">
        <div class="cardContactsBadge">
          <img src="${todo.assignedName}" alt="" class="cardContactsBadgeImg" />
        </div>
        <div class="cardContactsPrio">
          <img src="${
            todo.priorityImageSource
          }" alt="" class="cardContactsPrioImg" />
        </div>
      </div>
    </div>
  </div>`;
}
function generateInProgressCard(todo) {
  return `<div class="card" draggable="true" ondragstart="startDregging('${todo.id}')">
    <div class="cardFrame">
      <div onclick="showOverlay(${todo})" class="cardLable">${todo.category}</div>
      <div class="cardTextbox">
        <div class="cardTextI">${todo.title}</div>
        <div class="cardTextII">${todo.description}</div>
      </div>
      <div class="cardProgress">
        <div class="cardProgressbar">${todo.progressbar}</div>
        <div class="cardProgressText">${todo.progress}s</div>
      </div>
      <div class="cardContacts">
        <div class="cardContactsBadge">
          <img src="${todo.assignedName}" alt="" class="cardContactsBadgeImg" />
        </div>
        <div class="cardContactsPrio">
          <img src="${todo.priorityImageSource}" alt="" class="cardContactsPrioImg" />
        </div>
      </div>
    </div>
  </div>`;
}
function generateAwaitFeedbackCard(todo) {
  return `<onclick="showOverlay(${todo})" div class="card" draggable="true" ondragstart="startDregging('${todo.id}')">
    <div class="cardFrame">
      <div class="cardLable">${todo.category}</div>
      <div class="cardTextbox">
        <div class="cardTextI">${todo.title}</div>
        <div class="cardTextII">${todo.description}</div>
      </div>
      <div class="cardProgress">
        <div class="cardProgressbar">${todo.progressbar}</div>
        <div class="cardProgressText">${todo.progress}s</div>
      </div>
      <div class="cardContacts">
        <div class="cardContactsBadge">
          <img src="${todo.assignedName}" alt="" class="cardContactsBadgeImg" />
        </div>
        <div class="cardContactsPrio">
          <img src="${todo.priorityImageSource}" alt="" class="cardContactsPrioImg" />
        </div>
      </div>
    </div>
  </div>`;
}
function generateDoneCard(todo) {
  return ` <div class="card" draggable="true" ondragstart="startDregging('${todo.id}')">
    <div class="cardFrame">
      <div class="cardLable">${todo.category}</div>
      <div class="cardTextbox">
        <div class="cardTextI">${todo.title}</div>
        <div class="cardTextII">${todo.description}</div>
      </div>
      <div class="cardProgress">
        <div class="cardProgressbar">${todo.progressbar}</div>
        <div class="cardProgressText">${todo.progress}s</div>
      </div>
      <div class="cardContacts">
        <div class="cardContactsBadge">
          <img src="${todo.assignedName}" alt="" class="cardContactsBadgeImg" />
        </div>
        <div class="cardContactsPrio">
          <img src="${todo.priorityImageSource}" alt="" class="cardContactsPrioImg" />
        </div>
      </div>
    </div>
  </div>`;
}

function allowDrop(ev) {
  ev.preventDefault();
}

function moveTo(state) {
  todos[currentDraggedElement]["state"] = state;
  updateHTML();
  setItem("allTasks", JSON.stringify(todos));
  unhighlight(state);
}

function highlight(id) {
  document.getElementById(id).classList.add("drag-over");
}

function unhighlight(id) {
  document.getElementById(id).classList.remove("drag-over");
}

// Overlay add Task

function showOverlay(todoIndex) {
  let todo = todos[todoIndex]
  let overlay = document.getElementById("taskoverlay");
  overlay.innerHTML = renderTask(todo);
  document.getElementById("boardHeader").classList.add("blurout");
  document.getElementById("board").classList.add("blurout");
  document.getElementById("overlay").classList.add("overlayposition");
  taskoverlay.classList.remove("d-none");
}

function renderTask(todo) {
  console.log(todo);
  return `
  <div class="overlay">
    <div class="overlayHeader">
      <div class="overlayHeaderCategory">${todo.category}</div>
      <div class="overlayHeaderTitle">${todo.title}</div>
      <div class="overlayHeaderText">${todo.description}</div>
      <div class="overlayHeaderText">${todo.dueDate}</div>
      <div class="overlayHeaderText">${todo.priority}</div>
      <div class="overlayHeaderAssigned">${todo.assignedName}</div>
      <div class="overlayHeaderSubtasks">${todo.subtasks}</div>
      <div class="overlayHeadercontrolls">
        <div class="overlayHeadercontrollsDelete"></div>
        <div class="overlayHeadercontrollsEdit"></div>    



    </div>
  </div>
  <div onclick="closeOverlay()">Close</div>
`;
}

function closeOverlay(todo) {
  document.getElementById("boardHeader").classList.remove("blurout");
  document.getElementById("board").classList.remove("blurout");
  document.getElementById("overlay").classList.remove("overlayposition");
  taskoverlay.classList.add("d-none");
}

// remote storage

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
