import { createWebHistory, createRouter } from "vue-router";
import Home from "../views/Home.vue"
import MapEditor from "../views/MapEditor.vue"

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
        path: "/:catchAll(.*)",
        redirect: "/"
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router