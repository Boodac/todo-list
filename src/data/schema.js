export const schema = {
    title: "",
    description: "",
    notes: "",
    frequency: "once",
    priority: "normal",
    dueDate: "any",
    children: [],
    parents: [],
    tags: [],
    status: "to do",
    refID: false,
    autodelete: true,
    type: "task"
};

export function conformTaskToSchema(taskObject) {
    let clone = {};
    for(const parameter in schema) {
        if(taskObject[parameter]) clone[parameter] = taskObject[parameter];
        else clone[parameter] = schema[parameter];
    }
    return clone;
}