import { Icons } from "../assets/index.js";
import { elements } from "./index.js";

export function loadIcons() {
    elements.icons.addTask.src = Icons.addTask;
    elements.icons.today.src = Icons.today;
    elements.icons.upcoming.src = Icons.upcoming;
    elements.icons.settings.src = Icons.settings;
    elements.icons.filters.src = Icons.filters;
    elements.icons.myTasks.src = Icons.myTasks;
};