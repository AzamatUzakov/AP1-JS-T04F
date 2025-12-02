<script setup lang="ts">
import { RouterLink } from 'vue-router';


</script>

<template>

    <div class="bg-gradient-to-b w-[100%]  from-gray-900 via-gray-800 to-black text-white">

        <!-- HERO SECTION -->
        <section class="flex flex-col items-center py-[100px] justify-center text-center px-6 relative">

            <!-- Background decoration -->
            <div
                class="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1350&q=80')] bg-cover bg-center opacity-20">
            </div>
            <div class="absolute inset-0 bg-gradient-to-b from-black/60 to-black/90"></div>

            <div class="relative z-10 max-w-3xl">
                <h1 class="text-4xl sm:text-6xl font-extrabold leading-tight mb-6">
                    Добро пожаловать в <span class="text-indigo-400">X-0</span>
                </h1>

                <p class="text-lg sm:text-xl text-gray-300 mb-8">
                    Простая, но увлекательная мини-игра, созданная для быстрого отдыха.
                    Нажми кнопку ниже и начни матч за несколько секунд!
                </p>


                <RouterLink to="/game/createGame"> <button
                        class="cursor-pointer px-10 py-4 bg-indigo-600 hover:bg-indigo-700 text-lg font-bold rounded-2xl shadow-lg transition active:scale-95">
                        Начать игру
                    </button>
                </RouterLink>
                <p class="mt-4 text-sm text-gray-400">Никакой регистрации — сразу в бой.</p>
            </div>
        </section>

        <!-- FEATURES -->
        <section class="py-20 px-6 bg-gradient-to-br from-black to-gray-900">
            <div class="max-w-5xl mx-auto">
                <h2 class="text-center text-3xl sm:text-4xl font-bold mb-12">
                    Почему X-0 — это круто?
                </h2>

                <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">

                    <div class="p-6 bg-white/5 rounded-2xl shadow hover:shadow-xl transition">
                        <h3 class="text-xl font-semibold mb-2">⚡ Быстрые матчи</h3>
                        <p class="text-gray-300 text-sm">
                            Запускай игру в один клик и играй прямо в браузере, без загрузок и установок.
                        </p>
                    </div>

                    <div class="p-6 bg-white/5 rounded-2xl shadow hover:shadow-xl transition">
                        <h3 class="text-xl font-semibold mb-2">🎮 Интуитивные правила</h3>
                        <p class="text-gray-300 text-sm">
                            Всё знакомо: крестики-против-ноликов, но приятная анимация и быстрый темп.
                        </p>
                    </div>

                    <div class="p-6 bg-white/5 rounded-2xl shadow hover:shadow-xl transition">
                        <h3 class="text-xl font-semibold mb-2">🌐 Игра работает везде</h3>
                        <p class="text-gray-300 text-sm">
                            Запускается на телефоне, планшете, ПК — без ограничений.
                        </p>
                    </div>

                    <div class="p-6 bg-white/5 rounded-2xl shadow hover:shadow-xl transition">
                        <h3 class="text-xl font-semibold mb-2">🔥 Стильный интерфейс</h3>
                        <p class="text-gray-300 text-sm">
                            Приятная графика, мягкие переходы и современная типографика.
                        </p>
                    </div>

                    <div class="p-6 bg-white/5 rounded-2xl shadow hover:shadow-xl transition">
                        <h3 class="text-xl font-semibold mb-2">🧠 Улучшай реакцию</h3>
                        <p class="text-gray-300 text-sm">
                            Три набора уровней — тренируй скорость принятия решений.
                        </p>
                    </div>

                    <div class="p-6 bg-white/5 rounded-2xl shadow hover:shadow-xl transition">
                        <h3 class="text-xl font-semibold mb-2">🚀 Готово к развитию</h3>
                        <p class="text-gray-300 text-sm">
                            Мы уже работаем над режимами PvP, ботами и кастомизацией.
                        </p>
                    </div>

                </div>
            </div>
        </section>



    </div>
</template>