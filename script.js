let inputText = document.querySelector(".description");
let inputSubmit = document.querySelector(".submit");
let form = document.querySelector("form");
let tasks = document.querySelector(".tasks");
let error = document.querySelector(".error");
let data = [];

window.onload = function () {
  if (!localStorage.getItem("tasks"))
    JSON.stringify(localStorage.setItem("tasks", []));
  else {
    let data = JSON.parse(localStorage.getItem("tasks"));
    data?.forEach((element) => {
      createTask(element.title);
    });
  }
};

function createTask(value) {
  let myDiv = document.createElement("div");
  let h2 = document.createElement("h2");
  let button = document.createElement("button");
  let title = document.createTextNode(value);
  h2.appendChild(title);
  button.textContent = "Delete";

  myDiv.style = `display: flex; justify-content: space-between; margin-bottom: 10px; background-color: #FFF; padding: 10px; border-radius: 5px`;
  h2.style = `font-size: 1.2rem; font-weight: normal; font-family: monospace;`;
  button.style = `color: #FFF; background-color: #ff6b50; border: none; padding: 5px 10px; font-size: 0.9rem; border-radius: 5px; font-weight: bolder; cursor: pointer; outline: none;`;

  myDiv.appendChild(h2);
  myDiv.appendChild(button);
  tasks.appendChild(myDiv);
}

inputText.onblur = function (e) {
  if (e.target.value === "") {
    error.style.display = "block";
  }
};

inputText.onkeyup = function () {
  error.style.display = "none";
};

form.onsubmit = function (e) {
  e.preventDefault();
  newValue = inputText.value.trim();
  if (newValue === "") {
    error.style.display = "block";
  } else {
    if (!localStorage.getItem("tasks"))
      localStorage.setItem(
        "tasks",
        JSON.stringify([{ id: `${new Date().getTime()}`, title: newValue }])
      );
    data = JSON.parse(localStorage.getItem("tasks"));
    data?.push({ id: `${new Date().getTime()}`, title: newValue });
    window.localStorage.setItem("tasks", JSON.stringify(data));
    createTask(inputText.value);
  }
};
