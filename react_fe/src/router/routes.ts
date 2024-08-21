import { Login } from "../pages/authentication/Login"
import { Home } from "../pages/dashboard/Home"
import ErrorPage from "../pages/error/ErrorPage"

interface RouteConfig {
    path: string,
    element: React.ElementType,
    isProtected: boolean
}

export const routes: RouteConfig[] = [
    {path: '/', element: Home, isProtected: true},
    {path: '/home', element: Home, isProtected: true},
    {path: '/login', element: Login, isProtected: false},
    {path: '*', element: ErrorPage, isProtected: false}
]