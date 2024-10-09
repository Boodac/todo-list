import { v4 as UUID } from "uuid";
import { schema } from "./index.js";
import { conformTaskToSchema } from "./index.js";

// instantiates a frozen Task object that includes a convert() method to parse itself back into JSON.
// will gracefully accept any JSON or JS object as a template and conform it to the schema.
// do not use this to edit tasks! use the changetask module instead.
 
export default function (obj = schema) {
    let taskStructure = {};

    if(typeof obj === "string") {
        taskStructure = JSON.parse(obj);
    } else {
        taskStructure = conformTaskToSchema(obj);
    };
    
    const refID = UUID();

    const factory = {
        taskObject: structuredClone(taskStructure),
        
        setTitle(value) {
            this.taskObject.title = value;
            return this;
        },
        setDescription(value) {
            this.taskObject.description = value;
            return this;
        },
        setNotes(value) {
            this.taskObject.notes = value;
            return this;
        },
        setFrequency(value) {
            this.taskObject.frequency = value;
            return this;
        },
        setPriority(value) {
            this.taskObject.priority = value;
            return this;
        },
        setDueDate(value) {
            this.taskObject.dueDate = value;
            return this;
        },
        setChildren(value) {
            this.taskObject.children = value;
            return this;
        },
        setParents(value) {
            this.taskObject.parents = value;
            return this;
        },
        setStatus(value) {
            this.taskObject.status = value;
            return this;
        },
        setAutoDelete(value) {
            this.taskObject.autodelete = value;
            return this;
        },
        result() {
            if(!this.taskObject.refID) {
                Object.defineProperty(this.taskObject, "refID", {
                    value: refID,
                    enumerable: true,
                    configurable: false,
                    writable: false
                });
            };
            Object.defineProperty(this.taskObject, "convertToJSON", {
                value: function() {
                    return JSON.stringify(this);
                },
                enumerable: false,
                configurable: false,
                writable: false
            });
            return Object.seal(this.taskObject);
        },
    }

    return factory;
};