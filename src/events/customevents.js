export const newTaskEvent = (htmlElement) => {
    const newTaskEvent = new CustomEvent("newtask", {
        detail: htmlElement
    })
    return newTaskEvent;
};