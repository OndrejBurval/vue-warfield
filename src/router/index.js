import { createWebHistory, createRouter } from "vue-router";
import Home from "../views/Home.vue"
import MapEditor from "../views/MapEditor.vue"
import Login from "../views/Login.vue"
import Register from "../views/Register.vue"

const routes = [
    {
        path: "/",
        name: "Home",
        component: Home
    },
    {
        path: "/map-editor",
        name: "MapEditor",
        component: MapEditor
    },
    {
        path: "/login",
        name: "Login",
        component: Login
    },
    {
        path: "/register",
        name: "Register",
        component: Register
    },
    {
        path: "/:catchAll(.*)",
        redirect: "/"
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router