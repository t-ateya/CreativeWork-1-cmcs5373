// @ts-nocheck
export const menuBar = document.querySelector("#menu-bar");
export const privateRoutes = Array.from(
    menuBar.querySelectorAll(".private-route")
);
export const guestRoutes = Array.from(menuBar.querySelectorAll(".guest-route"));
export const commonRoutes = Array.from(
    menuBar.querySelectorAll(".common-route")
);
export const mainContentArea = document.querySelector("#main-content");
export const loader = document.querySelector("#loader");
// forms
export const loginForm = document.forms.signinForm;
export const signInModal = document.querySelector("#signin-modal");
export const formCloseBtn = loginForm.querySelector(".close");
export const signOutBtn = document.querySelector("#sign-out");

/* threads */
export const threadForm = document.querySelector("#thread-form");
export const threadFormErrors = threadForm.querySelector(".alert");

/* templates */
export const threadTemplate = document.querySelector("#thread-template");