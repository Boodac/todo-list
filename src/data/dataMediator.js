import { localStorage, taskCollection, buildTask, configurations } from "./index.js";
import { elements } from "../display/elements.js";

/*
on load move data from localStorage into taskCollection

when new data is added from DOM, load data into taskcollection and localstorage simultaneously

when a task is updated, update localstorage and pull localstorage into taskcollection (forces a rebuild on next get).

when a request is made, filter the taskCollection and yield an iterable list of taskObjects; requests can be filtered by tag, duedate, etc

verify the status of a taskObject */

export function addNewTask(newTaskObject) {
    const newTask = buildTask(newTaskObject).result();
    localStorage.setItem(newTask.refID, newTask.convertToJSON());
    taskCollection.add(newTask);
};

export function loadStorage() {
    const storage = JSON.parse(JSON.stringify(localStorage));
    configurations.forEach(value => {
        delete storage[value[0]];
    });
    for(const property in storage) {
        taskCollection.add(storage[property]);
    };
};

export function loadMyTaskSidebar() {
    const myTasks = taskCollection.get("myTasks");
    for(let i = 0 ; i < myTasks.length ; i++) {
        let item = taskCollection.get(myTasks[i]);
        console.log(item);

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
        elements.myTasks.add(listItem);
    };
};