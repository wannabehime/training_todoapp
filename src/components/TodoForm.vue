<script setup lang="ts">
import { ref } from 'vue'
import { useTodoStore } from '../stores/todoStore.ts'

const todo = useTodoStore()
const input = ref() // フォーカスしたいinputを割り当てるための変数。TODO:型
const newTodo = ref<string>('') // 追加する新たなtodo
const addTodo = todo.addTodo

function addTodoAndFocus(newTodo: string) {
    addTodo(newTodo)
    input.value = '' // 不要なので入力をクリア
    input.value.focus()

}
</script>

<template>
    <h1>TODO LIST</h1>
    <input v-model="newTodo" ref="input" placeholder="TODOを入力" /> <!--入力内容をnewTodoと同期-->
    <button @click="addTodoAndFocus(newTodo)">追加</button> <!--新しいtodoの追加-->
</template>

<style>

</style>