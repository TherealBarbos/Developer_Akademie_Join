/**
 * Renders the task overlay content.
 *
 * @param {object} task - The task object to display in the overlay.
 * @param {number} id - The index of the task.
 * @returns {string} - The HTML markup for the task overlay.
 */
function renderTask(todo, id) {
  const formattedDueDate = formatDateToDDMMYYYY(todo.dueDate);

  return `
          <div class="bOverlayCategory">
          ${todo.category}
          <div class="bOverlayClose" onclick="closeOverlay()">
          <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
          >
              <mask
              index="mask0_93030_4211"
              style="mask-type: alpha"
              maskUnits="userSpaceOnUse"
              x="0"
              y="0"
              width="24"
              height="24"
              >
              <rect width="24" height="24" fill="#D9D9D9" />
              </mask>
              <g mask="url(#mask0_93030_4211)">
              <path
                  d="M12 13.4L7.09999 18.3C6.91665 18.4834 6.68332 18.575 6.39999 18.575C6.11665 18.575 5.88332 18.4834 5.69999 18.3C5.51665 18.1167 5.42499 17.8834 5.42499 17.6C5.42499 17.3167 5.51665 17.0834 5.69999 16.9L10.6 12L5.69999 7.10005C5.51665 6.91672 5.42499 6.68338 5.42499 6.40005C5.42499 6.11672 5.51665 5.88338 5.69999 5.70005C5.88332 5.51672 6.11665 5.42505 6.39999 5.42505C6.68332 5.42505 6.91665 5.51672 7.09999 5.70005L12 10.6L16.9 5.70005C17.0833 5.51672 17.3167 5.42505 17.6 5.42505C17.8833 5.42505 18.1167 5.51672 18.3 5.70005C18.4833 5.88338 18.575 6.11672 18.575 6.40005C18.575 6.68338 18.4833 6.91672 18.3 7.10005L13.4 12L18.3 16.9C18.4833 17.0834 18.575 17.3167 18.575 17.6C18.575 17.8834 18.4833 18.1167 18.3 18.3C18.1167 18.4834 17.8833 18.575 17.6 18.575C17.3167 18.575 17.0833 18.4834 16.9 18.3L12 13.4Z"
                  fill="#2A3647"
              />
              </g>
          </svg>
          </div>
      </div>
      <div ${todo.title} class="bOverlayTitle">${todo.title}</div>
      <div class="bOverlayText">${todo.description}</div>
      <div class="bOverlayText">Due date: ${formattedDueDate}</div>
      <div class="bOverlayText bOverlayuppercase">
          Priority: ${todo.priority}<img
          src="${todo.priorityImageSource}"
          alt=""
          class="cardContactsPrioImg"
          />
      </div>
      <div class="bOverlayAssigned">
          Assigned To:
          <div class="bOverlayAssignedNames">
          <div
              class="overlayIniNam"
              id="cardAssignedNameContainerOverlay${todo.id}"
          ></div>
          </div>
      </div>
      <div class="bOverlayText ${hideHeaderIfNoSubtasks(id)}">Subtasks</div>
      <ul id="subtask-list-container${id}" class="bOverlaySub"></ul>

      <div class="bOverlaycontrolls">
          <div onclick="deleteTask(${todo.id})" class="bOverlaycontrollsbutton">
          <svg
              class="control-SVG"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
          >
              <mask
              index="mask0_93030_4270"
              style="mask-type: alpha"
              maskUnits="userSpaceOnUse"
              x="0"
              y="0"
              width="24"
              height="24"
              >
              <rect width="24" height="24" />
              </mask>
              <g mask="url(#mask0_93030_4270)">
              <path
                  d="M7 21C6.45 21 5.97917 20.8042 5.5875 20.4125C5.19583 20.0208 5 19.55 5 19V6C4.71667 6 4.47917 5.90417 4.2875 5.7125C4.09583 5.52083 4 5.28333 4 5C4 4.71667 4.09583 4.47917 4.2875 4.2875C4.47917 4.09583 4.71667 4 5 4H9C9 3.71667 9.09583 3.47917 9.2875 3.2875C9.47917 3.09583 9.71667 3 10 3H14C14.2833 3 14.5208 3.09583 14.7125 3.2875C14.9042 3.47917 15 3.71667 15 4H19C19.2833 4 19.5208 4.09583 19.7125 4.2875C19.9042 4.47917 20 4.71667 20 5C20 5.28333 19.9042 5.52083 19.7125 5.7125C19.5208 5.90417 19.2833 6 19 6V19C19 19.55 18.8042 20.0208 18.4125 20.4125C18.0208 20.8042 17.55 21 17 21H7ZM7 6V19H17V6H7ZM9 16C9 16.2833 9.09583 16.5208 9.2875 16.7125C9.47917 16.9042 9.71667 17 10 17C10.2833 17 10.5208 16.9042 10.7125 16.7125C10.9042 16.5208 11 16.2833 11 16V9C11 8.71667 10.9042 8.47917 10.7125 8.2875C10.5208 8.09583 10.2833 8 10 8C9.71667 8 9.47917 8.09583 9.2875 8.2875C9.09583 8.47917 9 8.71667 9 9V16ZM13 16C13 16.2833 13.0958 16.5208 13.2875 16.7125C13.4792 16.9042 13.7167 17 14 17C14.2833 17 14.5208 16.9042 14.7125 16.7125C14.9042 16.5208 15 16.2833 15 16V9C15 8.71667 14.9042 8.47917 14.7125 8.2875C14.5208 8.09583 14.2833 8 14 8C13.7167 8 13.4792 8.09583 13.2875 8.2875C13.0958 8.47917 13 8.71667 13 9V16Z"
              />
              </g>
          </svg>
          <div class="bOverlaycontrollsText">Delete</div>
          <img src="../img/short_separating_line.svg" />
          </div>
          <div onclick="editTask(${id})" class="bOverlaycontrollsbutton">
          <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
          >
              <mask
              index="mask0_93030_4276"
              style="mask-type: alpha"
              maskUnits="userSpaceOnUse"
              x="0"
              y="0"
              width="24"
              height="24"
              >
              <rect width="24" height="24" />
              </mask>
              <g mask="url(#mask0_93030_4276)">
              <path
                  d="M5 19H6.4L15.025 10.375L13.625 8.975L5 17.6V19ZM19.3 8.925L15.05 4.725L16.45 3.325C16.8333 2.94167 17.3042 2.75 17.8625 2.75C18.4208 2.75 18.8917 2.94167 19.275 3.325L20.675 4.725C21.0583 5.10833 21.2583 5.57083 21.275 6.1125C21.2917 6.65417 21.1083 7.11667 20.725 7.5L19.3 8.925ZM17.85 10.4L7.25 21H3V16.75L13.6 6.15L17.85 10.4Z"
              />
              </g>
          </svg>
          <div class="bOverlaycontrollsText" onclick="editTask(${id})">Edit</div>
          </div>
      </div>
  `;
}
/**
 * Displays assigned initials and names in the overlay.
 *
 * @param {number} index - The index of the task to display assigned initials and names.
 */
function displayAssignedNameOverlay(index) {
  let id = todos.findIndex((item) => {
    return item.id == index;
  });

  if (todos[id].assignedInitial && todos[id].assignedInitial.length > 0) {
    const ul = document.createElement("ul");

    todos[id].assignedInitial.forEach((assignedInitial, i) => {
      if (todos[id].assignedName && todos[id].assignedName[i]) {
        const li = document.createElement("li");

        let randomNum = Math.floor(Math.random() * 15) + 1;

        // Erstelle das erste div-Element
        const div1 = document.createElement("div");
        div1.textContent = assignedInitial;
        div1.classList.add("initialsOverlay");
        div1.classList.add(`color${randomNum}`);
        li.appendChild(div1);

        // Erstelle das zweite div-Element
        const div2 = document.createElement("div");
        div2.textContent = todos[id].assignedName[i];
        div2.classList.add("nameOverlay");
        li.appendChild(div2);

        ul.appendChild(li);
      }
    });

    const cardAssignedNameContainerOverlay = document.getElementById(
      `cardAssignedNameContainerOverlay${index}`
    );
    cardAssignedNameContainerOverlay.appendChild(ul);
  }
}

/**
 * Shows an overlay with detailed information about a task.
 *
 * @param {number} index - The index of the task to show in the overlay.
 */
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
  displayAssignedNameOverlay(index);
  displaySubtasks(index); // index = e.g.: 1698364123489791324514
}
/**
 * Displays subtasks on the overlay.
 *
 * @param {number} index - The index of the task to display subtasks for.
 */
function displaySubtasks(index) {
  let id = todos.findIndex((item) => {
    return item.id == index;
  });
  let container = document.getElementById(`subtask-list-container${id}`);
  for (let i = 0; i < todos[id].subtasks.subtaskContent.length; i++) {
    const subtask = todos[id].subtasks.subtaskContent[i];
    SpecialID = 1 + id.toString() + i.toString();
    container.innerHTML += `
      <li class="subtaskListItem" onclick="toggleNameSubtask(${SpecialID}, ${id}, ${i})">
        <img src="${getImage(
          id,
          i
        )}" class="checkboxSubtask" id="checkboxSubtask${SpecialID}">
        <span>${subtask}<span>
      </li>
      `;
  }
}

function getImage(id, i) {
  if (todos[id].subtasks.subtaskDone[i] == 0) {
    return "../img/checkbox-unchecked.png";
  } else {
    return "../img/checkbox-checked-black-stroke.svg";
  }
}
/**
 * Toggles the completion status of a subtask.
 *
 * @param {number} SpecialID - The unique ID of the subtask.
 * @param {number} id - The index of the task containing the subtask.
 * @param {number} i - The index of the subtask within the task.
 */
function toggleNameSubtask(SpecialID, id, i) {
  let checkbox = document.getElementById(`checkboxSubtask${SpecialID}`);

  if (todos[id].subtasks.subtaskDone[i] == 0) {
    todos[id].subtasks.subtaskDone[i] = 1;
    checkbox.src = "../img/checkbox-checked-black-stroke.svg";
  } else {
    todos[id].subtasks.subtaskDone[i] = 0;
    checkbox.src = "../img/checkbox-unchecked.png";
  }
  setItem("allTasks", JSON.stringify(todos));
}
/**
 * Formats a date string to "DD/MM/YYYY" format.
 *
 * @param {string} dateString - The date string to format.
 * @returns {string} - The formatted date in "DD/MM/YYYY" format.
 */
function formatDateToDDMMYYYY(dateString) {
  const date = new Date(dateString);

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
}
/**
 * Closes the task overlay.
 */
function closeOverlay() {
  document.getElementById("boardHeader").classList.remove("blurout");
  document.getElementById("board").classList.remove("blurout");
  document.getElementById("overlay").classList.remove("overlayposition");
  taskoverlay.classList.add("d-none");
  updateHTML();
}
/**
 * Deletes a task from the tasks array and updates the HTML.
 *
 * @param {number} index - The index of the task to delete.
 */
function deleteTask(index) {
  let id = todos.findIndex((item) => {
    return item.id == index;
  });
  todos.splice(id, 1);
  setItem("allTasks", JSON.stringify(todos));
  updateHTML();
  closeOverlay();
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
