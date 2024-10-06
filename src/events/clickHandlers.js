import { elements } from "../display/index.js";

const EVENT_TYPE = "click";

export function initClickHandlers() {
    elements.buttons.addTask.addEventListener(EVENT_TYPE, (e) => {
        console.log(e);
    });
    elements.buttons.filters.addEventListener(EVENT_TYPE, (e) => {
        console.log(e);
    });
    elements.buttons.settings.addEventListener(EVENT_TYPE, (e) => {
        console.log(e);
    });
    elements.buttons.myTasks.addEventListener(EVENT_TYPE, (e) => {
        console.log(e);
    });
    elements.buttons.today.addEventListener(EVENT_TYPE, (e) => {
        console.log(e);
    });
    elements.buttons.upcoming.addEventListener(EVENT_TYPE, (e) => {
        console.log(e);
    });
};