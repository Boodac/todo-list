import { css, reset } from "./assets/index.js";
import { loadIcons } from "./display/index.js";
import { initClickHandlers, initNewTaskHandlers } from "./events/index.js";
import { loadStorage, loadSidebar } from "./data/index.js";

if(css && reset) {
    console.log("Load: success.");
}

loadIcons();
initClickHandlers();
initNewTaskHandlers();
loadStorage();
loadSidebar();