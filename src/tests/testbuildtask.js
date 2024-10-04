import buildTask from "../modules/buildtask.js";

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