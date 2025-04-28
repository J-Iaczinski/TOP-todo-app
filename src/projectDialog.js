import { createModal } from "./dialog";
import { projectCreator, saveProject } from "./project";
export { openProjectModal };

function projectModal() {
  const modalDiv = document.createElement("dialog");
  modalDiv.classList = "modal";

  const h2Title = document.createElement("h2");
  h2Title.textContent = "Nova Projeto";

  const dialogDiv = document.createElement("div");
  dialogDiv.classList = "dialog";

  const form = document.createElement("form");
  form.classList = "formdialog";
  form.setAttribute("action", "");
  form.setAttribute("method", "get");

  const inputTitle = document.createElement("input");
  inputTitle.setAttribute("name", "project");
  inputTitle.setAttribute("type", "text");
  inputTitle.setAttribute("placeholder", "Nome do Projeto");

  const confirmBtn = document.createElement("button");
  confirmBtn.classList = "confirmBtn";
  confirmBtn.textContent = "Create";
  confirmBtn.type = "submit";

  const cancelBtn = document.createElement("button");
  cancelBtn.classList = "cancelBtn";
  cancelBtn.textContent = "Cancel";
  cancelBtn.type = "button";

  const buttonDiv = document.createElement("div");
  buttonDiv.classList = "btnDiv";

  buttonDiv.appendChild(cancelBtn);
  buttonDiv.appendChild(confirmBtn);

  form.appendChild(inputTitle);
  form.appendChild(buttonDiv);

  modalDiv.appendChild(h2Title);
  dialogDiv.appendChild(form);
  modalDiv.appendChild(dialogDiv);

  // Adicionar modal ao body
  document.body.appendChild(modalDiv);

  form.addEventListener("submit", handleProject);
}

function openProjectModal() {
  createModal();
  projectModal();

  const modal = document.querySelector("dialog");

  modal.showModal();
}

function handleProject(event) {
  event.preventDefault();

  const form = event.target; // Get the form element
  const project = form.querySelector('input[name="project"]');

  const newNote = projectCreator(project.value);

  saveProject(newNote);

  const modal = document.querySelector("dialog");
  modal.close();
}
