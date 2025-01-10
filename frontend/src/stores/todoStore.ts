import { defineStore } from 'pinia';
import { ref } from 'vue'

export type Todo= {
    text: string;
    isCompleted: boolean;
};

export const useTodoStore = defineStore('todo', () => {

    const todos = ref([
        { text: 'Shopping', isCompleted: false },
        { text: 'Rent Pay', isCompleted: false },
        { text: 'Cleaning', isCompleted: false }
    ]) // todoリスト配列

    function addTodo(newTodo: string) { // todoを追加。追加ボタンをバインド
        if (newTodo === '') return // TODO:バリデーション再考の余地
        todos.value.push({text: newTodo, isCompleted: false})
    }

    function updateTodo(index: number, userInput: string) { // todoを更新
        todos.value[index].text = userInput
    }

    function toggleTodo(index: number) { // todoを削除。済ボタンをバインド
        todos.value[index].isCompleted = !todos.value[index].isCompleted
    }

    return { todos, addTodo, updateTodo, toggleTodo }
})



