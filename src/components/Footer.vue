<script setup lang="ts">
</script>

<template>
    <footer class="bg-gray-900 text-gray-200 py-10 mt-auto">
        <div class="container mx-auto w-[80%] flex justify-between flex-wrap">

            <!-- 1: Логотип и слоган -->
            <div class="flex flex-col items-start space-y-3">
                <img class="w-[120px] md:w-[150px] hover:scale-105 transition-transform duration-300"
                    src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/i/560ef078-73b8-44f3-8394-abebafa1fb13/dgf4kyr-dc03eb2f-f35a-43ff-ad54-48c9ce3ec5e3.png/v1/fill/w_304,h_340/fixiki___nolik_s_updated_render_by_magicalboyfan2004_dgf4kyr-fullview.png"
                    alt="Логотип проекта">
                <p class="text-white font-semibold">Крестики-Нолики для школы 21</p>
                <p class="text-gray-400 text-sm md:text-base">Играйте, создавайте и подключайтесь к новым играм с
                    друзьями!</p>
            </div>

            <!-- 2: Основная информация и функции -->
            <div class="space-y-3 text-sm md:text-base">
                <p class="font-semibold text-white">Функции проекта:</p>
                <ul class="list-disc ml-5 space-y-1">
                    <li>Авторизация по логину и паролю (basic auth)</li>
                    <li>Регистрация новых пользователей</li>
                    <li>Список текущих игр и создание новой</li>
                    <li>Присоединение к игре и отображение участников</li>
                    <li>Игровой процесс крестики-нолики</li>
                    <li>Сохранение данных в базу</li>
                    <li>Выход на экран авторизации</li>
                </ul>
                <p class="text-gray-400 mt-3">© 2025 Проект школы 21. Все права защищены. Или почти все 😎</p>
            </div>

            <!-- 3: Контакты и соцсети -->
            <div class="flex flex-col items-start space-y-3">
                <p class="font-semibold text-white">Контакты</p>
                <p class="text-gray-400 text-sm">Email: school21@example.com</p>
                <p class="text-gray-400 text-sm">Телефон: +998 90 123 45 67</p>

                <p class="font-semibold text-white mt-2">Следите за нами</p>
                <div class="flex space-x-3 mt-1">
                    <a href="#" class="text-gray-400 hover:text-white transition">
                        <i class="fab fa-facebook-f"></i>
                    </a>
                    <a href="#" class="text-gray-400 hover:text-white transition">
                        <i class="fab fa-twitter"></i>
                    </a>
                    <a href="#" class="text-gray-400 hover:text-white transition">
                        <i class="fab fa-instagram"></i>
                    </a>
                </div>
            </div>

        </div>
    </footer>
</template>
