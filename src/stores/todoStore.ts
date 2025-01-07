import { defineStore } from 'pinia';
import { ref } from 'vue'

export type Todo = { // todoオブジェクトの型
    text: string;
    isEditing: boolean;
}

export const useTodoStore = defineStore('todo', () => {

    const todos = ref<Todo[]>([ // todoリスト配列
        {text: 'Shopping', isEditing: false},
        {text: 'Rent Pay', isEditing: false},
        {text: 'Cleaning', isEditing: false}
    ])

    function addTodo(newTodo: string) { // todoを追加。追加ボタンをバインド
        if(newTodo != '') { // TODO:バリデーション再考の余地
             /**
              * newTodo.valueを直接pushすると、追加したtodoに入力フォームのvalueが
              * 同期されてしまうので、スプレッド演算子でコピー
              */
            todos.value.push({ text: newTodo, isEditing: false })
        }
    }
    
    function editTodo(index: number) { // todoを編集。編集ボタンにバインド
        todos.value[index].isEditing = true
    }
    
    function updateTodo(index: number) { // todoを更新。完了ボタンにバインド
        todos.value[index].isEditing = false
    }
    
    function deleteTodo(index: number) { // todoを削除。削除ボタンをバインド
        todos.value.splice(index, 1)
    }

    return { todos, addTodo, editTodo, updateTodo, deleteTodo }
})



