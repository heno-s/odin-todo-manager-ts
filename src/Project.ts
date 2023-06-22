import { uid } from "./utils";
import Task from "./Task";
export default class Project {
    id: string = uid();
    tasks: Task[] = [];
    addTask(task: Task): void {}
    deleteTask(id: string): boolean {
        return false;
    }
    getTask(id: string): Task | null {
        return null;
    }
}
