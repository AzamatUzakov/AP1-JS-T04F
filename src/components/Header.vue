<script setup lang="ts">
import { RouterLink } from 'vue-router';

</script>

<template>
    <header class="bg-gray-900 shadow-md sticky top-0 z-50">
        <div class="container mx-auto flex items-center w-[80%] justify-between py-3 md:py-4">

            <img class="w-[90px] md:w-[100px] hover:scale-105 transition-transform duration-300"
                src="https://media.baamboozle.com/uploads/images/1026423/1671123202_36563.png" alt="Логотип">


            <nav class="hidden md:flex items-center gap-[30px] space-x-4 text-white font-semibold">
                <RouterLink to="/">
                    <p class="relative group px-2 py-1 rounded-md hover:bg-white/10 transition">
                        Главная
                        <span
                            class="absolute left-0 -bottom-1 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300"></span>
                    </p>
                </RouterLink>
                <RouterLink to="/games">
                    <p class="relative group px-2 py-1 rounded-md hover:bg-white/10 transition">
                        Игры
                        <span
                            class="absolute left-0 -bottom-1 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300"></span>
                    </p>
                </RouterLink>

                <RouterLink to="/history">

                    <p class="relative group px-2 py-1 rounded-md hover:bg-white/10 transition">
                        История игр
                        <span
                            class="absolute left-0 -bottom-1 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300"></span>
                    </p>
                </RouterLink>

                <RouterLink to="/game/createGame">

                    <p class="relative group px-2 py-1 rounded-md hover:bg-white/10 transition">
                        Создать игру
                        <span
                            class="absolute left-0 -bottom-1 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300"></span>
                    </p>
                </RouterLink>
            </nav>

            <div>
                <RouterLink to="/login">
                    <p href="#"
                        class="px-4 py-2 rounded-md border border-white text-white hover:bg-white hover:text-gray-900 transition">
                        Войти
                    </p>
                </RouterLink>
            </div>
        </div>
    </header>
</template>
