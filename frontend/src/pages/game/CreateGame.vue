<script setup lang="ts">
import axios from 'axios';
import { useUserStore } from '../../stores/userStore';
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';



const userStore = useUserStore()
const route = useRouter()
console.log(userStore.user?.id);

const createGame = async () => {

    try {
        const res = await axios.post(`http://localhost:3000/tic-tac-toe/create/${userStore.user?.id}`)
        route.push(`/game/createGame/RobotGame/${res.data?.id}`)
        console.log(res.data);

    } catch (e: any) {
        throw new Error(e?.message)
    }


}

</script>

<template>
    <div class="py-20 bg-gradient-to-b   from-gray-800 via-gray-700 bg-gray-900">
        <div class="relative z-99 w-[50%] mx-auto  p-8 rounded-3xl overflow-hidden shadow-2xl text-center">
            <div
                class="absolute inset-0 bg-gradient-to-r from-gray-600 via-blue-900 to-red-950 animate-gradient-x opacity-80 -z-10">
            </div>
            <div class="relative bg-white/10 backdrop-blur-md rounded-3xl p-8 shadow-xl">
                <h2 class="text-3xl font-extrabold mb-4 text-white">Создать игру</h2>
                <p class="text-gray-200 mb-8">Выбери с кем хочешь поиграть</p>

                <div class="flex flex-col sm:flex-row gap-4 justify-center">

                    <button @click="createGame"
                        class="flex-1 cursor-pointer px-6 py-3 rounded-xl bg-indigo-500 hover:bg-indigo-600 active:scale-95 transition font-semibold shadow-lg text-white">
                        Играть с роботом
                    </button>
                    <RouterLink to="/game/createGame/currentGame">
                        <button
                            class="flex-1 px-6 py-3 cursor-pointer rounded-xl bg-transparent border border-indigo-400 hover:bg-indigo-500/30 active:scale-95 transition font-semibold text-white">

                            Играть с игроком
                        </button>
                    </RouterLink>
                </div>

                <p class="mt-6 text-sm text-gray-300">Не важно, кого выберешь — веселье гарантировано!</p>
            </div>
        </div>


    </div>
</template>

<style>
@keyframes gradient-x {

    0%,
    100% {
        background-position: 0% 50%;
    }

    50% {
        background-position: 100% 50%;
    }
}

.animate-gradient-x {
    background-size: 200% 200%;
    animation: gradient-x 6s ease infinite;
}
</style>
