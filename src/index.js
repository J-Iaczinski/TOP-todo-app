import style from "./style.css";
import { closeModal, createModal, openModal } from "./dialog.js";
import { displayNote } from "./noteCreator.js";
export { projects };

// Notes Array

// Projects Array
const projects = ["project1", "project2"];

// Add event listener for the "New Task" button
function modalHandler() {
  const newTask = document.querySelector("#newTask");

  newTask.addEventListener("click", () => {
    createModal();
    openModal(); // Only open modal, event listeners are already inside createModal()
    closeModal();
  });
}
displayNote();
modalHandler();
