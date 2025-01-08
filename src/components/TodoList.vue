<script setup lang="ts">
import { useTodoStore } from '../stores/todoStore.ts'
import TodoItem from './TodoItem.vue'

const todo = useTodoStore()
const todos = todo.todos
</script>

<template>
    <h2>LIST OF WORKS TODO:</h2>
    <TodoItem
        v-for="(todo, index) in todos"
        :key="index"
        :todoText="todo.text"
        :index="index"
        id="todo-list"
    />
</template>

<style>
#todo-list {
    list-style: none; /* 黒丸を消す */
    text-align: left;
    padding: 0;
}
</style>