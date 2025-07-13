import style from "./style.css";
import { closeModal, createModal, openModal } from "./dialog.js";
import { projectCreator, saveProject, displayProjects } from "./project.js";
import { displayNote } from "./noteCreator.js";
export { projects, displayTodas };
import { openProjectModal } from "./projectDialog.js";

// Projects Array

const projects = localStorage.getItem("projectLibrary") || [];
localStorage.setItem("currentProject", "all");

// Add event listener for the "New Task" button
function modalHandler() {
  const todas = document.querySelector(".optTask");
  todas.addEventListener("click", () => {
    displayTodas();
  });

  const newTask = document.querySelector("#newTask");

  const newProject = document.querySelector("#newProject");

  newProject.addEventListener("click", () => {
    openProjectModal();
    closeModal();
  });

  newTask.addEventListener("click", () => {
    openModal(); // Only open modal, event listeners are already inside createModal()
    closeModal();
  });

  const newCard = document.querySelector(".newCard");

  newCard.addEventListener("click", () => {
    openModal(); // Only open modal, event listeners are already inside createModal()
    closeModal();
  });
}

function displayTodas() {
  localStorage.setItem("currentProject", "all");
  const projectTitle = document.querySelector(".card-title");
  projectTitle.innerHTML = "Todas";

  displayNote();
}

displayProjects();
displayNote();
modalHandler();
