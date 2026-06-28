/*PLANNER.JS
   This file makes the task planner work.
   It handles: adding tasks, marking them
   as done, and deleting them.*/

// This is an array — a list that holds all our tasks
// Each task is an object with a name and a "done" status
var tasks = [];

/*ADD TASK FUNCTION
   This runs when the user clicks "Add Task"
   It reads what they typed, adds it to our list,
   then refreshes the display. */
function addTask() {
  // Step 1: Get the input box element
  var input = document.getElementById('taskInput');

  // Step 2: Read the text the user typed (and trim removes extra spaces)
  var taskText = input.value.trim();

  // Step 3: If the box is empty, alert the user and stop
  if (taskText === '') {
    alert('Please type a task before clicking Add Task!');
    return; // "return" stops the function here
  }

  // Step 4: Create a task object and push it into the array
  var newTask = {
    text: taskText,
    done: false   // starts as not completed
  };
  tasks.push(newTask);

  // Step 5: Clear the input box so it's ready for the next task
  input.value = '';

  // Step 6: Re-draw the task list on screen
  displayTasks();
}

/* DISPLAY TASKS FUNCTION
   This function reads the tasks array and
   builds the HTML to show each task on screen.
   It replaces everything inside the taskList div. */
function displayTasks() {
  // Get the container div where tasks will appear
  var taskList = document.getElementById('taskList');

  // If there are no tasks, show a friendly message
  if (tasks.length === 0) {
    taskList.innerHTML = '<p class="no-tasks">No tasks yet. Add one above to get started!</p>';
    updateCounter();
    return;
  }

  // Build the HTML string for all tasks
  var html = '';

  // Loop through every task in the array
  for (var i = 0; i < tasks.length; i++) {
    // If task is done, add the "done" class (which adds strikethrough)
    var doneClass = tasks[i].done ? 'done' : '';
    var checkedAttr = tasks[i].done ? 'checked' : '';

    // Build one task item. Notice we pass the index (i) to each function
    // so we know WHICH task to mark or delete
    html += '<div class="task-item ' + doneClass + '">';
    html +=   '<input type="checkbox" ' + checkedAttr + ' onchange="toggleDone(' + i + ')" />';
    html +=   '<span class="task-text">' + tasks[i].text + '</span>';
    html +=   '<button class="delete-btn" onclick="deleteTask(' + i + ')">Delete</button>';
    html += '</div>';
  }

  // Put the built HTML into the page
  taskList.innerHTML = html;

  // Update the task counter
  updateCounter();
}

/* TOGGLE DONE FUNCTION 
   Runs when the user ticks/unticks a checkbox.
   It flips the "done" value for that task,
   then refreshes the display. */
function toggleDone(index) {
  // Flip true to false, or false to true
  tasks[index].done = !tasks[index].done;

  // Redraw the list
  displayTasks();
}

/* DELETE TASK FUNCTION
   Runs when user clicks the Delete button.
   splice() removes 1 item at the given index
   from the array. */
function deleteTask(index) {
  tasks.splice(index, 1);

  // Redraw the list
  displayTasks();
}

/* UPDATE COUNTER FUNCTION 
   Counts how many tasks exist and how many
   are done, then updates the counter text. */
function updateCounter() {
  var total = tasks.length;
  var completed = 0;

  // Count how many tasks have done = true
  for (var i = 0; i < tasks.length; i++) {
    if (tasks[i].done === true) {
      completed++;
    }
  }

  // Update the counter paragraph on screen
  document.getElementById('taskCounter').textContent =
    total + ' task(s) — ' + completed + ' completed';
}

/* ALLOW ENTER KEY
   This lets users press Enter to add a task
   instead of clicking the button. */
document.getElementById('taskInput').addEventListener('keypress', function (event) {
  // keyCode 13 is the Enter key
  if (event.key === 'Enter') {
    addTask();
  }
});