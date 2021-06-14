import {
    loginForm,
    signOutBtn
} from "../elements.js";
import {
    MenubarController
} from "./MenubarController.js";
import {
    PagesController
} from "./PagesController.js";

let currentUser;
export const AuthController = () => {
    /**
     * @param {string} email - email
     * @param {string} pwd - password
     */
    const signIn = async(email, pwd) => {
        try {
            // @ts-ignore
            await firebase.auth().signInWithEmailAndPassword(email, pwd);
        } catch (error) {
            console.error(error.message);
            return error.message;
        }
    };

    const signOut = async() => {
        try {
            // @ts-ignore
            await firebase.auth().signOut();
        } catch (error) {
            console.error(error.message);
        }
    };

    const handleAuthEvents = () => {
        // handle authentication
        loginForm.addEventListener('submit', async(event) => {
            event.preventDefault();
            const email = loginForm.elements.email.value;
            const password = loginForm.elements.password.value;
            const feedback = await signIn(email, password);
            console.log('feedback', feedback);
            MenubarController().closeModal();
        });

        signOutBtn && signOutBtn.addEventListener('click', async() => {
            await signOut();
            PagesController().RouteTo('/');
        })


        // handle change of auth state
        // @ts-ignore
        firebase.auth().onAuthStateChanged(user => {
            user ? currentUser = user : currentUser = null;
            MenubarController().showMenus();
        });
    }

    return {
        handleAuthEvents,
        currentUser
    };
};