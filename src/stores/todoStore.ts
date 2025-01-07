import { defineStore } from 'pinia';
import { ref } from 'vue'
import type { Ref } from 'vue';

export const useTodoStore = defineStore('todo', () => {
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

    function addTodo() { // todoを追加。追加ボタンをバインド
        if(newTodo.value.text != '') { // TODO:バリデーション再考の余地
             /**
              * newTodo.valueを直接pushすると、追加したtodoに入力フォームのvalueが
              * 同期されてしまうので、スプレッド演算子でコピー
              */
            todos.value.push({ ...newTodo.value })
            newTodo.value.text = '' // 不要なので入力をクリア
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

    return { todos, newTodo, addTodo, editTodo, updateTodo, deleteTodo }
})



