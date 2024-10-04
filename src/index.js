import { css, reset } from "./assets/assets.js";
import loadIcons from "./modules/iconHandlers.js";
import * as test from "./tests/testbuildtask.js";

if(css && reset) {
    console.log("Load: success.");
}

loadIcons();