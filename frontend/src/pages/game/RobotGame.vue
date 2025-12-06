<script setup lang="ts">
import NoWorkResult_ from "postcss/lib/no-work-result";
import { ref, computed, onMounted } from "vue"
import { RouterLink, useRoute } from "vue-router";
import { router } from "../../routers";
import axios from "axios";

type Line = [number, number, number];
type Player = 'X' | 'O' | null;
type Squares = Player[];

let route = useRoute()
let gameId = route.params.id
const status = ref<string>('playing');

const board = ref<Player[][]>([
    [null, null, null],
    [null, null, null],
    [null, null, null],

])

// Преобразуем строку с сервера в board 3x3
const parseBoard = (boardStr: string) => {
    const arr: Player[] = boardStr.split('').map(c => c === '-' ? null : c as Player);
    board.value = [
        arr.slice(0, 3),
        arr.slice(3, 6),
        arr.slice(6, 9)
    ];
};
const makeMove = async (x: number, y: number) => {
    if (!gameId || !board.value?.[x] || board.value[x][y] !== null || status.value !== 'playing') return;

    const index = x * 3 + y;


    try {
        const res = await axios.post(`http://localhost:3000/tic-tac-toe/move/${gameId}`, { index });
        parseBoard(res.data.board);
        status.value = res.data.status;
        // меняем ход на игрока, но сервер уже ставит X/O
    } catch (e: any) {
        alert(e?.response?.data?.message || e.message);
    }
};

const player = ref<Player>("X")




</script>


<template>
    <div
        class="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-gray-700 via-gray-800 to-gray-900 text-white p-6">
        <h1 class="text-4xl md:text-5xl font-extrabold mb-6 drop-shadow-lg">Tic-Tac-Toe</h1>

        <h3 class="text-2xl mb-6 font-semibold flex items-center gap-3" v-if="status === 'playing'">Ход игрока <span
                class=" text-blue-500 text-4xl">{{
                    player }}</span></h3>

        <div class="flex flex-col gap-4 items-center mb-6 bg-black/50 p-6 rounded-xl shadow-2xl">
            <div v-for="(row, x) in board" :key="x" class="flex gap-4">
                <div v-for="(cell, y) in row" :key="y" @click="makeMove(x, y)"
                    class="w-24 h-24 md:w-28 md:h-28 bg-white/10 hover:bg-white/20 transition-colors duration-300 flex items-center justify-center text-5xl md:text-6xl font-bold cursor-pointer rounded-lg shadow-inner">
                    {{ cell === "X" ? "❌" : cell === "O" ? "⭕" : "" }}
                </div>
            </div>
        </div>

        <h2 v-if="status !== 'playing'" class="text-3xl md:text-4xl font-bold text-green-400 mb-4 drop-shadow-lg">
            {{ status === 'won' ? 'Вы выиграли!' : status === 'lost' ? 'Робот выиграл!' : 'Ничья!' }}
        </h2>

        <RouterLink to="/game/CreateGame">
            <button
                class=" cursor-pointer mt-4 px-6 py-3 bg-yellow-400 text-black font-semibold rounded-xl hover:bg-yellow-500 transition-colors duration-300 shadow-lg">
                Сбросить игру
            </button>
        </RouterLink>
    </div>
</template>