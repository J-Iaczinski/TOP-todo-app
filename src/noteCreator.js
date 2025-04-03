export { noteCreator, saveNote, displayNote };

function noteCreator(title, description, dueDate, project) {
  return { title, description, dueDate, project };
}

function saveNote(note) {
  const noteLibrary = JSON.parse(localStorage.getItem("noteLibrary")) || [];
  noteLibrary.push(note);

  // Save using the correct key
  localStorage.setItem("noteLibrary", JSON.stringify(noteLibrary));

  // Retrieve using the same key
  let newObj = localStorage.getItem("noteLibrary");

  // Check if newObj is not null before parsing
  console.log(JSON.parse(newObj));
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

  // Clear all existing cards inside the wrapper
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

      const title = document.createElement("div");
      title.classList.add("title");
      title.textContent = note.title;

      const desc = document.createElement("div");
      desc.classList.add("desc");
      desc.textContent = note.description;

      const dueDate = document.createElement("div");
      dueDate.classList.add("endDate");
      dueDate.textContent = note.dueDate;

      const divider = document.createElement("div");
      divider.classList.add("divider");

      cardMain.append(title, desc, dueDate, divider);
      cardDiv.appendChild(cardMain);
      cardWrapper.appendChild(cardDiv);
    });
  }
}
