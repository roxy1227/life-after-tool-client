import { lazy } from "react";

interface Route {
    path: string;
    component: React.LazyExoticComponent<React.ComponentType<any>>;
    children?: Route[];
}

const Home = lazy(() => import('@/pages/home'))

const routes: Route[] = [
    {
        path: '/',
        component: Home,
    }
]

export default routes;
