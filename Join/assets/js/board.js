let todos = [];

async function loadTasks() {
  try {
      todos = JSON.parse(await getItem('allTasks'));
      console.log(todos)
  } catch(e) {
      console.error('loading error:', e);
  }
}

async function getItem(key) {
  const url = `${STORAGE_URL}?key=${key}&token=4AVD74O6ONTUSWYBIKRAF3SC5B2U9YW3OCE1JRVE`;
  return fetch(url).then(res => res.json()).then(res => {
      if (res.data) {
          return res.data.value;
      } throw `Could not find data with key "${key}".`;
  });
}

let currentDraggedElement;

function updateHTML() {
  let toDo = todos.filter((t) => t["state"] == "toDo");

  document.getElementById("toDo").innerHTML = "";

  for (let index = 0; index < toDo.length; index++) {
    const element = toDo[index];
    document.getElementById("toDo").innerHTML += generateTodoCard(element);
  }

  let inProgress = todos.filter((t) => t["state"] == "inProgress");

  document.getElementById("inProgress").innerHTML = "";

  for (let index = 0; index < inProgress.length; index++) {
    const element = inProgress[index];
    document.getElementById("inProgress").innerHTML +=
      generateInProgressCard(element);
  }

  let done = todos.filter((t) => t["state"] == "done");

  document.getElementById("done").innerHTML = "";

  for (let index = 0; index < done.length; index++) {
    const element = done[index];
    document.getElementById("done").innerHTML += generateDoneCard(element);
  }

  let awaitFeedback = todos.filter((t) => t["state"] == "awaitFeedback");

  document.getElementById("awaitFeedback").innerHTML = "";

  for (let index = 0; index < awaitFeedback.length; index++) {
    const element = awaitFeedback[index];
    document.getElementById("awaitFeedback").innerHTML +=
      generateAwaitFeedbackCard(element);
  }
}

function startDregging(id) {
  currentDraggedElement = id;
  document.getElementById(id).classList.add("cardDragging");
}

function generateTodoCard() {
  return  `<div class="card" draggable="true" ondragstart="startDregging(${todos.id})">
    <div class="cardFrame">
      <div class="cardLable">${todos.category}</div>
      <div class="cardTextbox">
        <div class="cardTextI">${todos.title}</div>
        <div class="cardTextII">${todos.description}</div>
      </div>
      <div class="cardProgress">
        <div class="cardProgressbar">${todos.progressbar}</div>
        <div class="cardProgressText">${todos.progress}s</div>
      </div>
      <div class="cardContacts">
        <div class="cardContactsBadge">
          <img src="${todos.assignedName}" alt="" class="cardContactsBadgeImg" />
        </div>
        <div class="cardContactsPrio">
          <img src="${todos.priorityImageSource}" alt="" class="cardContactsPrioImg" />
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
function generateInProgressCard(todo) {
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
function generateAwaitFeedbackCard(todo) {
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
  unhighlight(state);
}

function highlight(id) {
  document.getElementById(id).classList.add("drag-over");
}

function unhighlight(id) {
  document.getElementById(id).classList.remove("drag-over");
}
