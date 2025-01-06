<script setup lang="ts">
import { ref } from 'vue'

</script>

<template>
    <h1>TODO LIST</h1>
    <input v-model="newTodo" placeholder="TODOを入力" />
    <button @click="addTodo">追加</button>
</template>

<style>

</style>