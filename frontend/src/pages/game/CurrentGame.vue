<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue";
import { useRoute } from "vue-router";
import { useUserStore } from "../../stores/userStore";
import { io, Socket } from "socket.io-client";

const route = useRoute();
const userStore = useUserStore();

const gameId = route.params.id as string;
const userId = userStore.user?.id;


type Player = "X" | "O" | null;

const board = ref<Player[]>(Array(9).fill(null));
const currentSymbol = ref<Player>("X");
const mySymbol = ref<Player>(null);
const winner = ref<Player | null>(null);
const status = ref<string>("waiting");

// SOCKET
let socket: Socket;

onMounted(() => {
    socket = io("http://localhost:3000", { transports: ["websocket"] });

    // joining room
    socket.emit("joinGame", { gameId, playerId: userId });

    // server updates
    socket.on("gameUpdated", (game: any) => {

        board.value = JSON.parse(game.board);
        currentSymbol.value = game.current;
        winner.value = game.winner;
        status.value = game.status;

        // Determine my symbol ("X" or "O")
        if (game.playerX === userId) {
            mySymbol.value = "X";
        } else if (game.playerO === userId) {
            mySymbol.value = "O";
        }

        console.log("Обновление игры:", {
            board: board.value,
            current: currentSymbol.value,
            mySymbol: mySymbol.value,
            status: status.value
        });
    });
});

onBeforeUnmount(() => {
    socket.disconnect();
});

//
const MakeMove = (x: number, y: number) => {
    if (!userId) return;

    // нельзя ходить после конца игры
    if (winner.value || status.value !== "playing") return;

    // мой ли это ход?
    if (currentSymbol.value !== mySymbol.value) return;

    const position = x * 3 + y;

    // занята ли клетка
    if (board.value[position] !== null) return;

    socket.emit("makeMove", {
        gameId,
        player: mySymbol.value,   // тправляем X или O
        position
    });
};

const resetGame = () => {
    socket.emit("resetGame", { gameId });
};
</script>

<template>
    <div
        class="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-gray-700 via-gray-800 to-gray-900 text-white p-6">

        <h1 class="text-4xl md:text-5xl font-extrabold mb-6 drop-shadow-lg">
            Tic-Tac-Toe Multiplayer
        </h1>

        <h3 class="text-2xl mb-6 font-semibold flex items-center gap-3">
            <span v-if="!winner">Ход: </span>
            <span v-else>Игра окончена!</span>

            <span class="text-blue-400 text-4xl">{{ winner ? winner : currentSymbol }}</span>
        </h3>

        <!-- BOARD -->
        <div class="flex flex-col gap-4 items-center mb-6 bg-black/50 p-6 rounded-xl shadow-2xl">
            <div v-for="x in 3" :key="x" class="flex gap-4">
                <div v-for="y in 3" :key="y" @click="MakeMove(x - 1, y - 1)"
                    class="w-24 h-24 md:w-28 md:h-28 bg-white/10 hover:bg-white/20 transition-colors duration-300
                           flex items-center justify-center text-5xl md:text-6xl font-bold cursor-pointer rounded-lg shadow-inner">

                    <!-- Иконки -->
                    {{
                        board[(x - 1) * 3 + (y - 1)] === "X" ? "❌" :
                            board[(x - 1) * 3 + (y - 1)] === "O" ? "⭕" : ""
                    }}
                </div>
            </div>
        </div>

        <!-- WINNER -->
        <h2 v-if="winner" class="text-3xl md:text-4xl font-bold text-green-400 mb-4 drop-shadow-lg">
            Победил игрок {{ winner }} !
        </h2>

        <!-- RESET BUTTON -->
        <button @click="resetGame"
            class="cursor-pointer mt-4 px-6 py-3 bg-yellow-400 text-black font-semibold rounded-xl hover:bg-yellow-500 transition-colors duration-300 shadow-lg">
            Сбросить игру
        </button>
    </div>
</template>
