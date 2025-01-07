<script setup lang="ts">
import { ref } from 'vue'
import { useTodoStore } from '../stores/todoStore.ts'

const input = ref() // フォーカスしたいinputを割り当てるための変数。TODO:型
const todo = useTodoStore()
const newTodo = todo.newTodo
const addTodo = todo.addTodo

function addTodoAndFocus() {
    addTodo()
    input.value.focus()

}
</script>

<template>
    <h1>TODO LIST</h1>
    <input v-model="newTodo.text" ref="input" placeholder="TODOを入力" /> <!--入力内容をnewTodoと同期-->
    <button @click="addTodoAndFocus()">追加</button> <!--新しいtodoの追加-->
</template>

<style>

</style>