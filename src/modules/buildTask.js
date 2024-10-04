import { v4 as UUID } from "uuid";
import schema from "./schema.js";
import {conformTaskToSchema} from "./conformTask.js";

// converts an object into a frozen Task object that includes a convert() method to parse itself back into JSON.
// will gracefully accept any JSON or JS object.
// do not use this to edit tasks! use the changetask module instead.
 
export default function (obj = schema) {
    let taskStructure = {};
    let assignNewID = false;

    if(typeof obj === "string") {
        taskStructure = JSON.parse(obj);
    }
    else {
        taskStructure = conformTaskToSchema(obj);
        assignNewID = true;
    };
    
    const refID = UUID();

    const factory = {
        task: structuredClone(taskStructure),
        
        setTitle(value) {
            this.task.title = value;
            return this;
        },
        setDescription(value) {
            this.task.description = value;
            return this;
        },
        setNotes(value) {
            this.task.notes = value;
            return this;
        },
        setFrequency(value) {
            this.task.frequency = value;
            return this;
        },
        setPriority(value) {
            this.task.priority = value;
            return this;
        },
        setDueDate(value) {
            this.task.dueDate = value;
            return this;
        },
        setChildren(value) {
            this.task.children = value;
            return this;
        },
        setParents(value) {
            this.task.parents = value;
            return this;
        },
        setStatus(value) {
            this.task.status = value;
            return this;
        },
        setAutoDelete(value) {
            this.task.autodelete = value;
            return this;
        },
        result() {
            if(assignNewID) {
                Object.defineProperty(this.task, "refID", {
                    value: refID,
                    enumerable: true,
                    configurable: false,
                    writable: false
                });
            };
            Object.defineProperty(this.task, "convertToJSON", {
                value: function() {
                    return JSON.stringify(this);
                },
                enumerable: false,
                configurable: false,
                writable: false
            });
            return Object.freeze(this.task);
        },
    }

    return factory;
};