<script setup lang="ts">
import { useTodoStore } from '../stores/todoStore.ts'

const todo = useTodoStore()
const todos = todo.todos
const editTodo = todo.editTodo
const updateTodo = todo.updateTodo
const deleteTodo = todo.deleteTodo
</script>

<template>
    <h2>LIST OF WORKS TODO:</h2>
    <ul v-for="(todo, index) in todos" :key="index" id="todo-list"> <!--todoリスト-->
        <li v-if="!todo.isEditing"> <!--初期状態、または、完了ボタンが押されisEditing:falseとなったとき表示-->
            {{ todo.text }}
            <button @click="editTodo(index)">編集</button>
            <button @click="deleteTodo(index)">削除</button>
        </li>
        <li v-else> <!--編集ボタンが押されisEditing:trueとなったとき表示-->
            <input v-model="todo.text" placeholder="TODOを入力" />
            <button @click="updateTodo(index)">完了</button>
        </li>
    </ul>
</template>

<style>
#todo-list {
    list-style: none; /* 黒丸を消す */
    text-align: left;
    padding: 0;
}
</style>