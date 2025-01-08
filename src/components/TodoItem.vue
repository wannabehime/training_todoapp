<script setup lang="ts">
import { ref } from 'vue'
import { useTodoStore } from '../stores/todoStore.ts'

const todo = useTodoStore()

const props = defineProps<{
    todoText: string
    isCompleted: boolean
    index: number
}>()

const userInput = ref(props.todoText)
const isEditing = ref(false)

function editTodo() { // todoを編集。編集ボタンにバインド
    isEditing.value = true
}

function completeEditTodo(index: number, userInput: string) { // todoを更新して通常画面に戻す。完了ボタンにバインド
    todo.updateTodo(index, userInput)
    isEditing.value = false
}
</script>

<template>
    <li v-if="isEditing">
        <input v-model="userInput" placeholder="TODOを入力" />
        <button @click="completeEditTodo(index, userInput)">完了</button>
    </li>
    <li v-else :class="{ 'text-decoration': isCompleted }">
        {{ todoText }}
        <button @click="editTodo">編集</button>
        <button @click="todo.toggleTodo(index)">済</button>
    </li>
</template>

<style>
.text-decoration {
    text-decoration: line-through;
}
</style>