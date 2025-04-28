import style from "./style.css";
import { closeModal, createModal, openModal } from "./dialog.js";
import { projectCreator, saveProject, displayProjects } from "./project.js";
import { displayNote } from "./noteCreator.js";
export { projects };
import { openProjectModal } from "./projectDialog.js";

// Projects Array

const projects = localStorage.getItem("projectLibrary") || [];

// Add event listener for the "New Task" button
function modalHandler() {
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
    createModal();
    openModal(); // Only open modal, event listeners are already inside createModal()
    closeModal();
  });
}

displayProjects();
displayNote();
modalHandler();
