import Project from "./Project.js";

export default class UI {
    static createProject(project: Project): HTMLLIElement {
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

    static setActiveProject(id: string): void {
        removeActive();
        setActive();

        function setActive(): void {
            const project = document.getElementById(id);
            project?.classList.add("active");
        }
        function removeActive(): void {
            const activeProject =
                document.querySelector(".project.active");
            if (activeProject !== null) {
                activeProject.classList.remove("active");
            }
        }
    }
}
