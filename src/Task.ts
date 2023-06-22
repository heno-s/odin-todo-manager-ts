import { uid } from "./utils";
export default class Task {
    id: string = uid();
    title: string;
    description: string;
    dueDate: Date;
    priority: number;
    isChecked: boolean = false;
    constructor(
        title: string,
        dueDate: Date,
        priority: number,
        description: string = ""
    ) {
        this.title = title;
        this.dueDate = dueDate;
        this.priority = priority;
        this.description = description;
    }
}
