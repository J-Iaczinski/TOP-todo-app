// Project Handler
export { projectCreator, displayProjects, saveProject };

function projectCreator(project) {
  return { project, status: "open" };
}

function saveProject(project) {
  const projectLibrary =
    JSON.parse(localStorage.getItem("projectLibrary")) || [];
  projectLibrary.push(project);

  localStorage.setItem("projectLibrary", JSON.stringify(projectLibrary));
  displayProjects();
}

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
