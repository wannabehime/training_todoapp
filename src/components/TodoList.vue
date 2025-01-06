<script setup lang="ts">
import { ref } from 'vue'
import type { Ref } from 'vue';

const todos: Ref<string[]> = ref(['Shopping', 'Rent Pay', 'Cleaning']) // todoリスト配列。型を追加
const newTodo: Ref<string> = ref('')// 追加する新たなtodo
function addTodo(): void{ // 追加ボタンをバインドする関数
    todos.value.push(newTodo.value)
}
</script>

<template>
    <h1>TODO LIST</h1>
    <input v-model="newTodo" placeholder="TODOを入力" /> <!--入力内容をnewTodoと同期-->
    <button @click="addTodo">追加</button> <!--新しいtodoの追加-->

    <h2>LIST OF WORKS TODO:</h2>
    <ul id="todo-list"> <!--todoリスト-->
        <li v-for="(todo, index) in todos" :key="index">
            <!--現時点ではボタンは機能しません-->
            {{ todo }}<button>編集</button><button>削除</button>
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