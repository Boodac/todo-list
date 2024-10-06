export const icons = (function() {
    const addTask = document.querySelector("#addtaskIcon");
    const today = document.querySelector("#todayIcon");
    const upcoming = document.querySelector('#upcomingIcon');
    const settings = document.querySelector("#settingsIcon");
    const filters = document.querySelector("#filtersIcon");
    const myTasks = document.querySelector("#mytasksIcon");

    return { addTask, today, upcoming, settings, filters, myTasks };
})();

export const buttons = (function() {
    const addTask = document.querySelector("#addtask");
    const today = document.querySelector("#today");
    const upcoming = document.querySelector('#upcoming');
    const settings = document.querySelector("#settings");
    const filters = document.querySelector("#filters");
    const myTasks = document.querySelector("#mytasks");

    return { addTask, today, upcoming, settings, filters, myTasks };
})();

export const elements = { icons, buttons };