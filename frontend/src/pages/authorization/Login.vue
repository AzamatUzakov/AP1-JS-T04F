<script setup lang="ts">
import axios from 'axios';
import { ref } from 'vue';
import { RouterLink, useRouter } from 'vue-router';




const forms = ref({
    email: "",
    password: ""
})


const resText = ref<string>("")
const isEror = ref<boolean>(false)
const route = useRouter()
const sendLogin = async () => {
    try {
        await axios.post("http://localhost:3000/users/login", forms.value)
        resText.value = "Вы успешно вошли"
        isEror.value = false
        route.push("/")

    } catch (err: any) {
        resText.value = `Ошибка: ${err.message}`
        isEror.value = true
    }
}




</script>

<template>
    <div
        class="bg-gradient-to-r z-99 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 from-purple-100 to-blue-100 flex items-center justify-center w-full h-full font-sans">

        <div class="bg-white shadow-lg rounded-2xl p-10 max-w-md w-full">
            <h2 class="text-3xl font-bold text-gray-800 text-center mb-4">Войдите в аккаунт</h2>
            <p class="text-center text-gray-500 mb-4">Заполните форму ниже, чтобы начать ваше путешествие с нами.</p>

            <form @submit.prevent="sendLogin" class="space-y-6">

                <div>
                    <label class="block text-gray-700 mb-2" for="email">Электронная почта</label>
                    <input v-model="forms.email"
                        class="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                        type="email" id="email" placeholder="example@mail.com">
                </div>

                <div>
                    <label class="block text-gray-700 mb-2" for="password">Пароль</label>
                    <input v-model="forms.password"
                        class="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                        type="password" id="password" placeholder="Придумайте пароль">
                </div>


                <button type="submit"
                    class="w-full bg-purple-500 text-white py-3 rounded-lg font-semibold hover:bg-purple-600 transition-colors cursor-pointer">Войти</button>

                <p v-if="resText" :class="[
                    'w-full p-4 text-white text-[18px] font-semibold text-center border-0', isEror ? ' bg-red-500 ' : ' bg-green-500 '
                ]">{{ resText
                }} </p>

            </form>

            <p class="text-center text-gray-500 mt-6 cursor-pointer">
                Еще нету аккаунта?
                <RouterLink to="/register">
                    <p href="#" class="text-purple-500 hover:underline cursor-pointer">Зарегистрироваться</p>
                </RouterLink>
            </p>
        </div>

    </div>
</template>