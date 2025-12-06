<script setup lang="ts">
import axios from 'axios';
import { ref } from 'vue';
import { RouterLink, useRouter } from 'vue-router';
import { useUserStore } from '../../stores/userStore';



const form = ref({
    name: "",
    email: "",
    password: ""
})

const resText = ref<string>("")
const isEror = ref<boolean>(false)
const route = useRouter()
const userStore = useUserStore()

const sendRegister = async () => {
    try {
        const res = await axios.post("http://localhost:3000/users/register", form.value)
        const userData = res.data.user || res.data   // если бэкенд возвращает token + user
        const token = res.data.token || null
        console.log(res.data);

        if (token) userStore.setUser(userData, token)
        resText.value = "Вы успешно зарегистрировались"
        isEror.value = false
        route.push("/")
    } catch (err: any) {
        resText.value = `Ошибка: ${err.response?.data?.message || err.message}`
        isEror.value = true
    }
}


</script>

<template>
    <div
        class="bg-gradient-to-r z-99 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 from-purple-100 to-blue-100 flex items-center justify-center w-full h-full font-sans">

        <div class="bg-white shadow-lg rounded-2xl p-10 max-w-md w-full">
            <h2 class="text-3xl font-bold text-gray-800 text-center mb-4">Создайте аккаунт</h2>
            <p class="text-center text-gray-500 mb-4">Заполните форму ниже, чтобы начать ваше путешествие с нами.</p>

            <form @submit.prevent="sendRegister" class="space-y-6">
                <div>
                    <label class="block text-gray-700 mb-2" for="name">Имя</label>
                    <input v-model="form.name"
                        class="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                        type="text" id="name" placeholder="Ваше имя">
                </div>

                <div>
                    <label class="block text-gray-700 mb-2" for="email">Электронная почта</label>
                    <input v-model="form.email"
                        class="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                        type="email" id="email" placeholder="example@mail.com">
                </div>

                <div>
                    <label class="block text-gray-700 mb-2" for="password">Пароль</label>
                    <input v-model="form.password"
                        class="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                        type="password" id="password" placeholder="Придумайте пароль">
                </div>


                <button type="submit"
                    class="w-full bg-purple-500 text-white py-3 rounded-lg font-semibold hover:bg-purple-600 transition-colors cursor-pointer">Зарегистрироваться</button>
                <p v-if="resText" :class="[
                    'w-full p-4 text-white text-[18px] font-semibold text-center border-0', isEror ? ' bg-red-500 ' : ' bg-green-500 '
                ]">{{ resText
                }} </p>

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

<style></style>