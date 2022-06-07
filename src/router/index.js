import { createWebHistory, createRouter } from "vue-router";
import { auth } from "../firebase/firebase.js";
import Home from "../views/Home.vue"
import MapEditor from "../views/MapEditor.vue"
import Login from "../views/Login.vue"
import Register from "../views/Register.vue"

const routes = [
    {
        path: "/",
        name: "Home",
        component: Home,
        meta: {
            requireAuth: true
        }
    },
    {
        path: "/map-editor",
        name: "MapEditor",
        component: MapEditor,
        meta: {
            requireAuth: true
        }
    },
    {
        path: "/login",
        name: "Login",
        component: Login
    },
    {
        path: "/register",
        name: "Register",
        component: Register,
        meta: {
            requireAuth: true
        }
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


router.beforeEach((to, from, next) => {
    if (to.matched.some((record) => record.meta.requireAuth)) {
        if (auth.currentUser){
            next();
        } else{
            next("/login");
        }
    } else {
        next();
    }
})

export default router