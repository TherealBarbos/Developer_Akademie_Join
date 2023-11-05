# Übersicht
- [Projektdaten](#daten)
- [Gruppenaufteilung](#gruppenaufteilung)
	- [Ersan B.](#ersan)
	- [Oliver H.](#oliver)
	- [Manuel K.](#manu)	
- [Dokumentation](#doku)

<a name="daten"></a>
# Developer_Akademie_Join
## Git Daten
![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/TherealBarbos/Developer_Akademie_Join?logo=gith) ![GitHub repo size](https://img.shields.io/github/repo-size/TherealBarbos/Developer_Akademie_Join?logo=github) ![GitHub last commit](https://img.shields.io/github/last-commit/TherealBarbos/Developer_Akademie_Join?logo=github) ![GitHub closed pull requests](https://img.shields.io/github/issues-pr-closed/TherealBarbos/Developer_Akademie_Join?logo=github) ![GitHub Discussions](https://img.shields.io/github/discussions/TherealBarbos/Developer_Akademie_Join?logo=github) ![GitHub language count](https://img.shields.io/github/languages/count/TherealBarbos/Developer_Akademie_Join) 
## Project zur erstellung einer Join Webapp
### Schwerpunkte
- Zusammenarbeit mit Git
- Remotestorage anlegen und nutzen
- Drag and Drop
- Mockup umsetzen
### Vorlage
### [Figma](https://www.figma.com/file/3qlJ22yFozngW2gdOfczMe/Join-Version-1-(Final-version)?type=design&node-id=71072-5046&mode=design)

## Unser Join
### Das ist Unser Join nach der Figmavorlage.
## [Join](http://join-707.developerakademie.net/Join/assets/html/page1.html)


<a name="gruppenaufteilung"></a>
# Gruppenaufteilung

<a name="ersan"></a>
## Ersan B.

### Aufgaben

- Langdingpage
- Log in
- Sign up
- Contacts / remote Storage

&uarr; [zurück zur Übersicht](#top)
<a name="oliver"></a>
## Oliver H.

### Aufgaben

- Add task / remote Storage
- Add task overlay Board

&uarr; [zurück zur Übersicht](#top)
<a name="manu"></a>
## Manuel K.

### Aufgaben

> - ### **Git Repo erstellen**
##### Reop Erstellen 
##### README.md Grundstrucktur 
##### Merge branch 'main' verwalten
  
> - ### **Ordnerstrucktur aufbauen**
``` bash
├── assets/
│   ├── css
│   │   ├── mediaquery
│   ├── fonts
│   ├── html
│   ├── img
│   ├── js
│   ├── templates
├── index.html
├── style.css
├── script.je
├── README.md
```
##### tree > README.md
``` bash
+---Join
    +---assets
        +---css
        ª   +---mediaquery
        +---fonts
        +---html
        +---img
        +---js
        +---templates
```

> - ### **Summary**
##### Update of the site
```js
function updatesummary() {
  const toDoCount = countTasksByStatus(todos, "toDo");
  document.getElementById("pTodo").innerHTML = `${toDoCount}`;

  const doneCount = countTasksByStatus(todos, "done");
  document.getElementById("pDone").innerHTML = `${doneCount}`;

  const prioCount = countTasksByPrio(todos, "urgent");
  document.getElementById("prioNum").innerHTML = `${prioCount}`;

  //gibt die nächste Prio Taskabage aus
  sortTasks(todos);
}
```
##### count the Tasks
```js
function countTasksByStatus(todos, state) {
  return todos.filter((todo) => todo.state === state).length;
}
```

 
> - ### **Board**
##### Drag and Drop
``` js
function startDraging(index) {
  currentDraggedElement = index;
  document.getElementById(`card-${index}`).classList.add("cardDragging");
}
```
``` js
function allowDrop(ev) {
  ev.preventDefault();
}
```
``` js
function moveTo(state) {
  let id = todos.findIndex((item) => {
    return item.id == currentDraggedElement;
  });
  todos[id]["state"] = state;
  updateHTML();
  setItem("allTasks", JSON.stringify(todos));
  unhighlight(state);
}
```
##### Drag and Drop alternativ for mobile
``` js
function switchTo(index, state) {
  let id = todos.findIndex((item) => {
    return item.id == index;
  });
  todos[id]["state"] = state;
  updateHTML();
  setItem("allTasks", JSON.stringify(todos));
}
```
#####  Load Tasks
``` js
function showTaskListByState(state) {
  let filteredTasksByState = todos.filter((t) => t["state"] == state);

  document.getElementById(state).innerHTML = "";

  for (let index = 0; index < filteredTasksByState.length; index++) {
    const element = filteredTasksByState[index];
    document.getElementById(state).innerHTML += generateTaskCard(element);
    displayassigenedName(element.id);
  }
}

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
```
#####  Search task function
``` js
document.addEventListener("DOMContentLoaded", function () {
  const searchInput = document.querySelector("#boardSearchID");

  document.addEventListener("click", function (event) {
    if (event.target !== searchInput) {
      searchInput.value = "";

      const taskElements = document.querySelectorAll(".card");
      taskElements.forEach((taskElement) => {
        taskElement.classList.remove("d-none", "highlight");
      });
    }
  });

  // Event-Listener für das Input-Ereignis im Suchfeld
  searchInput.addEventListener("input", function () {
    const searchText = searchInput.value.toLowerCase();

    const taskElements = document.querySelectorAll(".card"); // Alle Aufgabenkarten auswählen
    taskElements.forEach((taskElement) => {
      const title = taskElement
        .querySelector(".cardTextI")
        .textContent.toLowerCase();
      const description = taskElement
        .querySelector(".cardTextII")
        .textContent.toLowerCase();
      const initials = taskElement
        .querySelector(".cardContactsBadge")
        .textContent.toLowerCase();
      const assignedName = taskElement
        .querySelector(".cardTextI")
        .textContent.toLowerCase();

      if (
        title.includes(searchText) ||
        description.includes(searchText) ||
        initials.includes(searchText) ||
        assignedName.includes(searchText)
      ) {
        taskElement.classList.add("highlight");
      } else {
        taskElement.classList.add("d-none");
        taskElement.classList.remove("highlight");
      }
    });

    if (searchInput.value === "") {
      const taskElements = document.querySelectorAll(".card");
      taskElements.forEach((taskElement) => {
        taskElement.classList.remove("d-none", "highlight");
      });
    }
  });
});


```
#####  Unix-Timestamp decode
``` js
function formatDateToDDMMYYYY(dateString) {
  const date = new Date(dateString);

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
```
##### Delete Tasks
``` js
function deleteTask(index) {
  let id = todos.findIndex((item) => {
    return item.id == index;
  });
  todos.splice(id, 1);
  setItem("allTasks", JSON.stringify(todos));
  updateHTML();
  closeOverlay();
}
``` 
> - ### **CSS Imports**

##### implement other CSS
``` css
/* Importieren Sie andere CSS-Dateien */

/* Fonts PAGE */
/* new css in assets*/
@import url("assets/css/fonts.css");

/* template (header+leftside*/
/* new css in assets*/
@import url("assets/css/template.css");

```
> - ### **Color Roots**
##### Create fixed Colors
``` css
:root {
  --primary-color: #000;
  /*schwarz*/
  --secondary-color: #2A3647;
  /*das Haupt Blau/Grau*/
  --tertiary-color: #a8a8a8;
  /*leichtes Grau (placeholder Text usw)*/
  --join-color: #29ABE2;
  /*Das Join Blau*/
}
```
> - ### **Help**
#####  onclick back to last site
``` html
<div class="return-arrow" onclick="window.history.back()">
```
> - ### **Privacy Policy**
#####  onclick close tap
``` html
 <div class="return-arrow" onclick="window.close()">
```
> - ### **Legal Notice**
#####  onclick open new tap
``` html
<a href="../html/legal-notice.html" target="_blank">Legal notice</a>
```

&uarr; [zurück zur Übersicht](#top)
## Responsive 
### Wird vom einzelnen für seine Seite gelöst
<a name="doku"></a>
# Dokumentation


&uarr; [zurück zur Übersicht](#top)
