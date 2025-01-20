import { defineStore } from "pinia";
import { ref } from "vue";
import type { ResponseTodo } from "../types/Todo";
import { useTodosAPI } from "../composables/useTodosAPI";

const {
  getAllTodos: getAllTodosAPI,
  addTodo: addToDoAPI,
  updateTodo: updateTodoAPI,
  markAsCompleted: markAsCompletedAPI,
  markAsIncomplete: markAsIncompleteAPI,
  deleteTodo: deleteTodoAPI,
} = useTodosAPI();

export const useTodoStore = defineStore("todo", () => {
  const todos = ref<ResponseTodo[]>([]); // todoリスト配列

  async function getAllTodos() {
    const [gottenTodos, error] = await getAllTodosAPI();
    if (error) return console.log("本当はエラーハンドリング");
    todos.value = gottenTodos;
  }

  async function addTodo(newTodo: string) {
    // todoを追加。追加ボタンをバインド
    if (newTodo === "") return;

    const [registeredTodo, error] = await addToDoAPI({ title: newTodo });
    if (error) return console.log("本当はエラーハンドリング");
    todos.value.push(registeredTodo);
  }

  async function updateTodo(id: number, userInput: string) {
    // todoを更新
    const [updatedTodo, error] = await updateTodoAPI({
      id,
      title: userInput,
    });
    if (error) return console.log("本当はエラーハンドリング");

    const targetTodo = todos.value.find((todo) => todo.id === updatedTodo.id);
    if (targetTodo) {
      targetTodo.title = updatedTodo.title;
    }
  }

  async function completeTodo(id: number) {
    // todoを完了。済ボタンをバインド
    const [markedAsCompletedTodo, error] = await markAsCompletedAPI({
      id,
    });
    if (error) return console.log("本当はエラーハンドリング");

    const targetTodo = todos.value.find(
      (todo) => todo.id === markedAsCompletedTodo.id
    );
    if (targetTodo) {
      targetTodo.isCompleted = markedAsCompletedTodo.isCompleted;
    }
  }

  async function recoverTodo(id: number) {
    // todoを未完了。未済ボタンをバインド
    const [markedAsIncompleteTodo, error] = await markAsIncompleteAPI({
      id,
    });
    if (error) return console.log("本当はエラーハンドリング");

    const targetTodo = todos.value.find(
      (todo) => todo.id === markedAsIncompleteTodo.id
    );
    if (targetTodo) {
      targetTodo.isCompleted = markedAsIncompleteTodo.isCompleted;
    }
  }

  async function deleteTodo(id: number) {
    // todoを削除。削除ボタンをバインド
    const [deletedTodo, error] = await deleteTodoAPI({
      id,
    });
    if (error) return console.log("本当はエラーハンドリング");
    const targetTodo = todos.value.find((todo) => todo.id === deletedTodo.id);
    if (targetTodo) {
      const index = todos.value.indexOf(targetTodo);
      todos.value.splice(index, 1);
    }
  }

  return {
    todos,
    getAllTodos,
    addTodo,
    updateTodo,
    completeTodo,
    recoverTodo,
    deleteTodo,
  };
});
