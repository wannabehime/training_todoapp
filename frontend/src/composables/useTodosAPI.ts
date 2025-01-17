import { onMounted } from "vue";
import type { RequestTodo, ResponseTodo, Todo } from "../types/Todo";

interface GetTodosArg {
  method: "GET";
  path: string;
}

interface AddTodoArg {
  method: "POST";
  path: string;
  requestTodo: RequestTodo;
}

interface UpdateTitleArg {
  method: "PATCH";
  path: string;
  requestTodo: RequestTodo;
}

interface UpdateIsCompletedArg {
  method: "PATCH";
  path: string;
}

interface DeleteTodoArg {
  method: "DELETE";
  path: string;
}

type Arg =
  | GetTodosArg
  | AddTodoArg
  | UpdateTitleArg
  | UpdateIsCompletedArg
  | DeleteTodoArg;

const holder = async (arg: Arg) => {
  // const hasBody = "requestTodo" in arg;

  // const options: RequestInit = {
  //   method: arg.method,
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   ...(hasBody && { body: JSON.stringify(arg.requestTodo) }),
  // };

  // const response = await fetch(arg.path, options);

  // if (!response.ok) {
  //   throw new Error(`HTTPエラー: ${response.status}`);
  // }

  return response;
};

export function useTodosAPI() {
  const getAllTodos = async (arg: GetTodosArg) => {
    try {
      const response = await holder(arg);

      return (await response.json()) as Todo[];
    } catch (error) {
      console.error("APIリクエストエラー:", error);
      return [];
    }
  };

  class TodoAddFailure extends Error {
    constructor() {
      super();
    }
  }

  const addTodo = async ({
    title,
  }: RequestTodo): Promise<[ResponseTodo, null] | [null, TodoAddFailure]> => {
    try {
      // const arg: AddTodoArg = {
      //   method: "POST",
      //   path: "http://localhost:3000/todos",
      //   requestTodo: { title },
      // };

      // const hasBody = "requestTodo" in arg;

      // const options: RequestInit = {
      //   method: arg.method,
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   ...(hasBody && { body: JSON.stringify(arg.requestTodo) }),
      // };

      const response = await fetch({
        path: "http://localhost:3000/todos",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title }),
      });

      if (!response.ok) {
        throw new Error(`HTTPエラー: ${response.status}`);
      }

      const data = (await response.json()) as ResponseTodo;
      return [data, null];
    } catch (error) {
      if (error instanceof TodoAddFailure)
        console.error("APIリクエストエラー:", error);
      return [null, new TodoAddFailure()];
    }
  };
  // const addTodo = async (arg: AddTodoArg) => {
  //   try {
  //     const response = await holder(arg);

  //     return (await response.json()) as ResponseTodo;
  //   } catch (error) {
  //     console.error("APIリクエストエラー:", error);
  //     return {};
  //   }
  // };

  return {
    getAllTodos,
    addTodo,
  };
}
