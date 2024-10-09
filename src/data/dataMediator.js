import { localStorage, taskCollection, buildTask, configurations } from "./index.js";
import { elements } from "../display/elements.js";
import { newTaskEvent } from "../events/customevents.js";

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
    if(newTask.parents.indexOf("myTasks") !== -1) elements.myTasks.list.dispatchEvent(newTaskEvent(elements.myTasks.createListItem(newTask)));
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
        const listItem = elements.myTasks.createListItem(taskCollection.get(myTasks[i]));
        elements.myTasks.list.dispatchEvent(newTaskEvent(listItem));
    };
};