import { uid } from "../utils.js";
import Task from "./Task.js";
export default class Project {
    name: string;
    id: string = uid();
    tasks: Task[] = [];
    constructor(name: string) {
        this.name = name;
    }
    addTask(task: Task): void {
        this.tasks.push(task);
    }
    getTask(id: string): Task | null {
        return this.tasks.find((task) => task.id === id) || null;
    }
    deleteTask(id: string): boolean {
        const taskIndex = this.tasks.findIndex(
            (task) => task.id === id
        );
        if (taskIndex !== -1) {
            this.tasks.splice(taskIndex, 1);
            return true;
        } else {
            return false;
        }
    }
}
