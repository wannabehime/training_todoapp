<script setup>
import { ref } from 'vue'

// 現時点では固定値を挿入しています
const todos = ref(['Shopping', 'Rent Pay', 'Cleaning'])

</script>

<template>
    <h2>LIST OF WORKS TODO:</h2>
    <ul id="todo-list">
        <li v-for="(todo, index) in todos" :key="index">
            <!-- 現時点ではボタンは機能しません -->
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