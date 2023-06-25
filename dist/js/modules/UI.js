export default class UI {
    static createProject(project) {
        const projectContainer = document.createElement("li");
        projectContainer.classList.add("project");
        projectContainer.innerHTML = `
        <div class="project-marker"></div>
        <span class="project-name">${project.name}</span>
        <div class="project-delete">
            <span class="trash-icon">O</span>
        </div>
        `;
        return projectContainer;
    }
    static setActiveProject(id) {
        removeActive();
        setActive();
        function setActive() {
            var _a;
            (_a = document.getElementById(id)) === null || _a === void 0 ? void 0 : _a.classList.add("active");
        }
        function removeActive() {
            const activeProject = document.querySelector(".project.active");
            if (activeProject !== null) {
                activeProject.classList.remove("active");
            }
        }
    }
}
