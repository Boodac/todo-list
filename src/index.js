import { css, reset } from "./assets/assets.js";
import loadIcons from "./modules/iconHandlers.js";

if(css && reset) {
    console.log("Load: success.");
}

loadIcons();