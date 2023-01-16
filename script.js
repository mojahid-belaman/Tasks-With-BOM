let inputText = document.querySelector(".description");
let inputSubmit = document.querySelector(".submit");
let form = document.querySelector("form");
let tasks = document.querySelector(".tasks");
let error = document.querySelector(".error");

window.onload = function () {
  if (!localStorage.getItem("tasks"))
    return ;
  else {
    let data = JSON.parse(localStorage.getItem("tasks"));
    data?.forEach((element) => {
      createTask(element.title);
      inputText.value = "";
    });
  }
};

document.addEventListener("click", function (e) {
  if (e.target.className === "delete") {
    let id = e.target.parentElement.getAttribute("id");
    deletTask(id);
  }
});

function createTask(value, generateId) {
  let myDiv = document.createElement("div");
  let h2 = document.createElement("h2");
  let button = document.createElement("button");
  let title = document.createTextNode(value);
  h2.appendChild(title);
  button.textContent = "Delete";
  button.setAttribute("class", "delete");

  myDiv.style = `display: flex; justify-content: space-between; margin-bottom: 10px; background-color: #FFF; padding: 10px; border-radius: 5px`;
  myDiv.setAttribute("id", generateId);
  h2.style = `font-size: 1.2rem; font-weight: normal; font-family: monospace;`;
  button.style = `color: #FFF; background-color: #ff6b50; border: none; padding: 5px 10px; font-size: 0.9rem; border-radius: 5px; font-weight: bolder; cursor: pointer; outline: none;`;

  myDiv.appendChild(h2);
  myDiv.appendChild(button);
  tasks.appendChild(myDiv);
}

function deletTask(id) {
  console.log(id);
  if (localStorage.getItem("tasks")) {
    document.getElementById(`${id}`).style = `display: none;`
    let data = JSON.parse(localStorage.getItem("tasks"));
    let filter = data?.filter((element) => element.id !== id);
    localStorage.setItem("tasks", JSON.stringify(filter));
  }
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
  let newValue = inputText.value.trim();
  if (newValue === "") {
    error.style.display = "block";
  } else {
    let generateId = new Date().getMilliseconds();
    if (!localStorage.getItem("tasks")) {
      localStorage.setItem(
        "tasks",
        JSON.stringify([
          { id: `${generateId}`, title: newValue },
        ])
      );
      createTask(newValue, generateId);
      inputText.value = "";
      inputText.focus();
    } else {
      data = JSON.parse(localStorage.getItem("tasks"));
      data?.push({ id: `${generateId}`, title: newValue });
      window.localStorage.setItem("tasks", JSON.stringify(data));
      createTask(newValue, generateId);
      inputText.value = "";
      inputText.focus();
    }
  }
};
