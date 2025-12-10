<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useUserStore } from '../stores/userStore';
import axios from 'axios';

export interface Games {
    id: string;
    playerX: string;
    playerO: string | null;
    board: string;
    current: 'X' | 'O' | null;
    status: 'waiting' | 'playing' | 'finished';
    winner: 'X' | 'O' | null;
    createdAt: string;
    updatedAt: string;
}

const allGmes = ref<Games[]>([]);

onMounted(async () => {
    try {
        const res = await axios.get("http://localhost:3000/complited-games");
        allGmes.value = res.data;
    } catch (e: any) {
        console.error(e);
    }
});
</script>

<template>
    <div class="max-w-5xl mx-auto p-6 grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <div v-for="(game, index) in allGmes" :key="game.id"
            class="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-shadow duration-300">
            <h2 class="text-xl font-semibold mb-2 text-gray-800">Игра {{ index + 1 }}</h2>
            <p class="text-gray-600"><span class="font-medium">Статус:</span> <span :class="{
                'text-yellow-500': game.status === 'waiting',
                'text-blue-500': game.status === 'playing',
                'text-green-500': game.status === 'finished'
            }">{{ game.status }}</span></p>
            <p class="text-gray-600"><span class="font-medium">Выиграл:</span> <span class="text-red-600 font-bold">{{
                game.winner || '—' }}</span></p>
            <p class="text-gray-500 text-sm mt-2">Создано: {{ new Date(game.createdAt).toLocaleString() }}</p>
        </div>
    </div>
</template>
