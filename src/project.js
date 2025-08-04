import { displayTodas } from "./index";
import { displayNote } from "./noteCreator";
// Project Handler
export { displayProjects, projectCreator, saveProject };

function projectCreator(project) {
  return { project, status: "open" };
}
// Save Project to Local Storage
// and display it in the sidebar
// This function is called when the user clicks the "Create Project" button
function saveProject(project) {
  const projectLibrary =
    JSON.parse(localStorage.getItem("projectLibrary")) || [];
  projectLibrary.push(project);

  localStorage.setItem("projectLibrary", JSON.stringify(projectLibrary));
  displayProjects();
}

// Display Projects in the sidebar
// This function retrieves the projects from local storage
// and creates a list of projects in the sidebar
// Each project is clickable and will display its notes when clicked
function displayProjects() {
  const projectArray = localStorage.getItem("projectLibrary");
  const projectCard = document.querySelector(".sidebar-projects");
  const ulProject = document.querySelector(".ul-project");
  ulProject.innerHTML = "";

  if (projectArray) {
    let projectStored = JSON.parse(projectArray);

    projectStored.forEach((project, index) => {
      const li = document.createElement("li");
      li.className = `${project.project}`;

      li.addEventListener("click", (e) => {
        displayProjectNotes(e.target);
      });

      const i = document.createElement("i");
      i.className = "fa-solid fa-sm fa-hashtag";
      i.ariaHidden = "true";

      const text = document.createTextNode(`${project.project}`);

      li.appendChild(i);
      li.appendChild(text);

      ulProject.appendChild(li);
      projectCard.appendChild(ulProject);
    });
  }
}
// Display Notes for the selected project
// This function is called when a project is clicked in the sidebar
// It retrieves the project name from the clicked element and updates the display
function displayProjectNotes(target) {
  const projectName = target.className;
  localStorage.setItem("currentProject", projectName);

  const projectTitle = document.querySelector(".card-title");
  projectTitle.innerHTML = target.textContent;

  const tittleDiv = document.createElement("div");
  tittleDiv.className = "ProjectDiv";

  const trash = document.createElement("i");
  trash.className = "fas fa-trash fa-sm";
  trash.id = `${projectName}`;

  trash.addEventListener("click", (e) => {
    deleteProject(e.currentTarget);
  });

  projectTitle.append(tittleDiv, trash);

  displayNote();
}

function deleteProject(target) {
  const projectLibrary =
    JSON.parse(localStorage.getItem("projectLibrary")) || [];
  const noteLibrary = JSON.parse(localStorage.getItem("noteLibrary")) || [];

  const updateNotes = noteLibrary.filter(
    (notes) => notes.project !== target.id
  );

  localStorage.setItem("noteLibrary", JSON.stringify(updateNotes));
  displayNote();

  const updateLibrary = projectLibrary.filter(
    (project) => project.project !== target.id
  );

  localStorage.setItem("projectLibrary", JSON.stringify(updateLibrary));
  displayProjects();
  displayTodas();
}

// TODO:
// - Delete a Project with all notes as well
