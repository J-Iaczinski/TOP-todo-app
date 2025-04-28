import { closeModal, openModal } from "./dialog";

export { noteCreator, saveNote, displayNote };

function noteCreator(title, description, dueDate, project) {
  return { title, description, dueDate, project, status: "open" };
}

function saveNote(note) {
  const noteLibrary = JSON.parse(localStorage.getItem("noteLibrary")) || [];
  noteLibrary.push(note);

  // Save using the correct key
  localStorage.setItem("noteLibrary", JSON.stringify(noteLibrary));

  // display new note (with the old ones)
  displayNote();
}

function displayNote() {
  const noteStored = localStorage.getItem("noteLibrary");
  const cardCont = document.querySelector(".card-containers");
  const newCard = document.querySelector(".newCard");

  // Find or create the wrapper div inside cardCont
  let cardWrapper = document.querySelector(".card-wrapper");
  if (!cardWrapper) {
    cardWrapper = document.createElement("div");
    cardWrapper.classList.add("card-wrapper");
    cardCont.insertBefore(cardWrapper, newCard);
  }

  // ✅ Clear all existing cards inside the wrapper BEFORE adding new ones
  cardWrapper.innerHTML = "";

  if (noteStored) {
    let noteArray = JSON.parse(noteStored);

    noteArray.forEach((note, index) => {
      const cardDiv = document.createElement("div");
      cardDiv.className = `card check-${index}`;

      // Radio Button Divs
      const radioDiv = document.createElement("div");
      radioDiv.classList.add("radioBtn");

      const checkboxContainer = document.createElement("div");
      checkboxContainer.classList.add("checkbox-container");

      const inputCheck = document.createElement("input");
      inputCheck.id = `check-${index}`;
      inputCheck.type = "checkbox";

      const labelCheck = document.createElement("label");
      labelCheck.setAttribute("for", `check-${index}`);

      checkboxContainer.append(inputCheck, labelCheck);
      radioDiv.appendChild(checkboxContainer);
      cardDiv.appendChild(radioDiv);

      // Main Contents of The Note
      const cardMain = document.createElement("div");
      cardMain.classList.add("card-main");

      const editCard = document.createElement("div");
      editCard.classList = "editcard";

      const editbtn = document.createElement("i");
      editbtn.className = "fas fa-edit fa-sm";
      editbtn.id = `check-${index}`;

      // ✅ Avoid duplicate event listeners
      editbtn.addEventListener("click", (e) => {
        editNote(e.target);
      });

      const trash = document.createElement("i");
      trash.className = "fas fa-trash fa-sm";
      trash.id = `check-${index}`;

      const noteBtns = document.createElement("div");
      noteBtns.className = "notebtn";
      noteBtns.appendChild(editbtn);
      noteBtns.appendChild(trash);

      trash.addEventListener("click", (e) => {
        deleteNote(e.target);
      });
      const title = document.createElement("div");
      title.classList.add("title");
      title.textContent = note.title;

      editCard.appendChild(title);
      editCard.appendChild(noteBtns);

      const desc = document.createElement("div");
      desc.classList.add("desc");
      desc.textContent = note.description;

      const dueDate = document.createElement("div");
      dueDate.classList.add("endDate");
      dueDate.textContent = note.dueDate;

      const divider = document.createElement("div");
      divider.classList.add("divider");

      cardMain.append(editCard, desc, dueDate);
      cardDiv.appendChild(cardMain);
      cardWrapper.appendChild(cardDiv);
      cardWrapper.appendChild(divider);
    });
  }
}

function editNote(target) {
  const index = parseInt(target.id.split("-")[1]);
  const noteLibrary = JSON.parse(localStorage.getItem("noteLibrary")) || [];

  // Get the correct note by index
  const note = noteLibrary[index];

  openModal();
  //Add event listener to the close button
  closeModal();

  //Pre fill the inputs
  const modal = document.querySelector("dialog");
  modal.querySelector('input[name="title"]').value = note.title;
  modal.querySelector('textarea[name="description"]').value = note.description;
  modal.querySelector('input[name="data"]').value = note.dueDate;
  modal.querySelector("#project").value = note.project;

  const confirmBtn = modal.querySelector(".confirmBtn");
  confirmBtn.textContent = "Save Changes";

  // ✅ Remove old event listeners to prevent duplication
  confirmBtn.replaceWith(confirmBtn.cloneNode(true));
  const newConfirmBtn = modal.querySelector(".confirmBtn");

  newConfirmBtn.addEventListener("click", (event) => {
    event.preventDefault();

    noteLibrary[index].title = modal.querySelector('input[name="title"]').value;
    noteLibrary[index].description = modal.querySelector(
      'textarea[name="description"]'
    ).value;
    noteLibrary[index].dueDate =
      modal.querySelector('input[name="data"]').value;
    noteLibrary[index].project = modal.querySelector("#project").value;

    localStorage.setItem("noteLibrary", JSON.stringify(noteLibrary));

    modal.close();

    displayNote();
  });
}

function deleteNote(target) {
  const index = parseInt(target.id.split("-")[1]); //Index of the To-do Clicked

  let noteLibrary = JSON.parse(localStorage.getItem("noteLibrary"));

  noteLibrary.splice(index, 1);

  localStorage.setItem("noteLibrary", JSON.stringify(noteLibrary));

  displayNote();
}
