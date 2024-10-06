import schema from "./index.js";

export default function(taskObject) {
    let clone = {};
    for(const parameter in schema) {
        if(parameter === "refID") continue;
        if(taskObject[parameter]) clone[parameter] = taskObject[parameter];
        else clone[parameter] = schema[parameter];
    }
    return clone;
}