import { taskCollection, localStorage } from "./index.js";

function createTaskEditor() {
    let targetID;
    let targetJSON;
    let parsedJSON;

    const set = (refID) => {
        targetID = refID;
        targetJSON = localStorage.getItem(refID);
        parsedJSON = JSON.parse(targetJSON);
    };

    const push = () => {
        targetJSON = JSON.stringify(parsedJSON);
        localStorage.removeItem(targetID);
        localStorage.setItem(targetID, targetJSON);
        taskCollection.verify(targetID);
    };

    const edit = (field, value) => {
        parsedJSON[field] = value;
    };

    return { set, push, edit, parsedJSON };
};

export function editTask(refID, field, value = null) {
    const editor = createTaskEditor();
    editor.set(refID);
    let work = editor.parsedJSON;

    switch(field) {
        case "title":
        case "description":
        case "notes":
        case "frequency":
        case "priority":
        case "dueDate":
        case "autodelete":
            editor.edit(field, value);
            editor.push();
            break;
        case "tags":
            if(work.tags.splice(work.tags.indexOf(value),1).length === 0) work.tags.push(value);
            editor.push();
            break;
        case "parent":
            if(work.parents.splice(work.parents.indexOf(value),1).length === 0) work.parents.push(value);
            break;
        case "child":
            if(work.children.splice(work.children.indexOf(value),1).length === 0) work.children.push(value);
            break;
        case "status":
            console.log(value);
            break;
        default:
    };
}