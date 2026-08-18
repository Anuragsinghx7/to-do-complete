//Fetech elements

const Lists = document.querySelectorAll(".list");
const Cards = document.querySelectorAll(".card");

const iconclass = document.querySelector(".addtask");
const inputclass = document.querySelector(".input");
const submit = document.querySelector("#submit-button");
const todoclass = document.querySelector("#list1");
const thisinput = document.querySelector("#this-input");

//To Add New Tasks
iconclass.addEventListener("click", addTask);
function addTask() {
  iconclass.style.display = "none";
  inputclass.style.display = "flex";
  inputclass.style.gap = "30px";
}
//To submit task
let alltasks = JSON.parse(sessionStorage.getItem("alltasks")) || [];
inputclass.addEventListener("submit", submitTask);
function submitTask(event) {
  event.preventDefault();
  const input = thisinput.value.trim();
  sessionStorage.setItem("alltasks", JSON.stringify(input));
  addCard(input);
  iconclass.style.display = "block";
  inputclass.style.display = "none";
  inputclass.reset();
}
function addCard(input) {
  const newCard = document.createElement("div");
  newCard.textContent = input;
  newCard.classList.add("card");
  newCard.id = "card" + Date.now();
  newCard.draggable = "true";
  darkModeButton.addEventListener("click", () => {
    if (darkModeButton.textContent === "LIGHT-MODE") {
      newCard.classList.add("black");
    } else {
      newCard.classList.remove("black");
    }
  });

  makeDraggable(newCard);
  todoclass.appendChild(newCard);
}

//To make cards draggable between all Lists
for (const Card of Cards) {
  Card.addEventListener("dragstart", dragstart);
  Card.addEventListener("dragend", dragend);
}

for (const List of Lists) {
  List.addEventListener("dragover", dragover);
  List.addEventListener("dragenter", dragenter);

  List.addEventListener("dragleave", dragleave);

  List.addEventListener("drop", drop);
}
function dragstart(event) {
  event.dataTransfer.setData("text/plain", this.id);
}
function dragover(event) {
  event.preventDefault();
}
function dragleave(event) {
  event.preventDefault();
  this.classList.remove("over");
}
function dragenter(event) {
  event.preventDefault();
  this.classList.add("over");
}
function drop(event) {
  const id = event.dataTransfer.getData("text/plain");
  const card = document.getElementById(id);
  this.appendChild(card);
  this.classList.remove("over");
}
function dragend() {
  console.log("hello");
}
function makeDraggable(newCard) {
  newCard.addEventListener("dragstart", dragstart);
  newCard.addEventListener("dragend", dragend);
}

//darkmode
const darkModeButton = document.querySelector("#dark-mode");
const darkModeClass = document.querySelector(".dark-mode");
const body = document.querySelector("body");
const inputEl = document.querySelector(".this-input");

darkModeButton.addEventListener("click", addDarkmode);
function addDarkmode(event) {
  body.classList.toggle("black");
  body.classList.toggle("white-text");
  for (list of Lists) {
    list.classList.toggle("aquagreen");
    list.classList.toggle("black-text");
  }
  for (card of Cards) {
    card.classList.toggle("black");
    card.classList.toggle("white-text");
  }
  darkModeButton.textContent === "DARK-MODE"
    ? (darkModeButton.textContent = "LIGHT-MODE")
    : (darkModeButton.textContent = "DARK-MODE");
  iconclass.classList.toggle("black");
  inputclass.classList.toggle("black");
  darkModeClass.classList.toggle("addborder");
}
