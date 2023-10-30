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
![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/TherealBarbos/Developer_Akademie_Join?logo=gith) ![GitHub repo size](https://img.shields.io/github/repo-size/TherealBarbos/Developer_Akademie_Join?logo=github) ![GitHub last commit](https://img.shields.io/github/last-commit/TherealBarbos/Developer_Akademie_Join?logo=github) ![GitHub closed pull requests](https://img.shields.io/github/issues-pr-closed/TherealBarbos/Developer_Akademie_Join?logo=github) ![GitHub Discussions](https://img.shields.io/github/discussions/TherealBarbos/Developer_Akademie_Join?logo=github)  ![GitHub](https://img.shields.io/github/license/TherealBarbos/Developer_Akademie_Join) ![GitHub language count](https://img.shields.io/github/languages/count/TherealBarbos/Developer_Akademie_Join) 
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
## [Join](http://join-707.developerakademie.net/Join/index.html)


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

> - **Git Repo erstellen**
##### Reop Erstellen 
##### REDME.md Grundstrucktur 
##### Merge branch 'main' verwalten
  
> - **Ordnerstrucktur aufbauen**
``` bash
├── assets/
│   ├── css
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

> - **Summary**
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

 
> - **Board**
##### Drag and Drop
``` js
function startDraging(index) {
  currentDraggedElement = index;
  document.getElementById(`card-${index}`).classList.add("cardDragging");
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
      <div class="cardLable ${determineColor(task)}">${task.category}</div>
      <div class="cardTextbox">
        <div class="cardTextI">${task.title}</div>
        <div class="cardTextII">${task.description}</div>
      </div>
      <div id="card-subtask-${task.id}" class="cardProgress ${determineIfSubtaskExists(task)}">
        <div class="cardProgressbar">
          <div class="progress">
           <div class="progress-bar" role="progressbar" style="width: ${(taskSum(task) / task.subtasks.subtaskContent.length) * 100}%; 
           height: 15px; border-radius: 8px;" aria-valuenow="${taskSum(task)}" aria-valuemin="0" aria-valuemax="${task.subtasks.subtaskContent.length}"></div>
          </div>
        </div>
         <div class="cardProgressText">${taskSum(task)}/${task.subtasks.subtaskContent.length} Subtasks</div>
      </div>
      <div class="cardContacts">
        <div class="cardContactsBadge">
          <div class="cardAssignedInitials" id="cardAssignedNameContainer${task.id}"></div>
        </div>
        <div class="cardContactsPrio">
          <img src="${task.priorityImageSource}" alt="" class="cardContactsPrioImg" />
        </div>
      </div>
    </div>
  </div>`;
}
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
> - **CSS Imports**

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
> - **Color Roots**
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
> - **Help**
#####  onclick back to last site
``` html
<div class="return-arrow" onclick="window.history.back()">
```
> - **Privacy Policy**
#####  onclick close tap
``` html
 <div class="return-arrow" onclick="window.close()">
```
> - **Legal Notice**
#####  onclick open new tap
``` html
<a href="../html/legal-notice.html" target="_blank">Legal notice</a>
```

&uarr; [zurück zur Übersicht](#top)
## Responsive 
### Wird vom einzelnen für seine Seite gelöst
<a name="doku"></a>
# Dokumentation
### Das Ausarbeiten einer Dokumentation für ein Git-Projekt ist eine wichtige Aufgabe, um sicherzustellen, dass Entwickler und Teammitglieder das Projekt verstehen und effektiv zusammenarbeiten können. Hier ist eine Anleitung zur Erstellung einer Git-Dokumentation:

#### Projektbeschreibung:
Beginnen Sie Ihre Dokumentation mit einer allgemeinen Beschreibung des Projekts. Geben Sie einen kurzen Überblick darüber, worum es in Ihrem Git-Projekt geht und welche Ziele Sie verfolgen.

#### Projektstruktur:
Beschreiben Sie die Ordnerstruktur und die wichtigsten Dateien in Ihrem Git-Projekt. Erklären Sie, welche Dateien für welchen Zweck verwendet werden.

#### Installation und Setup:
Geben Sie Anleitungen zur Installation und Konfiguration des Projekts. Dies sollte Informationen über die erforderlichen Abhängigkeiten, Versionskontrolle und die Einrichtung von Entwicklungsumgebungen enthalten.

#### Verwendung von Git:
Erklären Sie, wie Git in Ihrem Projekt verwendet wird. Dies kann Folgendes umfassen:

#### Wie man das Projekt klonen kann.
Wie man Änderungen committet, pusht und pulled.
Wie man Branches erstellt und mergt.
Wie man Konflikte in Git behebt.
Coding Guidelines und Best Practices:
Wenn Sie bestimmte Codierungsrichtlinien oder Best Practices für Ihr Projekt haben, sollten Sie diese in der Dokumentation festhalten. Dies kann Coding-Standards, Namenskonventionen und andere Entwicklungsrichtlinien umfassen.

#### Projektabhängigkeiten:
Listen Sie alle Abhängigkeiten oder Bibliotheken auf, die in Ihrem Projekt verwendet werden, und geben Sie an, wie sie installiert und aktualisiert werden können.

#### Testverfahren:
Beschreiben Sie, wie Tests in Ihrem Projekt durchgeführt werden. Dies kann Unit-Tests, Integrationstests oder andere Arten von Tests einschließen. Geben Sie Anleitungen zur Ausführung von Tests und zur Berichterstellung.

#### Dokumentation von APIs und Schnittstellen:
Wenn Ihr Projekt APIs oder Schnittstellen bereitstellt, sollten Sie diese detailliert dokumentieren. Dies kann die Endpunkte, Parameter, Anfragemethoden und erwarteten Antworten umfassen.

#### Contributing Guidelines:
Wenn Ihr Projekt Open Source ist und Sie Beiträge von anderen Entwicklern akzeptieren, geben Sie Anleitungen zur Zusammenarbeit und zur Einreichung von Pull Requests.

#### Lizenz und Urheberrecht:
Stellen Sie sicher, dass Sie klar angeben, unter welcher Lizenz Ihr Projekt veröffentlicht ist, und geben Sie die Urheberrechtsinformationen an.

#### Troubleshooting:
Listen Sie häufig auftretende Probleme und deren Lösungen auf. Dies kann Entwicklern helfen, Probleme schneller zu beheben.

#### Aktualisierung der Dokumentation:
Betonen Sie die Wichtigkeit der regelmäßigen Aktualisierung der Dokumentation, um sicherzustellen, dass sie immer auf dem neuesten Stand ist.

#### Anleitungen zur Versionsverwaltung:
Erklären Sie, wie Sie Versionsnummern und -tags in Ihrem Projekt verwalten, um verschiedene Versionen Ihres Codes nachvollziehbar zu machen.

#### Beispiele und Code-Snippets:
Ergänzen Sie die Dokumentation mit Beispielen und Code-Snippets, um den Entwicklern das Verständnis und die Verwendung Ihres Codes zu erleichtern.

#### Referenzen und Ressourcen:
Fügen Sie Links zu weiteren Ressourcen hinzu, die den Entwicklern bei der Arbeit mit Ihrem Projekt helfen können.

Sobald Sie diese Punkte abgedeckt haben, können Sie die Dokumentation in einem geeigneten Format veröffentlichen, z. B. als README.md-Datei in Ihrem Git-Repository, in einer Wiki-Seite oder auf Ihrer Website. Stellen Sie sicher, dass die Dokumentation leicht zugänglich und gut organisiert ist, damit die Benutzer und Entwickler leicht finden können, wonach sie suchen.

&uarr; [zurück zur Übersicht](#top)
