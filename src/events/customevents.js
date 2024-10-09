export const newTaskEvent = (taskObject) => {
    const newMyTaskItem = new CustomEvent("newtask", {
        detail: taskObject
    })
    return newMyTaskItem;
};