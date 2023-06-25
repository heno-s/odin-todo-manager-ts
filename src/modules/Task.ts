import { uid } from "../utils.js";
export default class Task {
    id: string = uid();
    title: string;
    description: string = "";
    dueDate: Date;
    priority: number;
    isChecked: boolean;
    constructor(
        title: string,
        dueDate: Date,
        priority: number,
        description: string = "",
        isChecked: boolean = false
    ) {
        this.title = title;
        this.dueDate = dueDate;
        this.priority = priority;
        this.description = description;
        this.isChecked = isChecked;
    }
}
