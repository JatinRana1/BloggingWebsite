import { lazy } from "react"
import ErrorPage from "../pages/error/ErrorPage"
const Login = lazy(()=> import("../pages/authentication/Login"));
const Home = lazy(()=> import("../pages/dashboard/Home"));

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