const schema = {
    title: "",
    description: "",
    notes: "",
    frequency: "once",
    priority: "normal",
    due: "any",
    children: [],
    parent: [],
    status: "incomplete",
    refID: false,
    autodelete: true,
};

export default function buildTask(obj = structuredClone(schema)) {
    if(obj!==schema) {
        const clone = {};
        for(const parameter in schema) {
            if(obj[parameter] === undefined) clone[parameter] = schema[parameter];
            else clone[parameter] = obj[parameter];
        }
        obj = clone;
    };
    if(obj.refID === false) obj.refID = Math.random();

    const factory = {
        task: structuredClone(obj),
        
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
            return Object.freeze(this.task);
        },
    }

    return factory;
}