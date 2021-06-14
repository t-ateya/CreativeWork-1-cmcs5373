import {
    collections
} from "../constants.js";
import {
    threadForm,
    threadFormErrors
} from "../elements.js";
import {
    Thread
} from "../models/thread.js";
import {
    createUUID
} from "../utils.js";
import {
    AuthController
} from "./AuthController.js";
import {
    PagesController
} from "./PagesController.js";

export const ThreadsController = () => {
    const all = async() => {
        let threads = [];
        // @ts-ignore
        const snapShot = await firebase.firestore()
            .collection(collections.THREADS)
            .orderBy("timestamp")
            .get();

        snapShot.forEach((doc) => {
            const thread = new Thread(doc.data());
            // @ts-ignore
            thread.id = doc.id;
            threads.push(thread);
        });
        return threads;
    };

    const saveThread = async(thread) => {
        try {
            // @ts-ignore
            const ref = await firebase.firestore()
                .collection(collections.THREADS)
                .add(thread);
            console.log('new thread added');

            //reload page
            PagesController().insertPageContent('/');
        } catch (error) {
            console.log('error: ', error);
        }
    };

    const validate = (thread) => {
        let errors = [];
        if (thread.title.trim().length < 10) {
            errors.push("Title must be at least 8 chars long");
        }
        if (thread.content.trim().length < 10) {
            errors.push("Content must be at least 8 chars long");
        }
        if (thread.title.trim().length < 3) {
            errors.push("Title must be at least 3 chars long");
        }

        return errors.length ? errors : null;
    };
    const threadEventListeners = () => {
        threadForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const data = {
                // @ts-ignore
                title: threadForm.title.value,
                // @ts-ignore
                content: threadForm.content.value,
                // @ts-ignore
                keywords: threadForm.keywords.value,
            };

            let errors = validate(data);
            if (errors) {
                errors.forEach((error) => {
                    threadFormErrors.innerHTML += `<p class="mb-0">${error}</p>`;
                });
                threadFormErrors.classList.remove("d-none");
            } else {
                threadFormErrors.classList.add("d-none");
                const threadData = {
                    uid: createUUID(),
                    title: data.title,
                    content: data.content,
                    keywordsArray: data.keywords.trim().split(" "),
                    timestamp: new Date(),
                    email: AuthController().currentUser.email
                }

                const serializedThread = new Thread(threadData).serialize();
                ThreadsController().saveThread(serializedThread);
            }
        });
    };

    return {
        threadEventListeners,
        all,
        saveThread,
    };
};