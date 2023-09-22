function addTask() {
    taskTitle = document.getElementById('task-title').value;
    taskDescription = document.getElementById('task-description').value
    dueDate = document.getElementById('dueDate').value.getTime();

    console.log ('task-title', taskTitle)
    console.log ('task-description', taskDescription)
    console.log ('dueDate', dueDate)

    let task = {
        'title': taskTitle,
        'description': taskDescription,
        'dueDate': dueDate,

    }
}