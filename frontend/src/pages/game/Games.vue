<script setup lang="ts">
import axios from "axios";
import { onMounted, ref, watch } from "vue";
import { useUserStore } from "../../stores/userStore";
import { useRouter } from "vue-router";

interface Game {
    id: string;
    playerX: string;
    playerO: string;
    status: string;
    createdAt: string;
}

const allGames = ref<Game[]>([]);
const loading = ref(true);
const error = ref<string | null>(null);
const userStore = useUserStore()
const router = useRouter()

onMounted(async () => {
    try {
        const res = await axios.get("http://localhost:3000/tictoctoe-online/allGames");
        allGames.value = res.data;
    } catch (e: any) {
        error.value = e?.message || "Ошибка загрузки игр";
        console.error(e);
    } finally {
        loading.value = false;
    }
});

watch(allGames, (val) => {
    console.log("Игры загружены:", val);
});


const joinGame = async (gameId: string) => {

    try {
        let res = await axios.post(`http://localhost:3000/tictoctoe-online/join`, { gameId: gameId, playerId: userStore.user?.id })
          router.push(`game/createGame/CurrentGame/${res.data?.id}`)
        console.log(res.data);


    } catch (e: any) {
        throw new Error(e)
    }

}

</script>
<template>
    <div class="p-6 max-w-4xl mx-auto">
        <h1 class="text-3xl font-bold mb-6 text-gray-800">Список игр</h1>

        <div class="space-y-6">
            <div v-for="(game, index) in allGames" :key="game.id"
                class="bg-white shadow-lg rounded-2xl p-6 border border-gray-200 hover:shadow-xl transition duration-300 w-full">
                <h2 class="text-xl font-semibold mb-4 text-gray-700">
                    Игра №{{ index + 1 }}
                </h2>

                <p v-if="game.status !== 'playing'" class="text-green-600 font-medium mb-3">
                    Свободно можно играть
                </p>

              <!--   <button v-if="game.status !== 'waiting'"
                    class="bg-red-600 cursor-pointer text-white px-4 py-2 rounded-xl hover:bg-red-700 transition w-full font-medium mb-3">
                    Игра началось
                </button> -->

                <button  @click="joinGame(game.id)"
                    class="bg-blue-600 cursor-pointer text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition w-full font-medium mb-3">
                    Присоединиться
                </button>

                <p class="text-gray-600 mb-1">
                    <span class="font-semibold">Статус:</span> {{ game.status }}
                </p>

                <p class="text-gray-500 text-sm">Заходи и наслаждайся 🎮</p>
            </div>
        </div>
    </div>
</template>
