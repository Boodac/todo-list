import { localStorage, taskCollection, buildTask, configurations } from "./index.js";

/*
on load move data from localStorage into taskCollection

when new data is added from DOM, load data into taskcollection and localstorage simultaneously

when a task is updated, update localstorage and pull localstorage into taskcollection (forces a rebuild on next get).

when a request is made, filter the taskCollection and yield an iterable list of taskObjects; requests can be filtered by tag, duedate, etc

verify the status of a taskObject */

export function loadStorage() {
    const storage = JSON.parse(JSON.stringify(localStorage));
    configurations.forEach(value => {
        delete storage[value[0]];
    });
    for(const property in storage) {
        taskCollection.add(storage[property]);
    };
};