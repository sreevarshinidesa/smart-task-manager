function addTask() {
  let task = document.getElementById("taskInput").value;
  let priority = document.getElementById("priority").value;
  let date = document.getElementById("date").value;

  if (task.trim() === "") {
    alert("Enter a task!");
    return;
  }

  let li = document.createElement("li");
  li.classList.add(priority);

  li.innerHTML = `
    <div>
      <input type="checkbox" onclick="toggleTask(this)">
      <span>${task}</span>
      ${date ? `<small> (Due: ${date})</small>` : ""}
    </div>
    <button onclick="deleteTask(this)">❌</button>
  `;

  document.getElementById("taskList").appendChild(li);

  // Clear inputs
  document.getElementById("taskInput").value = "";
  document.getElementById("date").value = "";

  updateCounter();
  saveTasks();
}

function deleteTask(btn) {
  btn.parentElement.remove();

  updateCounter();
  saveTasks();
}

function toggleTask(checkbox) {
  let text = checkbox.nextElementSibling;

  text.classList.toggle("done");

  updateCounter();
  saveTasks();
}

function searchTask() {
  let input = document
    .getElementById("searchInput")
    .value
    .toLowerCase();

  let tasks = document.querySelectorAll("#taskList li");

  tasks.forEach(task => {
    if (task.innerText.toLowerCase().includes(input)) {
      task.style.display = "flex";
    } else {
      task.style.display = "none";
    }
  });
}

function updateCounter() {
  let total = document.querySelectorAll("#taskList li").length;
  let done = document.querySelectorAll("#taskList .done").length;

  document.getElementById("total").innerText = total;
  document.getElementById("completed").innerText = done;
}

/* DARK MODE */
function toggleTheme() {
  document.body.classList.toggle("dark");

  localStorage.setItem(
    "theme",
    document.body.classList.contains("dark")
      ? "dark"
      : "light"
  );
}

/* SAVE TASKS */
function saveTasks() {
  localStorage.setItem(
    "tasks",
    document.getElementById("taskList").innerHTML
  );
}

/* LOAD TASKS */
function loadTasks() {
  document.getElementById("taskList").innerHTML =
    localStorage.getItem("tasks") || "";

  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
  }

  updateCounter();
}