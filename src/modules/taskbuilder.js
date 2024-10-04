const schema = {
    title: "",
    description: "",
    notes: "",
    frequency: "",
    priority: "",
    due: "",
    children: [],
    parent: [],
    status: "",
    refID: false,
    autodelete: true
};

export default function buildTask(obj = schema) {
    let task = structuredClone(obj);
    
    const factory = {
        check() { // does ref ID exist?
            if(!task.refID) this.instantiate();
        },
        instantiate() { // create ref ID
            task.refID = crypto.uuid();
        },
        result() {
            let result = task;
            task = schema;
            return result;
        },
        setTitle(title) {
            this.check();
            task.title = title;
        },
        setDescription(description) {
            this.check();
            task.title = description;
        },
        setNotes(notes) {
            this.check();
            task.notes = notes;
        },
        setFrequency(frequency) {
            this.check();
            task.frequency = frequency;
        },
        setPriority(priority) {
            this.check();
            task.priority = priority;
        },
        setDueDate(dueDate) {
            this.check();
            task.dueDate = dueDate;
        },
        setChildren(children) {
            this.check();
            task.children = [...children];
        },
        setParents(parents) {
            this.check();
            task.parents = [...parents];
        },
        setStatus(obj) {
            this.check();
            task.status = obj.status;
        },
        setAutoDelete(bool) {
            bool ? task.autodelete = true : task.autodelete = false;
        },
        toggleAutoDelete() {
            task.autodelete ? task.autodelete = false : task.autodelete = true;
        }
    }

    return factory;
}