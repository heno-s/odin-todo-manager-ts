import { uid } from "../utils.js";
export default class Project {
    constructor(name) {
        this.id = uid();
        this.tasks = [];
        this.name = name;
    }
    addTask(task) {
        this.tasks.push(task);
    }
    getTask(id) {
        return this.tasks.find((task) => task.id === id) || null;
    }
    deleteTask(id) {
        const taskIndex = this.tasks.findIndex((task) => task.id === id);
        if (taskIndex !== -1) {
            this.tasks.splice(taskIndex, 1);
            return true;
        }
        else {
            return false;
        }
    }
}
