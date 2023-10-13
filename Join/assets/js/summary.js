let todos = [];


async function summaryinit(){
  includeHTML();
  await loadTasks();
  updatesummary();

  // countTasksByStatus();

}
// Laden des Remote-Storage

async function loadTasks() {
  try {
    todos = JSON.parse(await getItem("allTasks"));
    console.log(todos);
  } catch (e) {
    console.error("loading error:", e);
  }
}

// Definieres des Status und Ausgabe der jeweiligen länge

function updatesummary() {

  const toDoCount = countTasksByStatus(todos, 'toDo');
  document.getElementById('pTodo').innerHTML = `${toDoCount}`;

  const doneCount = countTasksByStatus(todos, 'done');
  document.getElementById('pDone').innerHTML = `${doneCount}`;
}

// Funktion zum Filtern der Tasks nach Status und ausgabe der Anzahl
function countTasksByStatus(todos, state) {
  return todos.filter(todo => todo.state === state).length;
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
