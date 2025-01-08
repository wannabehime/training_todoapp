import { defineStore } from 'pinia';
import { ref } from 'vue'

export const useTodoStore = defineStore('todo', () => {

    const todos = ref(['Shopping', 'Rent Pay', 'Cleaning']) // todoリスト配列

    function addTodo(newTodo: string) { // todoを追加。追加ボタンをバインド
        if (newTodo === '') return // TODO:バリデーション再考の余地
        todos.value.push(newTodo)
    }

    function updateTodo(index: number, userInput: string) { // todoを更新
        todos.value[index] = userInput
    }

    function deleteTodo(index: number) { // todoを削除。削除ボタンをバインド
        todos.value.splice(index, 1)
    }

    return { todos, addTodo, updateTodo, deleteTodo }
})



