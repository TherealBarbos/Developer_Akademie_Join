let allTasks = [];

function addTask() {
    const taskTitle = document.getElementById('task-title').value;
    const taskDescription = document.getElementById('task-description').value;
    const assignedName = document.getElementById('assignedName').value;
    const dueDateStr = document.getElementById('dueDate').value;
    // const priority =
    const category = document.getElementById('category').value;

    const dueDate = new Date(dueDateStr).getTime();

    console.log('task-title', taskTitle);
    console.log('task-description', taskDescription);
    console.log('dueDate', dueDate);




    let task = {
        'title': taskTitle,
        'description': taskDescription,
        'assignedName': assignedName,
        'dueDate': dueDate, // dueDate represents Unix timestamp. Needs to be re-converted later?
        // 'priority': ___________,
        'category': category,
        // 'subtasks': ________,
    }

    allTasks.push(task);
    let allTasksAsString = JSON.stringify(allTasks);
}

function urgentButton() {
    let img = document.getElementById('urgent-img');
    const urgentButton = document.getElementById('urgent');
    const mediumButton = document.getElementById('medium');
    const lowButton = document.getElementById('low');

    if (!urgentButton.classList.contains('urgent')) {
        urgentButton.classList.add('urgent');
        img.src = 'assets/img/urgent.png'
    } else {
        urgentButton.classList.remove('urgent')
        img.src = 'assets/img/urgent_no_bg.png'
    }

    mediumButton.classList.remove('medium');
    lowButton.classList.remove('low');


}

function mediumButton() {
    const urgentButton = document.getElementById('urgent');
    const mediumButton = document.getElementById('medium');
    const lowButton = document.getElementById('low')

    if (!mediumButton.classList.contains('medium')) {
        mediumButton.classList.add('medium');
        img.src = 'assets/img/medium.png'
    } else { 
        mediumButton.classList.remove('medium') 
        img.src = 'assets/img/urgent_no_bg.png'
    }

    urgentButton.classList.remove('urgent')
    lowButton.classList.remove('low');
}

function lowButton() {
    const urgentButton = document.getElementById('urgent');
    const mediumButton = document.getElementById('medium');
    const lowButton = document.getElementById('low')

    if (!lowButton.classList.contains('low')) {
        lowButton.classList.add('low');
        img.src = 'assets/img/low.png'
    } else { 
        lowButton.classList.remove('low') 
        img.src = 'assets/img/low.png'
    }

    urgentButton.classList.remove('urgent')
    mediumButton.classList.remove('medium');
}