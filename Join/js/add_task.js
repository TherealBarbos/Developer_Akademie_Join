let allTasks = [];

function addTask() { // this function creates a JSON array that holds the title, description, etc. of the task you want to add
    const taskTitle = document.getElementById('task-title').value;
    const taskDescription = document.getElementById('task-description').value;
    const assignedName = document.getElementById('assignedName');
    const dueDateStr = document.getElementById('dueDate').value; 
    const dueDate = new Date(dueDateStr).getTime();
    const priority = getSelectedPriority();
    const category = document.getElementById('category').value;
    // subtask

    

    console.log('task-title', taskTitle);
    console.log('task-description', taskDescription);
    console.log('dueDate', dueDate);




    let task = {
        'title': taskTitle,
        'description': taskDescription,
        'assignedName': assignedName,
        'dueDate': dueDate, // dueDate represents Unix timestamp. Needs to be re-converted later?
        'priority': priority,
        'category': category,
        // 'subtasks': ________,
    }

    allTasks.push(task);
    let allTasksAsString = JSON.stringify(allTasks);
}

function getSelectedPriority() {
    const urgentButton = document.getElementById('urgent');
    const mediumButton = document.getElementById('medium');
    const lowButton = document.getElementById('low');

    if (urgentButton.classList.contains('urgent')) {
        return 'urgent';
    } else if (mediumButton.classList.contains('medium')) {
        return 'medium';
    } else if (lowButton.classList.contains('low')) {
        return 'low';
    } else {
        return ''; // No priority selected
    }
}

function urgentButton() { //this function handles the clicking/unclicking of the urgent button
    let img = document.getElementById('urgent-img');
    const urgentButton = document.getElementById('urgent');
    const mediumButton = document.getElementById('medium');
    const lowButton = document.getElementById('low');

    if (!urgentButton.classList.contains('urgent')) {
        urgentButton.classList.add('urgent');
        img.src = 'assets/img/urgent.png';
    } else {
        urgentButton.classList.remove('urgent');
        img.src = 'assets/img/urgent_no_bg.png';
    }

    mediumButton.classList.remove('medium');
    lowButton.classList.remove('low');
}

function mediumButton() { //this function handles the clicking/unclicking of the medium button
    let img = document.getElementById('medium-img');
    const urgentButton = document.getElementById('urgent');
    const mediumButton = document.getElementById('medium');
    const lowButton = document.getElementById('low');

    if (!mediumButton.classList.contains('medium')) {
        mediumButton.classList.add('medium');
        img.src = 'assets/img/medium.png';
    } else { 
        mediumButton.classList.remove('medium'); 
        img.src = 'assets/img/medium_no_bg.png';
    }

    urgentButton.classList.remove('urgent');
    lowButton.classList.remove('low');
}

function lowButton() { //this function handles the clicking/unclicking of the low button
    let img = document.getElementById('low-img');
    const urgentButton = document.getElementById('urgent');
    const mediumButton = document.getElementById('medium');
    const lowButton = document.getElementById('low');

    if (!lowButton.classList.contains('low')) {
        lowButton.classList.add('low');
        img.src = 'assets/img/low.png';
    } else { 
        lowButton.classList.remove('low') 
        img.src = 'assets/img/low_no_bg.png';
    }

    urgentButton.classList.remove('urgent');
    mediumButton.classList.remove('medium');
}