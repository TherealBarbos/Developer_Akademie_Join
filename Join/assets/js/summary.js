let todos = [];
let GreetingName = [];

async function summaryInit() {
  names = getArray('name');
  GreetingName.push(names);

  includeHTML();
  await loadTasks();
  updatesummary();
  greeting();
  
}
// Laden des Remote-Storage

async function loadTasks() {
  try {
    todos = JSON.parse(await getItem("allTasks"));
  } catch (e) {
    console.error("loading error:", e);
  }
}

// Definieren des Status und Ausgabe der jeweiligen Länge

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

// Funktion zum Filtern der Tasks nach Status und ausgabe der Anzahl
function countTasksByStatus(todos, state) {
  return todos.filter((todo) => todo.state === state).length;
}

function countTasksByPrio(todos, priority) {
  return todos.filter((todo) => todo.priority === priority).length;
}

// Formatiert das Datum in die gewünschte Form

function formatDate(date) {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return date.toLocaleDateString(undefined, options);
}

// Sortiere 'todos'nach den Fälligkeitsdaten

function sortTasks(todos) {

  // Konvertiere Unix-Timestamps in Datumsobjekte
  todos.forEach(task => {
    task.dueDate = new Date(task.dueDate);
  });

  // Sortiere 'todos' nach den Fälligkeitsdaten
  todos.sort((a, b) => a.dueDate - b.dueDate);

  // Finde das nächste Fälligkeitsdatum
  const nextDueDate =
    todos.length > 0 ? new Date(todos[0].dueDate) : null;

  if (nextDueDate) {
    const formattedDate = formatDate(nextDueDate);
    document.getElementById("prioDate").innerHTML = formattedDate;
  } else {
    document.getElementById("prioDate").innerHTML = "Keine ausstehenden Aufgaben";
  }
}

// Greet User
function greeting() {
  let currentTime = new Date();
  let hours = currentTime.getHours();
  let greetingElement = document.getElementById('greeting');

  if (hours >= 12 && hours < 19) {
    greetingElement.innerHTML = `Good afternoon, <br><span class="summaryWelcomeTextName">${names}</span>`;
  } else if (hours >= 19) {
    greetingElement.innerHTML = `Good evening, <br><span class="summaryWelcomeTextName">${names}</span> `;
  } else {
    greetingElement.innerHTML = `Good morning, <br><span class="summaryWelcomeTextName">${names}</span>`;
  }
}

// STORAGE_TOKEN Laden inc der Daten

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
