import { Icons } from "../assets/assets.js";

export default function() {
    elements.addTask.src = Icons.addTask;
    elements.today.src = Icons.today;
    elements.upcoming.src = Icons.upcoming;
    elements.settings.src = Icons.settings;
    elements.filters.src = Icons.filters;
    elements.myTasks.src = Icons.myTasks;
}

const elements = (function() {
    const addTask = document.querySelector("#addtask");
    const today = document.querySelector("#today");
    const upcoming = document.querySelector('#upcoming');
    const settings = document.querySelector("#settings");
    const filters = document.querySelector("#filters");
    const myTasks = document.querySelector("#mytasks");

    return { addTask, today, upcoming, settings, filters, myTasks };
})();