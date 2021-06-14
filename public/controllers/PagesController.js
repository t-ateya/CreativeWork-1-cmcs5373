import {
    privateRoutes,
    guestRoutes,
    mainContentArea,
    commonRoutes,
    threadTemplate,
    loader,
} from "../elements.js";
import {
    appRoutes
} from "../routes.js";
import {
    ThreadsController
} from "./ThreadsController.js";

export const PagesController = () => {
    const setActivePage = (route) => {
        const path = `../pages/${route.page}.html`;
        fetch(path)
            .then((res) => {
                mainContentArea.innerHTML = "loading...";
                return res.text();
            })
            .then((pageContent) => {
                const parser = new DOMParser();
                const page = parser.parseFromString(pageContent, "text/html");
                mainContentArea.innerHTML = page.body.innerHTML;
                insertPageContent(route.page);
                history.pushState(null, null, route.name);
            })
            .catch((err) => console.log("error: ", err));
    };

    const RouteTo = (pageName) => {
        const page = appRoutes.find((route) => route.name === pageName);
        const activeRoute = page ? page : appRoutes[0];
        setActivePage(activeRoute);
    };

    const pageEventListeners = () => {
        // setup all routes in application
        [...privateRoutes, ...guestRoutes, ...commonRoutes].map((route) => {
            route.addEventListener("click", (e) => {
                e.preventDefault();
                // @ts-ignore
                const pathName = e.target.attributes.href ?
                    // @ts-ignore
                    e.target.attributes.href.value :
                    null;
                if (pathName) {
                    RouteTo(pathName);
                }
            });
        });
    };

    const homePageContent = async() => {
        // @ts-ignore
        const threadList = await ThreadsController().all();
        console.log('thread list: ', threadList);
        threadList.forEach((thread) => {
            // @ts-ignore
            const threadElement = threadTemplate.content.cloneNode(true);
            threadElement.querySelector('.thread__title').textContent = thread.title;
            threadElement.querySelector(".thread__content").textContent =
                thread.content;
            const tags = threadElement.querySelector(".thread__tags");
            tags.innerHTML += `<span class="mb-0">Keywords: </span>`;
            console.log(thread.keywordsArray);
            if (Array.isArray(thread.keywordsArray)) {
                thread.keywordsArray.forEach((keyword) => {
                    tags.innerHTML += `<span class="badge badge-primary mr-2">${keyword}</span>`;
                });
            } else {
                tags.innerHTML += `<span class="badge badge-light bg-white mr-2">${thread.keywordsArray}</span>`;
            }

            mainContentArea.appendChild(threadElement);
        });
    };

    const insertPageContent = async(pageName) => {
        loader.classList.remove('d-none');
        switch (pageName) {
            default: await homePageContent();
            loader.classList.add('d-none');
            break;
        }
    };

    return {
        pageEventListeners,
        RouteTo,
        setActivePage,
        insertPageContent
    };
};