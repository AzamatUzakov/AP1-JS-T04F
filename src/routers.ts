import { createRouter, createWebHistory } from "vue-router";
import Login from "./pages/authorization/Login.vue";
import Register from "./pages/authorization/Register.vue";
import CreateGame from "./pages/CreateGame.vue";
import CurrentGame from "./pages/GameHistory.vue";
import Games from "./pages/Games.vue";
import Home from "./pages/Home.vue";
import GameHistory from "./pages/GameHistory.vue";


const routes = [
    { path: "/", component: Home },
    { path: "/games", component: Games },
    { path: "/history", component: GameHistory },
    { path: "/game/createGame", component: CreateGame },
    { path: "/login", component: Login },
    { path: "/register", component: Register },
]

export const router = createRouter({
    history: createWebHistory(),
    routes
})