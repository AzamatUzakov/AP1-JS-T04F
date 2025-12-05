<script setup lang="ts">
import { useUserStore } from '../stores/userStore';


const useStorage = useUserStore()
console.log(useStorage.user?.id);

</script>

<template>
    <h1>Исторя игра</h1>
</template>