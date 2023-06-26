import ProjectList from "./ProjectList.js";
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
    static deleteProject(id) {
        const project = document.getElementById(id);
        if (project === null) {
            return false;
        }
        else {
            project.remove();
            return true;
        }
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
    static createTask({ id, title, priority, dueDate, description, isChecked, }) {
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
        ${description &&
            `<p class="task-description">
        ${description}
    </p>`}

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
    static deleteTask(id) {
        const task = document.getElementById(id);
        if (task === null) {
            return false;
        }
        else {
            task.remove();
            return true;
        }
    }
    static createAddTaskForm() {
        const form = document.createElement("form");
        form.classList.add("add-task-form");
        form.innerHTML = `
        <input
            type="text"
            placeholder="title"
            name="title"
            class="title"
        />
        <textarea
            placeholder="description"
            name="description"
            class="description"
            rows="2"
        ></textarea>
        <div>
            <select class="priority" name="priority">
                <option value="0">low</option>
                <option value="1">medium</option>
                <option value="2">high</option>
            </select>
            <input
                type="date"
                name="due-date"
                class="due-date"
            />
        </div>
        <button class="save-button">save</button>
`;
        return form;
    }
    static deleteAddTaskForm() {
        const form = document.querySelector('.add-task-form:not([method="dialog"])');
        if (form === null) {
            return false;
        }
        else {
            form.remove();
            return true;
        }
    }
    static createUpdateTaskDialogForm({ title, description, priority, dueDate, }) {
        console.log(title);
        const dialog = document.createElement("dialog");
        const priorities = ["low", "medium", "high"];
        dialog.innerHTML = `<form method="dialog" class="add-task-form">
        <div class="close-dialog"></div>
        <input
            type="text"
            placeholder="title"
            name="title"
            class="title"
            value="${title}"
        />
        <textarea
            placeholder="description"
            name="description"
            class="description"
        >${description ? description : ""}</textarea>
        <div>
            <select class="priority" name="priority">
                ${priorities
            .map((value, index) => `<option value="${index}" ${index === priority ? "selected" : ""}>${value}</option>`)
            .join("")}
            </select>
            <input
                type="date"
                name="due-date"
                class="due-date"
            />
        </div>
        <button class="save-button">save</button>
    </form>`;
        const datePicker = dialog.querySelector("input[type=date]");
        datePicker.valueAsDate = dueDate;
        return dialog;
    }
    static deleteUpdateTaskDialog() {
        const dialog = document.querySelector("dialog:has(.add-task-form)");
        if (dialog === null) {
            return false;
        }
        else {
            dialog.remove();
            return true;
        }
    }
    static renderProjects(projects) {
        const projectsDOM = document.querySelector(".projects");
        projects.forEach((project) => {
            const projectDOM = UI.createProject(project);
            projectsDOM.appendChild(projectDOM);
            if (ProjectList.activeProject.id === project.id) {
                UI.setActiveProject(project.id);
            }
        });
    }
    static renderTasks(project) {
        const taskDOM = document.querySelector(".tasks");
        project.tasks.forEach((task) => taskDOM.appendChild(UI.createTask(task)));
    }
}
