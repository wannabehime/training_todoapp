<script setup lang="ts">
import { ref, toRefs } from "vue";
import { useTodoStore } from "../stores/todoStore.ts";
import type { ResponseTodo } from "../types/Todo.ts";

const todo = useTodoStore();

const props = defineProps<{todo: ResponseTodo}>();
const { title, id, isCompleted } = toRefs(props.todo)

const userInput = ref(title);
const isEditing = ref(false);

function editTodo() {
  // todoを編集。編集ボタンにバインド
  isEditing.value = true;
}

function completeEditTodo(id: number, userInput: string) {
  // todoを更新して通常画面に戻す。完了ボタンにバインド
  todo.updateTodo(id, userInput);
  isEditing.value = false;
}
</script>

<template>
  <li v-if="isEditing">
    <input v-model="userInput" placeholder="TODOを入力" />
    <button @click="completeEditTodo(id, userInput)">完了</button>
  </li>
  <li v-else :class="{ 'text-decoration': isCompleted }">
    {{ title }}
    <button @click="editTodo">編集</button>
    <button v-if="isCompleted" @click="todo.recoverTodo(id)">未済</button>
    <button v-else @click="todo.completeTodo(id)">済</button>
    <button @click="todo.deleteTodo(id)">削除</button>
  </li>
</template>

<style>
.text-decoration {
  text-decoration: line-through;
}
</style>
