let todos = [];
let quotes = [
  {
    text: "Das Glück deines Lebens hängt von der Qualität deiner Gedanken ab.",
    author: "Marcus Aurelius",
  },
  {
    text: "Phantasie ist wichtiger als Wissen, denn Wissen ist begrenzt.",
    author: "Albert Einstein",
  },
  {
    text: "Frieden kann nicht durch Gewalt erreicht werden. Es kann nur durch Verständnis erreicht werden.",
    author: "Albert Einstein",
  },
  {
    text: "Logik bringt dich von A nach B. Phantasie bringt dich überall hin.",
    author: "Albert Einstein",
  },
  {
    text: "Wenn etwas wichtig genug ist, dann solltest du es trotz aller Widrigkeiten tun.",
    author: "Elon Musk",
  },
  {
    text: "Ich denke, es ist möglich, das Leben zu multiplizieren und irgendwohin anders zu bringen.",
    author: "Elon Musk",
  },
  {
    text: "Du musst in der Lage sein, wie ein Bohrer in die Dinge einzudringen und wirklich verstehen, was du tust.",
    author: "Elon Musk",
  },
  {
    text: "Deine Arbeit wird einen großen Teil deines Lebens ausmachen, und die einzige Möglichkeit, wirklich zufrieden zu sein, ist, das zu tun, was du für eine großartige Arbeit hältst.",
    author: "Steve Jobs",
  },
  {
    text: "Innovationen entstehen, wenn man Dinge anders macht, nicht, wenn man sie genauso macht wie alle anderen.",
    author: "Steve Jobs",
  },
  {
    text: "Bleibe hungrig, bleibe töricht.",
    author: "Steve Jobs",
  },
  {
    text: "Das Leben ist das, was passiert, während du eifrig dabei bist, andere Pläne zu schmieden.",
    author: "John Lennon",
  },
  {
    text: "Zwei Dinge sind unendlich: das Universum und die menschliche Dummheit. Aber bei dem Universum bin ich mir noch nicht ganz sicher.",
    author: "Albert Einstein",
  },
  {
    text: "Man sieht nur das, was man weiß.",
    author: "Johann Wolfgang von Goethe",
  },
  {
    text: "Die Zukunft gehört denen, die an die Schönheit ihrer Träume glauben.",
    author: "Eleanor Roosevelt",
  },
  {
    text: "Du kannst die Wellen nicht stoppen, aber du kannst lernen zu surfen.",
    author: "Jon Kabat-Zinn",
  },
  {
    text: "Der größte Ruhm liegt nicht darin, niemals zu fallen, sondern jedes Mal wieder aufzustehen.",
    author: "Nelson Mandela",
  },
  {
    text: "Das Leben ist zu kurz, um in der Warteschlange zu stehen.",
    author: "Hugh Hefner",
  },
  {
    text: "Glück ist, wenn das, was du denkst, was du sagst und was du tust, in Harmonie miteinander sind.",
    author: "Mahatma Gandhi",
  },
  {
    text: "Wenn du nach den Sternen greifst, kannst du vielleicht nur die Spitzen der Bäume erreichen, aber das ist immer noch höher als der Boden.",
    author: "Jodie Foster",
  },
  {
    text: "Die größte Entdeckung aller Zeiten ist, dass ein Mensch seine Zukunft ändern kann, indem er seine Einstellung ändert.",
    author: "Oprah Winfrey",
  },
];

let currentDraggedElement;

/**
 * Updates the HTML to display the task cards based on their state.
 */
function updateHTML() {
  showTaskListByState("toDo");
  showTaskListByState("inProgress");
  showTaskListByState("awaitFeedback");
  showTaskListByState("done");
}
/**
 * Filters the tasks array based on the given state and displays the task list in the corresponding container.
 *
 * @param {string} state 
 */
function showTaskListByState(state) {
  let filteredTasksByState = todos.filter((t) => t["state"] == state);
  const taskListContainer = document.getElementById(state);

  if (filteredTasksByState.length === 0) {

    taskListContainer.innerHTML = generatePlaceholder();
  } else {
    taskListContainer.innerHTML = ""; 
    for (let index = 0; index < filteredTasksByState.length; index++) {
      const element = filteredTasksByState[index];
      taskListContainer.innerHTML += generateTaskCard(element);
      displayassigenedName(element.id);
    }
  }
}
/**
 * Generates a task card HTML for the given task.
 *
 * @param {object} task - The task object to create a card for.
 * @returns {string} - The HTML markup for the task card.
 */
function generateTaskCard(task) {
  return ` <div id="card-${task.id}" class="card" draggable="true" ondragstart="startDraging('${task.id}')" onclick="showOverlay('${task.id}')">
    <div class="cardFrame">
      <div class="cardHead">
      <div class="cardLable ${determineColor(task)}">${task.category}</div>
      <div class="cardMove" onclick="displayMoveMenu('${task.id}'); stopIt(event)" id="moveIcon">
      <img src="../img/move_black.png" alt="moveTo"> 
    </div>
         <div id="move-menu-${task.id}" class="move-menu d-none">
            <div>move Task to:</div>
            <div onclick="switchTo('${task.id}', 'toDo'); stopIt(event)">To do</div>
           <div onclick="switchTo('${task.id}', 'inProgress'); stopIt(event)">In progress</div>
           <div onclick="switchTo('${task.id}', 'awaitFeedback'); stopIt(event)">Await feedback</div>
           <div onclick="switchTo('${task.id}', 'done'); stopIt(event)">Done</div>
        </div>
      </div>
      <div class="cardTextbox">
        <div class="cardTextI">${task.title}</div>
        <div class="cardTextII">${task.description}</div>
      </div>
      <div id="card-subtask-${task.id}" class="cardProgress ${determineIfSubtaskExists(task)}">
        <div class="cardProgressbar">
          <div class="progress">
           <div class="progress-bar" role="progressbar" style="width: ${
             (taskSum(task) / task.subtasks.subtaskContent.length) * 100
           }%; 
           height: 15px; border-radius: 8px;" aria-valuenow="${taskSum(
             task
           )}" aria-valuemin="0" aria-valuemax="${
    task.subtasks.subtaskContent.length
  }"></div>
          </div>
        </div>
         <div class="cardProgressText">${taskSum(task)}/${
    task.subtasks.subtaskContent.length
  } Subtasks</div>
      </div>
      <div class="cardContacts">
        <div class="cardContactsBadge">
          <div class="cardAssignedInitials" id="cardAssignedNameContainer${
            task.id
          }"></div>
        </div>
        <div class="cardContactsPrio">
          <img src="${
            task.priorityImageSource
          }" alt="" class="cardContactsPrioImg" />
        </div>
      </div>
    </div>
  </div>`;
}
/**
 * Generates a placeholder HTML when there are no tasks in a category.
 *
 * @returns {string} - The HTML markup for the placeholder card.
 */
function generatePlaceholder() {
  const randomQuote = getRandomQuote();
  return `<div class="cardplaceholder">
    <div class="cardplaceholderLable">No Task!</div>
    <div class="cardTextI">Just Knowledge:</div>
    <div class="cardTextII">"${randomQuote.text}"</div>
    <div class="cardTextII cardTextR">- ${randomQuote.author}</div>
  </div>`;
}
/**
 * Retrieves a random quote from the quotes array.
 *
 * @returns {object} - A random quote object with 'text' and 'author' properties.
 */
function getRandomQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  return quotes[randomIndex];
}
/**
 * Initiates the drag operation for a task card.
 *
 * @param {number} index - The index of the task to be dragged.
 */
function startDraging(index) {
  currentDraggedElement = index;
  document.getElementById(`card-${index}`).classList.add("cardDragging");
}
/**
 * Highlights the drop target when a task is being dragged over it.
 *
 * @param {string} index - The ID of the drop target.
 */
function highlight(index) {
  document.getElementById(index).classList.add("drag-over");
}
/**
 * Removes the highlighting of the drop target when the drag operation ends.
 *
 * @param {string} index - The ID of the drop target.
 */
function unhighlight(index) {
  document.getElementById(index).classList.remove("drag-over");
}
/**
 * Allows a drop operation on a target element.
 *
 * @param {Event} ev - The drag event object.
 */
function allowDrop(ev) {
  ev.preventDefault();
}
/**
 * Moves a task to the specified state.
 *
 * @param {string} state - The state to move the task to.
 */
function moveTo(state) {
  let id = todos.findIndex((item) => {
    return item.id == currentDraggedElement;
  });
  todos[id]["state"] = state;
  updateHTML();
  setItem("allTasks", JSON.stringify(todos));
  unhighlight(state);
}
/**
 * Switches the state of a task to the given state.
 *
 * @param {number} index - The index of the task to switch state.
 * @param {string} state - The new state for the task.
 */
function switchTo(index, state) {
  let id = todos.findIndex((item) => {
    return item.id == index;
  });
  todos[id]["state"] = state;
  updateHTML();
  setItem("allTasks", JSON.stringify(todos));
}
/**
 * Displays the move menu when clicking the move icon.
 */
function displayMoveMenu(index) {
  let id = todos.findIndex((item) => {
    return item.id == index;
  });
    document.getElementById(`move-menu-${index}`).classList.remove("d-none");
}
function stopIt(event) {
  event.stopPropagation();
}
function hideMoveMenu(index) {
  document.getElementById(`move-menu-${index}`).classList.add("d-none");
}

/**
 * Calculates the sum of completed subtasks for a task.
 *
 * @param {object} task - The task object to calculate subtask progress for.
 * @returns {number} - The number of completed subtasks.
 */
function taskSum(task) {
  let doneTasksSum = 0;
  if (task.subtasks.subtaskDone) {
    for (let i = 0; i < task.subtasks.subtaskDone.length; i++) {
      doneTasksSum += task.subtasks.subtaskDone[i];
    }
    return doneTasksSum;
  }
}
/**
 * Determines if subtasks exist for a task and returns a CSS class name.
 *
 * @param {object} task - The task object to check for subtasks.
 * @returns {string} - A CSS class name based on the existence of subtasks.
 */
function determineIfSubtaskExists(task) {
  if (task.subtasks.subtaskDone) {
    if (task.subtasks.subtaskDone.length === 0) return "d-none";
  }
}
/**
 * Determines the color class based on the category of a task.
 *
 * @param {object} task - The task object to determine the color for.
 * @returns {string} - A CSS class name for the task card's color.
 */
function determineColor(task) {
  if (task.category == "Technical Task") {
    return "technical-task";
  } else {
    return "user-story";
  }
}
/**
 * Displays the assigned initials on a task card.
 *
 * @param {number} index - The index of the task to display assigned initials.
 */
function displayassigenedName(index) {
  let id = todos.findIndex((item) => {
    return item.id == index;
  });

  if (todos[id].assignedInitial && todos[id].assignedInitial.length > 0) {
    const ul = document.createElement("ul");
    let randomNum = Math.floor(Math.random() * 15) + 1;

    todos[id].assignedInitial.forEach((assignedInitial, i) => {
      const li = document.createElement("li");
      li.textContent = assignedInitial;
      li.classList.add("color" + (((i + randomNum) % 15) + 1));
      ul.appendChild(li);
    });

    const cardAssignedNameContainer = document.getElementById(
      `cardAssignedNameContainer${index}`
    );
    cardAssignedNameContainer.appendChild(ul);
  }
}

function hideHeaderIfNoSubtasks(id) {
  if (todos[id].subtasks.subtaskContent.length == 0) {
    return "d-none";
  }
}

/**
 * Loads tasks from remote storage and populates the tasks array.
 */
async function loadTasks() {
  try {
    todos = JSON.parse(await getItem("allTasks"));
  } catch (e) {
    console.error("loading error:", e);
  }
  updateHTML();
}
/**
 * Retrieves an item from remote storage by its key.
 *
 * @param {string} key - The key to identify the item.
 * @returns {Promise} - A promise that resolves with the retrieved item.
 */
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
/**
 * Sets an item in remote storage with the given key and value.
 *
 * @param {string} key - The key to identify the item.
 * @param {string} value - The value to store.
 * @returns {Promise} - A promise indicating the success of the operation.
 */
async function setItem(key, value) {
  const payload = { key, value, token: STORAGE_TOKEN };
  return fetch(STORAGE_URL, {
    method: "POST",
    body: JSON.stringify(payload),
  }).then((res) => res.json());
}
