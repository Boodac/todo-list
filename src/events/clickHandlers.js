import { addNewTask } from "../data/index.js";
import { elements, toggleDisplay } from "../display/index.js";

export function initClickHandlers() {
    const EVENT_TYPE = "click";
    elements.buttons.addTask.addEventListener(EVENT_TYPE, (e) => {
        toggleDisplay(elements.modals.addTaskForm, "grid");
        if(elements.isVisible(elements.modals.addTaskForm)) elements.forms.addTask.title.focus();
        else elements.forms.addTask.reset();
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
    elements.buttons.addTaskSubmit.addEventListener(EVENT_TYPE, (event) => {
        event.preventDefault();
        if(!elements.forms.addTask.title.value.trim()) {
            elements.forms.addTask.title.classList.add("required");
            elements.modals.addTaskForm.classList.add("required");
            return;
        } else {
            elements.forms.addTask.title.classList.remove("required");
            elements.modals.addTaskForm.classList.remove("required");
        }
        captureAddTaskForm();
    });
    elements.buttons.assignDueDate.addEventListener(EVENT_TYPE, (e) => {
        toggleDisplay(elements.modals.dueDateBox, "block");
    })
};

function captureAddTaskForm() {
    const newTask = {parents:[]};
    const captured = elements.forms.addTask;

    for(const input in captured) {
        if(captured[input].nodeName === "INPUT") {
            if(captured[input].type === "text") {
                if(captured[input].value) newTask[captured[input].name] = captured[input].value;
            } 
            else if(captured[input].type === "datetime-local") {
                if(newTask.applyDueDate) newTask[captured[input].name] = captured[input].value;
            }
            else {
                if(captured[input].value) newTask[captured[input].name] = captured[input].checked;
            } 
        };

        if(captured[input].nodeName === "SELECT") {
            switch(captured[input].type) {
                case "select-one":
                    newTask[captured[input].name] = captured[input].value;
                    break;
                case "select-multiple":
                    for(const option of captured[input].children) {
                        if(option.selected) newTask.parents.push(option.dataset.id);
                    }
                    break;
            }
        };

        if(captured[input].nodeName === "TEXTAREA") {
            if(captured[input].value) newTask[captured[input].name] = captured[input].value;
        };
    }

    captured.reset();
    toggleDisplay(elements.modals.addTaskForm, "grid");

    addNewTask(newTask);
};