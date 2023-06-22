import { uid } from "./utils";
import Task from "./Task";
export default class Project {
    id: string = uid();
    tasks: Task[] = [];
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
