let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let filtro = "todas";

const form = document.getElementById("taskForm");
const input = document.getElementById("taskInput");
const list = document.getElementById("taskList");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  tasks.push({
    id: Date.now(),
    text: input.value,
    done: false
  });

  input.value = "";
  salvar();
  render();
});

function render() {
  list.innerHTML = "";

  let filtradas = tasks;

  if (filtro === "pendentes") {
    filtradas = tasks.filter(t => !t.done);
  } else if (filtro === "concluidas") {
    filtradas = tasks.filter(t => t.done);
  }

  filtradas.forEach(task => {
    const li = document.createElement("li");

    li.innerHTML = `
      <span class="${task.done ? 'done' : ''}">
        ${task.text}
      </span>

      <br><br>

      <button onclick="toggle(${task.id})">✔</button>
      <button onclick="deletar(${task.id})">🗑</button>
    `;

    list.appendChild(li);
  });
}

function toggle(id) {
  tasks = tasks.map(t =>
    t.id === id ? { ...t, done: !t.done } : t
  );

  salvar();
  render();
}

function deletar(id) {
  tasks = tasks.filter(t => t.id !== id);
  salvar();
  render();
}

function filtrar(tipo) {
  filtro = tipo;
  render();
}

function salvar() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

render();