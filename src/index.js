import { css, reset } from "./assets/index.js";
import { loadIcons } from "./display/index.js";
import { initClickHandlers } from "./events/index.js";
import { loadStorage, loadMyTaskSidebar } from "./data/index.js";

if(css && reset) {
    console.log("Load: success.");
}

loadIcons();
initClickHandlers();
loadStorage();
loadMyTaskSidebar();