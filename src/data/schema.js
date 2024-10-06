const schema = {
    title: "",
    description: "",
    notes: "",
    frequency: "once",
    priority: "normal",
    dueDate: "any",
    children: [],
    parents: [],
    status: "incomplete",
    refID: false,
    autodelete: true,
};

export default Object.freeze(structuredClone(schema));