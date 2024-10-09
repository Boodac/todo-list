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
    const addTask = document.querySelector("#addtaskBtn");
    const today = document.querySelector("#todayBtn");
    const upcoming = document.querySelector('#upcomingBtn');
    const settings = document.querySelector("#settingsBtn");
    const filters = document.querySelector("#filtersBtn");
    const myTasks = document.querySelector("#mytasksBtn");

    const addTaskSubmit = document.querySelector("#add-task-submit");
    const assignDueDate = document.querySelector("#assign-due-date");

    return { 
        addTask, today, upcoming, settings, filters, myTasks, 
        addTaskSubmit, assignDueDate
    };
})();

export const modals = (function () {
    const addTaskForm = document.querySelector("#add-task-form");
    const dueDateBox = document.querySelector("#dueDateBox");
    return { addTaskForm, dueDateBox };
})();

export const forms = (function () {
    const addTask = (function() {
        const title = document.querySelector("#add-task-title");
        const description = document.querySelector("#add-task-description");
        const priority = document.querySelector("#add-task-priority");
        const frequency = document.querySelector("#add-task-frequency");
        const assignDueDate = document.querySelector("#assign-due-date");
        const dueDate = document.querySelector("#add-task-dueDate");
        const autodelete = document.querySelector("#add-task-autodelete");
        const notes = document.querySelector("#add-task-notes");
        const parents = document.querySelector("#add-task-parents");
        
        function reset() {
            title.value = "";
            title.classList.remove("required");
            description.value = "";
            priority.value = "normal";
            frequency.value = "once";
            assignDueDate.checked = false;
            dueDate.value = "";
            autodelete.checked = true;
            notes.value = "";
            for(const children of parents) {
                if(children.dataset.id === "myTasks") children.selected = true;
                else children.selected = false;
            }
        }
        return { title, description, priority, frequency, assignDueDate, dueDate, autodelete, notes, parents, reset };        
    })();

    return { addTask };
})();

function isVisible(element) {
    if(element.style.display === "none") return false;
    else return true;
}

export const elements = { icons, buttons, modals, forms, isVisible };