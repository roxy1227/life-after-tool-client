import { lazy } from 'react'

interface Route {
    path: string
    component: React.FC
    children?: Route[]
}

const Home = lazy(() => import('@/pages/home'))

const routes: Route[] = [
    {
        path: '/',
        component: Home
    }
]

export default routes
