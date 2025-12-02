<script setup lang="ts">
import NoWorkResult_ from "postcss/lib/no-work-result";
import { ref, computed } from "vue"

type Line = [number, number, number];
type Player = 'X' | 'O' | null;
type Squares = Player[];

const player = ref<Player>("X")
const board = ref<Player[][]>([
    [null, null, null],
    [null, null, null],
    [null, null, null],

])
const calculateWinner = (squares: Player[]): Player => { //функция для определения победителя
    const lines: Line[] = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c]: Line = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}

const winner = computed(() => calculateWinner(board.value.flat()))//передаем значение  доски
const MakeMove = (x: number, y: number) => { //Функция для вставки X O
    if (winner.value) return
    if (board.value[x]?.[y] !== null) return

    board.value[x][y] = player.value
    player.value = player.value === "X" ? "O" : "X"
}

const ResetGame = () => {//Функция для сброса игры
    board.value = [
        [null, null, null],
        [null, null, null],
        [null, null, null],
    ]
    player.value = "X"
}

</script>


<template>
    <div
        class="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-gray-700 via-gray-800 to-gray-900 text-white p-6">
        <h1 class="text-4xl md:text-5xl font-extrabold mb-6 drop-shadow-lg">Tic-Tac-Toe</h1>

        <h3 class="text-2xl mb-6 font-semibold flex items-center gap-3">Ход игрока <span class="text-blue-500 text-4xl">{{
                player }}</span></h3>

        <div class="flex flex-col gap-4 items-center mb-6 bg-black/50 p-6 rounded-xl shadow-2xl">
            <div v-for="(row, x) in board" :key="x" class="flex gap-4">
                <div v-for="(cell, y) in row" :key="y" @click="MakeMove(x, y)"
                    class="w-24 h-24 md:w-28 md:h-28 bg-white/10 hover:bg-white/20 transition-colors duration-300 flex items-center justify-center text-5xl md:text-6xl font-bold cursor-pointer rounded-lg shadow-inner">
                    {{ cell === "X" ? "❌" : cell === "O" ? "⭕" : "" }}
                </div>
            </div>
        </div>

        <h2 v-if="winner" class="text-3xl md:text-4xl font-bold text-green-400 mb-4 drop-shadow-lg">
            Игрок {{ winner }} выиграл!
        </h2>

        <button @click="ResetGame"
            class=" cursor-pointer mt-4 px-6 py-3 bg-yellow-400 text-black font-semibold rounded-xl hover:bg-yellow-500 transition-colors duration-300 shadow-lg">
            Сбросить игру
        </button>
    </div>
</template>