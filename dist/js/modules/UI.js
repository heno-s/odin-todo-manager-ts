export default class UI {
    static createProject(project) {
        const projectContainer = document.createElement("li");
        projectContainer.id = project.id;
        projectContainer.classList.add("project");
        projectContainer.innerHTML = `
        <div class="project-marker"></div>
        <span class="project-name">${project.name}</span>
        <div class="project-delete">
            <span class="trash-icon"><i class="far fa-trash-can"></i
            ></span>
        </div>
        `;
        return projectContainer;
    }
    static setActiveProject(id) {
        removeActive();
        setActive();
        function setActive() {
            const project = document.getElementById(id);
            project === null || project === void 0 ? void 0 : project.classList.add("active");
        }
        function removeActive() {
            const activeProject = document.querySelector(".project.active");
            if (activeProject !== null) {
                activeProject.classList.remove("active");
            }
        }
    }
}
