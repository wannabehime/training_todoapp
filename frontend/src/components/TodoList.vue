<script setup lang="ts">
import { onMounted } from "vue";
import { useTodoStore } from "../stores/todoStore.ts";
import TodoItem from "./TodoItem.vue";
import { storeToRefs } from "pinia";

const todoStore = useTodoStore();
const { todos } = storeToRefs(todoStore);

onMounted(() => {
  todoStore.getAllTodos();
});
</script>

<template>
  <h2>LIST OF WORKS TODO:</h2>
  <TodoItem v-for="todo in todos" :key="todo.id" :todo="todo" id="todo-list" />
</template>

<style>
#todo-list {
  list-style: none; /* 黒丸を消す */
  text-align: left;
  padding: 0;
}
</style>
