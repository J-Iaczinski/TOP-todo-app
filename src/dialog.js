export { createModal, openModal, closeModal, handleForm };
import { projects } from "./index";
import { noteCreator, saveNote } from "./noteCreator";

function createModal() {
  const existingModal = document.querySelector("dialog");
  if (existingModal) {
    existingModal.remove();
  }
  const modalDiv = document.createElement("dialog");
  modalDiv.classList = "modal";

  const h2Title = document.createElement("h2");
  h2Title.textContent = "Nova Tarefa";

  const dialogDiv = document.createElement("div");
  dialogDiv.classList = "dialog";

  const form = document.createElement("form");
  form.classList = "formdialog";
  form.setAttribute("action", "");
  form.setAttribute("method", "get");

  const inputTitle = document.createElement("input");
  inputTitle.setAttribute("name", "title");
  inputTitle.setAttribute("type", "text");
  inputTitle.setAttribute("placeholder", "Nome da Tarefa");

  const textDescription = document.createElement("textarea");
  textDescription.setAttribute("name", "description");
  textDescription.setAttribute("rows", "4");
  textDescription.setAttribute("cols", "30");
  textDescription.setAttribute("placeholder", "Descrição");

  const inputData = document.createElement("input");
  inputData.setAttribute("name", "data");
  inputData.setAttribute("type", "date");

  const checkDiv = document.createElement("div");
  checkDiv.classList = "checkbox";

  const projectLabel = document.createElement("label");
  projectLabel.textContent = "Qual Projeto?";

  const select = document.createElement("select");
  select.id = "project";

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

  projects.forEach((project) => {
    const option = document.createElement("option");
    option.value = project;
    option.textContent = project;
    select.appendChild(option);
  });

  // Montar estrutura do formulário
  form.appendChild(inputTitle);
  form.appendChild(textDescription);
  form.appendChild(inputData);
  checkDiv.appendChild(projectLabel);
  checkDiv.appendChild(select);
  form.appendChild(checkDiv);
  form.appendChild(buttonDiv);

  // Adicionar elementos ao modal

  modalDiv.appendChild(h2Title);
  dialogDiv.appendChild(form);
  modalDiv.appendChild(dialogDiv);

  // Adicionar modal ao body
  document.body.appendChild(modalDiv);

  form.addEventListener("submit", handleForm);
}

function openModal() {
  const modal = document.querySelector("dialog");
  const form = document.querySelector(".formdialog");

  modal.showModal();
}

function closeModal() {
  const closeDialog = document.querySelector(".cancelBtn");
  const modal = document.querySelector("dialog");

  closeDialog.addEventListener("click", (bt) => {
    bt.preventDefault();
    modal.close();
  });
}

function handleForm(event) {
  event.preventDefault();

  const form = event.target; // Get the form element
  const title = form.querySelector('input[name="title"]');
  const desc = form.querySelector('textarea[name="description"]');
  const data = form.querySelector('input[name="data"]');
  const project = form.querySelector("#project");

  const newNote = noteCreator(
    title.value,
    desc.value,
    data.value,
    project.value
  );

  saveNote(newNote);

  const modal = document.querySelector("dialog");
  modal.close();
}
