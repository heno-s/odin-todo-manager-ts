import Project from "./Project.js";
import ProjectList from "./ProjectList.js";
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

    static deleteProject(id: string): boolean {
        const project = document.getElementById(id);
        if (project === null) {
            return false;
        } else {
            project.remove();
            return true;
        }
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
            >${Intl.DateTimeFormat(navigator.language, {
                dateStyle: "medium",
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

    static deleteTask(id: string): boolean {
        const task = document.getElementById(id);
        if (task === null) {
            return false;
        } else {
            task.remove();
            return true;
        }
    }

    static createAddTaskForm(): HTMLFormElement {
        const form = document.createElement("form");
        form.classList.add("add-task-form");
        form.innerHTML = `
        <input
            type="text"
            placeholder="title"
            name="title"
            class="title"
            required
        />
        <textarea
            placeholder="description"
            name="description"
            class="description"
            rows="2"
        ></textarea>
        <div>
            <select class="priority" name="priority"
            required>
                <option value="0">low</option>
                <option value="1">medium</option>
                <option value="2">high</option>
            </select>
            <input
                type="date"
                name="due-date"
                class="due-date"
                required
            />
        </div>
        <button class="save-button">save</button>
`;

        return form;
    }

    static deleteAddTaskForm(): boolean {
        const form = document.querySelector(
            '.add-task-form:not([method="dialog"])'
        );
        if (form === null) {
            return false;
        } else {
            form.remove();
            return true;
        }
    }

    static createUpdateTaskDialogForm({
        id,
        title,
        description,
        priority,
        dueDate,
    }: Task): HTMLDialogElement {
        console.log(title);
        const dialog = document.createElement("dialog");

        const priorities = ["low", "medium", "high"];
        dialog.innerHTML = `<form method="dialog" class="add-task-form">
        <input
            type="hidden"
            name="taskId"
            value="${id}"
        />
        <div class="close-dialog"></div>
        <input
            type="text"
            placeholder="title"
            name="taskTitle"
            class="title"
            value="${title}"
            required
        />
        <textarea
            placeholder="description"
            name="description"
            class="description"
        >${description ? description : ""}</textarea>
        <div>
            <select class="priority" name="priority"
            required>
                ${priorities
                    .map(
                        (value, index) =>
                            `<option value="${index}" ${
                                index === priority ? "selected" : ""
                            }>${value}</option>`
                    )
                    .join("")}
            </select>
            <input
                type="date"
                name="due-date"
                class="due-date"
                required
            />
        </div>
        <button class="save-button">save</button>
    </form>`;

        const datePicker = dialog.querySelector(
            "input[type=date]"
        ) as HTMLInputElement;
        datePicker.valueAsDate = new Date(dueDate);

        return dialog;
    }

    static deleteUpdateTaskDialog(): boolean {
        const dialog = document.querySelector(
            "dialog:has(.add-task-form)"
        );

        if (dialog === null) {
            return false;
        } else {
            dialog.remove();
            return true;
        }
    }

    static renderProjects(projects: Project[]): void {
        const projectsDOM = document.querySelector(
            ".projects"
        ) as HTMLUListElement;
        projects.forEach((project) => {
            const projectDOM = UI.createProject(project);
            projectsDOM.appendChild(projectDOM);
            if (ProjectList.activeProject.id === project.id) {
                UI.setActiveProject(project.id);
            }
        });
    }

    static deleteProjects(): void {
        const projects = document.querySelector(
            ".projects"
        ) as HTMLUListElement;
        projects.innerHTML = "";
    }

    static renderTasks(project: Project): void {
        const tasksDOM = document.querySelector(
            ".tasks"
        ) as HTMLDivElement;
        project.tasks.forEach((task) => {
            const taskDOM = UI.createTask(task);
            if (task.isChecked) {
                const checkbox = taskDOM.querySelector(
                    'input[type="checkbox"]'
                ) as HTMLInputElement;
                checkbox.setAttribute("checked", "");
            }
            tasksDOM.appendChild(UI.createTask(task));
        });
    }

    static deleteTasks(): void {
        const tasks = document.querySelector(
            ".tasks"
        ) as HTMLDivElement;
        tasks.innerHTML = "";
    }

    static createAddProjectForm(): HTMLFormElement {
        const form = document.createElement("form");
        form.classList.add("add-project-form");
        form.innerHTML = `
<input
    type="text"
    placeholder="project name"
    name="projectName"
    required
/>
<button>Add</button>
`;

        return form;
    }

    static deleteAddProjectForm(): boolean {
        const form = document.querySelector(".add-project-form");
        if (form === null) {
            return false;
        } else {
            form.remove();
            return true;
        }
    }
}
