import { createRouter, createWebHistory } from "vue-router";
import Login from "./pages/authorization/Login.vue";
import Register from "./pages/authorization/Register.vue";
import CreateGame from "./pages/game/CreateGame.vue";
import Games from "./pages/game/Games.vue";
import Home from "./pages/Home.vue";
import GameHistory from "./pages/GameHistory.vue";
import CurrentGame from "./pages/game/CurrentGame.vue";
import RobotGame from "./pages/game/RobotGame.vue";
import { useUserStore } from "./stores/userStore";


const routes = [
    { path: "/", component: Home },
    { path: "/games", component: Games, meta: { requiresAuth: true } },
    { path: "/history", component: GameHistory, meta: { requiresAuth: true } },
    { path: "/game/createGame", component: CreateGame, meta: { requiresAuth: true } },
    { path: "/game/createGame/currentGame/:id", component: CurrentGame, meta: { requiresAuth: true } },
    { path: "/game/createGame/RobotGame/:id", component: RobotGame, meta: { requiresAuth: true } },

    { path: "/login", component: Login, meta: { guestOnly: true } },
    { path: "/register", component: Register, meta: { guestOnly: true } },
]

export const router = createRouter({
    history: createWebHistory(),
    routes
})


router.beforeEach((to, from, next) => {
    const userStore = useUserStore()
    const isAuth = !!userStore.user

    //Нужна авторизация, но пользователь НЕ вошёл
    if (to.meta.requiresAuth && !isAuth) {
        return next('/login');
    }

    //Страница только для гостей, а пользователь УЖЕ залогинен
    if (to.meta.guestOnly && isAuth) {
        return next('/');
    }

    next();


})