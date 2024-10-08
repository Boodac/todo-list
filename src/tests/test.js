/*

import {loadStorage} from "../data/dataMediator.js";
import { taskCollection } from "../data/index.js";

loadStorage();

console.log(localStorage);

console.log(taskCollection);

/*

import { buildTask, taskCollection } from "../data/index.js";

const newTask = buildTask().result();
const task2 = buildTask(newTask).result();
const task3 = buildTask(newTask).result();
const task4 = buildTask(newTask).result();

console.log(newTask);

const JSONtask = newTask.convertToJSON();

console.log(JSONtask);

taskCollection.add(JSONtask);
taskCollection.add(task2);
taskCollection.add(task3);
taskCollection.add(task4);


console.log(taskCollection.get("myTasks"));


/*

{ localStorage }

export default console.log(localStorage);

*/

/*

{ buildTask }

const task = buildTask().setTitle("friends!").result();

const jsonfromtask = task.convertToJSON();

const rebuiltTask = buildTask(jsonfromtask).result();

const clonedTask = buildTask(task).result();

console.log("Original; ID: " + task.refID);
console.log(jsonfromtask);
console.log("Rebuilt from JSON; ID: ");
console.log(rebuiltTask.refID);
console.log("Built from existing task; ID: ");
console.log(clonedTask.refID); 

*/