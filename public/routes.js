import {
    PagesController
} from "./controllers/PagesController.js";


export const appRoutes = [{
        name: '/404',
        page: '404'
    },
    {
        name: '/',
        page: 'home'
    },
    {
        name: '/about',
        page: 'about'
    },
    {
        name: '/threads',
        page: 'threads'
    }
];

export const Router = () => {
    const {
        setActivePage,
        RouteTo
    } = PagesController();
    const init = async() => {
        const pathName = window.location.pathname;
        const activeRoute = appRoutes.find(route => route.name === pathName);
        if (activeRoute) {
            setActivePage(activeRoute)
        } else {
            const defaultRoute = appRoutes[0];
            setActivePage(defaultRoute)
        }
    }

    const historyEventListeners = () => {
        window.addEventListener('popstate', (e) => {
            // @ts-ignore
            const pathName = e.target.location.pathname;
            RouteTo(pathName);
        })
    }

    return {
        init,
        historyEventListeners
    }
}
