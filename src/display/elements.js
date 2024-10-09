import { taskCollection } from "../data";

const icons = (function() {
    const addTask = document.querySelector("#addtaskIcon");
    const today = document.querySelector("#todayIcon");
    const upcoming = document.querySelector('#upcomingIcon');
    const settings = document.querySelector("#settingsIcon");
    const filters = document.querySelector("#filtersIcon");
    const myTasks = document.querySelector("#mytasksIcon");

    return { addTask, today, upcoming, settings, filters, myTasks };
})();

const buttons = (function() {
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

const modals = (function () {
    const addTaskForm = document.querySelector("#add-task-form");
    const dueDateBox = document.querySelector("#dueDateBox");
    return { addTaskForm, dueDateBox };
})();

const forms = (function () {
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
        
        const updateParentOptions = () => {
            parents.textContent = "";
            const myTaskOption = document.createElement("option");
            myTaskOption.value = "myTasks";
            myTaskOption.dataset.id = "myTasks";
            myTaskOption.textContent = "myTasks";
            myTaskOption.selected = true;
            parents.appendChild(myTaskOption);

            const myTasks = taskCollection.get("myTasks");
            console.log(myTasks);
            myTasks.forEach(refID => {
                let task = taskCollection.get(refID);
                const option = document.createElement("option");
                option.value = task.title;
                option.dataset.id = refID;
                option.textContent = task.title;
                parents.appendChild(option);
            });
        }
        
        function reset() {
            elements.modals.addTaskForm.classList.remove("required");
            title.value = "";
            title.classList.remove("required");
            description.value = "";
            priority.value = "normal";
            frequency.value = "once";
            assignDueDate.checked = false;
            dueDate.value = "";
            autodelete.checked = true;
            notes.value = "";
            for(const child of parents) {
                if(child.dataset.id === "myTasks") child.selected = true;
                else child.selected = false;
            };
        };

        return { title, description, priority, frequency, assignDueDate, dueDate, autodelete, notes, parents, reset, updateParentOptions };        
    })();

    return { addTask };
})();

const myTasks = (function() {
    const list = document.querySelector("#myTasks");
    const container = document.querySelector("#myTaskContainer");

    function createListItem(item) {
        let listItem = document.createElement("li");
        listItem.classList.add("myTask-item");
        
        let itemName = document.createElement("p");
        itemName.classList.add("item-name");
        itemName.textContent = item.title;
        
        let itemType = document.createElement("p");
        itemType.classList.add("item-type");
        itemType.textContent = item.type;

        listItem.appendChild(itemName);
        listItem.appendChild(itemType);
        return listItem;
    };

    return { list, container, createListItem };
})();

function isVisible(element) {
    if(element.style.display === "none") return false;
    else return true;
}

export const elements = { icons, buttons, modals, forms, isVisible, myTasks };