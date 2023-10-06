let tasks = [];


// Funktion zum Filtern von Tasks mit Status "todo"
function filterTasksByStatus(tasks, state) {
    return tasks.filter(task => task.state === toDo);
  }
// Funktion zum Filtern von Tasks mit Status "done"

function filterTasksByStatus(tasks, state) {
    return tasks.filter(task => task.state === done);
  }



async function loadTasks() {
    try {
        tasks = JSON.parse(await getItem('allTasks'));
        console.log(tasks)
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