<script setup lang="ts">
import { RouterView } from 'vue-router';
import Footer from './components/Footer.vue';
import Header from './components/Header.vue';
import { onMounted } from 'vue';

onMounted(() => {
    document.title = "Tic Tac Toe";
});
</script>

<template>
    <div class="flex flex-col ">
        <Header />
        <div class="">
            <RouterView />
        </div>
        <Footer />
    </div>
    <!-- <Register/> -->
    <!-- <Login/> -->
</template>
