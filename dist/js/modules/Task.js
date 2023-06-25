import { uid } from "../utils.js";
export default class Task {
    constructor(title, dueDate, priority, description = "", isChecked = false) {
        this.id = uid();
        this.description = "";
        this.title = title;
        this.dueDate = dueDate;
        this.priority = priority;
        this.description = description;
        this.isChecked = isChecked;
    }
}
