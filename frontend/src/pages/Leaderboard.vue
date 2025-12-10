<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useUserStore } from '../stores/userStore';
import axios from 'axios';
export interface User {
    id: string;
    name: string;
    email: string;
    password: string;
    createdAt: string;
    updatedAt: string;
}

let users = ref<User[]>([])

onMounted(async () => {

    let res = await axios.get("http://localhost:3000/leaderboard")
    users.value = res.data


})




</script>
<template>
    <div class="max-w-7xl mx-auto p-6">
        <h1 class="text-4xl font-bold mb-10 text-gray-800 text-center">Рейтинг пользователей</h1>

        <!-- 1 место -->
        <div v-if="users.length" class="flex justify-center mb-10 relative">
            <div
                class="w-72 h-72 bg-gradient-to-b from-yellow-200 to-yellow-400 rounded-2xl shadow-xl flex flex-col items-center justify-center p-6 relative transform hover:scale-105 transition-transform duration-300">
                <img :src="'https://i.pravatar.cc/100?img=' + Math.floor(Math.random() * 70)" alt="Лого пользователя"
                    class="w-28 h-28 rounded-full object-cover border-4 border-white mb-4">
                <h2 class="font-bold text-3xl text-gray-900">{{ users[0]?.name }}</h2>
                <p class="text-gray-700 text-lg mt-2">Рейтинг: {{ Math.floor(Math.random() * 1000) }}</p>
                <div class="absolute -top-5 text-4xl">👑</div>
            </div>
        </div>

        <!-- 2 и 3 места -->
        <div class="flex justify-center gap-8 mb-10">
            <div v-for="(user, index) in users.slice(1, 3)" :key="user.id"
                class="w-60 h-60 bg-gradient-to-b from-gray-200 to-gray-100 rounded-2xl shadow-lg flex flex-col items-center justify-center p-4 relative transform hover:scale-105 transition-transform duration-300">
                <img :src="'https://i.pravatar.cc/100?img=' + Math.floor(Math.random() * 70)" alt="Лого пользователя"
                    class="w-24 h-24 rounded-full object-cover border-2 border-white mb-3">
                <h2 class="font-semibold text-2xl text-gray-900 text-center">{{ user.name }}</h2>
                <p class="text-gray-600 text-lg mt-1">Рейтинг: {{ Math.floor(Math.random() * 1000) }}</p>
                <div class="absolute -top-3 text-3xl">
                    {{ index + 2 }}️⃣
                </div>
            </div>
        </div>

        <!-- Остальные пользователи -->
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            <div v-for="user in users.slice(3)" :key="user.id"
                class="bg-white rounded-2xl shadow-md flex flex-col items-center p-4 hover:shadow-xl transition-shadow duration-300">
                <img :src="'https://i.pravatar.cc/100?img=' + Math.floor(Math.random() * 70)" alt="Лого пользователя"
                    class="w-20 h-20 rounded-full object-cover mb-3 border-2 border-gray-200">
                <h2 class="font-semibold text-xl text-gray-800 text-center">{{ user.name }}</h2>
                <p class="text-gray-500 mt-1">Рейтинг: {{ Math.floor(Math.random() * 1000) }}</p>
            </div>
        </div>
    </div>
</template>
