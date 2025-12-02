<script setup lang="ts">
import { RouterLink } from 'vue-router';


</script>

<template>
    <div
        class="bg-gradient-to-r z-99 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 from-purple-100 to-blue-100 flex items-center justify-center w-full h-full font-sans">

        <div class="bg-white shadow-lg rounded-2xl p-10 max-w-md w-full">
            <h2 class="text-3xl font-bold text-gray-800 text-center mb-4">Создайте аккаунт</h2>
            <p class="text-center text-gray-500 mb-4">Заполните форму ниже, чтобы начать ваше путешествие с нами.</p>

            <form class="space-y-6">
                <div>
                    <label class="block text-gray-700 mb-2" for="name">Имя</label>
                    <input
                        class="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                        type="text" id="name" placeholder="Ваше имя">
                </div>

                <div>
                    <label class="block text-gray-700 mb-2" for="email">Электронная почта</label>
                    <input
                        class="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                        type="email" id="email" placeholder="example@mail.com">
                </div>

                <div>
                    <label class="block text-gray-700 mb-2" for="password">Пароль</label>
                    <input
                        class="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                        type="password" id="password" placeholder="Придумайте пароль">
                </div>

                <div>
                    <label class="block text-gray-700 mb-2" for="confirm-password">Повторите пароль</label>
                    <input
                        class="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                        type="password" id="confirm-password" placeholder="Повторите пароль">
                </div>

                <button
                    class="w-full bg-purple-500 text-white py-3 rounded-lg font-semibold hover:bg-purple-600 transition-colors cursor-pointer">Зарегистрироваться</button>
            </form>

            <p class="text-center text-gray-500 mt-6 cursor-pointer">
                Уже есть аккаунт?
                <RouterLink to="/login">

                    <p href="#" class="text-purple-500 hover:underline cursor-pointer">Войти</p>
                </RouterLink>
            </p>
        </div>

    </div>
</template>