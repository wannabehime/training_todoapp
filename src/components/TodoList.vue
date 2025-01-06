<script setup lang="ts">
import { ref } from 'vue'
import type { Ref } from 'vue';

const input = ref() // フォーカスしたいinputを割り当てるための変数。TODO:型

type Todo = { // todoオブジェクトの型
    text: string;
    isEditing: boolean;
};

const todos: Ref<Todo[]> = ref([ // todoリスト配列
    {text: 'Shopping', isEditing: false},
    {text: 'Rent Pay', isEditing: false},
    {text: 'Cleaning', isEditing: false}
])

const newTodo: Ref<Todo> = ref({text: '', isEditing: false}) // 追加する新たなtodo

function addTodo(){ // todoを追加。追加ボタンをバインド
    if(newTodo.value.text != ''){ // TODO:バリデーション再考の余地
         /**
          * newTodo.valueを直接pushすると、追加したtodoに入力フォームのvalueが
          * 同期されてしまうので、スプレッド演算子でコピー
          */
        todos.value.push({ ...newTodo.value })
        newTodo.value.text = '' // 不要なので入力をクリア
    }
    input.value.focus()
}

function editTodo(index: number){ // todoを編集。編集ボタンにバインド
    todos.value[index].isEditing = true
}

function updateTodo(index: number){ // todoを更新。完了ボタンにバインド
    todos.value[index].isEditing = false
}

function deleteTodo(index: number){ // todoを削除。削除ボタンをバインド
    todos.value.splice(index, 1)
}
</script>

<template>
    <h1>TODO LIST</h1>
    <input v-model="newTodo.text" ref="input" placeholder="TODOを入力" /> <!--入力内容をnewTodoと同期-->
    <button @click="addTodo">追加</button> <!--新しいtodoの追加-->

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