import {
    guestRoutes,
    privateRoutes,
    signInModal
} from "../elements.js";
import {
    AuthController
} from "./AuthController.js";

export const MenubarController = () => {
    const {
        currentUser
    } = AuthController();
    const showMenus = () => {
        if (currentUser) {
            privateRoutes.forEach(route => route.classList.remove('d-none'));
            guestRoutes.forEach(route => route.classList.add('d-none'));
        } else {
            privateRoutes.forEach(route => route.classList.add('d-none'));
            guestRoutes.forEach(route => route.classList.remove('d-none'));
        }
    }

    const closeModal = () => {
        // @ts-ignore
        $(signInModal).modal('hide');
    }

    return {
        showMenus,
        closeModal
    }
}