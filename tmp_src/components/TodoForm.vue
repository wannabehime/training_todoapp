<script setup>
import { ref } from 'vue'
const greeting = ref('Hello World!')
</script>

<template>
    <h1>TODO LIST</h1>
    <input v-model="newTodo" placeholder="Write your todo list here..." />
    <button @click="addTodo">ADD</button>
</template>

<style>
.greeting {
  color: red;
  font-weight: bold;
}
</style>