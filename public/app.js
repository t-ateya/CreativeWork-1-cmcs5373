import {
    AuthController
} from "./controllers/AuthController.js";
import {
    PagesController
} from "./controllers/PagesController.js";
import {ThreadsController} from "./controllers/ThreadsController.js";
import {
    Router
} from "./routes.js";

document.addEventListener("DOMContentLoaded", () => {
    Router().init();
});

Router().historyEventListeners();
PagesController().pageEventListeners();
AuthController().handleAuthEvents();
ThreadsController().threadEventListeners();
