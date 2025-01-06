<script setup>
import { ref } from 'vue'

</script>

<template>
    <h1>TODO LIST</h1>
    <input v-model="newTodo" placeholder="Write your todo list here..." />
    <button @click="addTodo">ADD</button>
</template>

<style>

</style>