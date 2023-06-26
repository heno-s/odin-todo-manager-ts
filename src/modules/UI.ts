import Project from "./Project.js";
import Task from "./Task.js";

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

    static createTask({
        id,
        title,
        priority,
        dueDate,
        description,
        isChecked,
    }: Task): HTMLDivElement {
        const taskContainer = document.createElement("div");
        taskContainer.id = id;
        taskContainer.classList.add("task");
        const priorities = ["low", "medium", "high"];
        taskContainer.innerHTML = `<input
        class="priority-checkbox${" " + priorities[priority]}"
        type="checkbox"
        ${isChecked ? "checked" : ""}
    />
    <div class="task-body">
        <span class="task-name"
            >${title}</span
        >
        ${
            description &&
            `<p class="task-description">
        ${description}
    </p>`
        }

            <div class="task-due-date">
        <div class="task-calendar"><i
        class="fa-regular fa-calendar"
    ></i></div>
        <span class="task-date"
            >${Intl.DateTimeFormat("en-US", {
                dateStyle: "short",
            }).format(dueDate)}</span
        >
    </div>
        
    </div>
    <div class="task-delete">
        <span class="task-trash-icon"
            ><i class="far fa-trash-can"></i
        ></span>
    </div>`;

        return taskContainer;
    }
}
