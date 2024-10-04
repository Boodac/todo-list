import schema from "./schema.js";

export function conformTaskToSchema (taskObject) {
    let clone = {};
    for(const parameter in schema) {
        if(parameter === "refID") continue;
        if(taskObject[parameter]) clone[parameter] = taskObject[parameter];
        else clone[parameter] = schema[parameter];
    }
    return clone;
}