import { defineStore } from "pinia";
import { ref } from "vue";
import type { RequestTodo, ResponseTodo } from "../types/Todo";
import { useTodosAPI } from "../composables/useTodosAPI";

const { addTodo: addToDoAPI }  = useTodosAPI()

export const useTodoStore = defineStore("todo", () => {
  const todos = ref<ResponseTodo[]>([]); // todoリスト配列

  async function getAllTodos() {
    try {
      const response = await useTodosAPI({
        method: "GET",
        path: "http://localhost:3000/todos",
      });

      //   const s = (await response.json()) as ResponseTodo[];
      //   todos.value = s;
      //   console.log({ s, k: todos.value });
      //   console.log(todos.value);

      const responseTodos = (await response.json()) as ResponseTodo[];
      todos.value = responseTodos;
      //   for (const todo of responseTodos) {
      //     todos.value.push(todo);
      //   }
      console.log(todos.value);
    } catch (error) {
      console.error("APIリクエストエラー:", error);
    }
  }

  async function addTodo(newTodo: string) {
    // todoを追加。追加ボタンをバインド
    if (newTodo === "") return;

    // const requestAddTodo: RequestTodo = { title: newTodo };
    try {
    //   const response = useTodosAPI().addTodo({
    //     method: "POST",
    //     path: "http://localhost:3000/todos",
    //     requestTodo: requestAddTodo,
    //   });

      const [registeredTodo, error] = await addToDoAPI({ title: newTodo });
      if (error) return console.log('本当はエラーハンドリング')
      todos.value.push(registeredTodo);
  }

  async function updateTodo(id: number, userInput: string) {
    // todoを更新

    const requestTodo: RequestTodo = { title: userInput };
    try {
      const response = useTodosAPI({
        method: "PATCH",
        path: `http://localhost:3000/todos/${id}`,
        requestTodo: requestTodo,
      });

      const responseTodo = (await (await response).json()) as ResponseTodo;
      const targetTodo = todos.value.find(
        (todo) => todo.id === responseTodo.id
      );
      if (targetTodo) {
        targetTodo.title = responseTodo.title;
      }
    } catch (error) {
      console.error("APIリクエストエラー:", error);
    }
  }

  async function completeTodo(id: number) {
    // todoを完了。済ボタンをバインド

    try {
      const response = useTodosAPI({
        method: "PATCH",
        path: `http://localhost:3000/todos/complete/${id}`,
      });

      const responseTodo = (await (await response).json()) as ResponseTodo;
      const targetTodo = todos.value.find(
        (todo) => todo.id === responseTodo.id
      );
      if (targetTodo) {
        targetTodo.isCompleted = responseTodo.isCompleted;
      }
    } catch (error) {
      console.error("APIリクエストエラー:", error);
    }
  }

  async function recoverTodo(id: number) {
    // todoを未完了。未済ボタンをバインド

    try {
      const response = useTodosAPI({
        method: "PATCH",
        path: `http://localhost:3000/todos/incomplete/${id}`,
      });

      const responseTodo = (await (await response).json()) as ResponseTodo;
      const targetTodo = todos.value.find(
        (todo) => todo.id === responseTodo.id
      );
      if (targetTodo) {
        targetTodo.isCompleted = responseTodo.isCompleted;
      }
    } catch (error) {
      console.error("APIリクエストエラー:", error);
    }
  }

  async function deleteTodo(id: number) {
    // todoを削除。削除ボタンをバインド

    try {
      const response = useTodosAPI({
        method: "DELETE",
        path: `http://localhost:3000/todos/${id}`,
      });

      const responseTodo = (await (await response).json()) as ResponseTodo;
      const targetTodo = todos.value.find(
        (todo) => todo.id === responseTodo.id
      );
      if (targetTodo) {
        const index = todos.value.indexOf(targetTodo);
        todos.value.splice(index, 1);
      }
    } catch (error) {
      console.error("APIリクエストエラー:", error);
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
