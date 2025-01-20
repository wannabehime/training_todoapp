// import { onMounted } from "vue";
import type {
  ResponseTodo,
  TodoId,
  TodoIdAndTitle,
  TodoTitle,
} from "../types/Todo";

// interface GetTodosArg {
//   method: "GET";
//   path: string;
// }

// interface AddTodoArg {
//   method: "POST";
//   path: string;
//   requestTodo: RequestTodo;
// }

// interface UpdateTitleArg {
//   method: "PATCH";
//   path: string;
//   requestTodo: RequestTodo;
// }

// interface UpdateIsCompletedArg {
//   method: "PATCH";
//   path: string;
// }

// interface DeleteTodoArg {
//   method: "DELETE";
//   path: string;
// }

// type Arg =
//   | GetTodosArg
//   | AddTodoArg
//   | UpdateTitleArg
//   | UpdateIsCompletedArg
//   | DeleteTodoArg;

export function useTodosAPI() {
  class TodoGetFailure extends Error {
    constructor() {
      super();
    }
  }

  const getAllTodos = async (): Promise<
    [ResponseTodo[], null] | [null, TodoGetFailure]
  > => {
    try {
      const response = await fetch("http://localhost:3000/todos", {
        method: "GET",
      });

      if (!response.ok) {
        throw new TodoGetFailure();
      }

      const data = (await response.json()) as ResponseTodo[];

      return [data, null];
    } catch (error) {
      if (error instanceof TodoGetFailure)
        console.error("APIリクエストエラー:", error);
      return [null, new TodoGetFailure()];
    }
  };

  class TodoAddFailure extends Error {
    constructor() {
      super();
    }
  }

  const addTodo = async ({
    title,
  }: TodoTitle): Promise<[ResponseTodo, null] | [null, TodoAddFailure]> => {
    try {
      const response = await fetch("http://localhost:3000/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title }),
      });

      if (!response.ok) {
        throw new TodoAddFailure();
      }

      const data = (await response.json()) as ResponseTodo;
      return [data, null];
    } catch (error) {
      if (error instanceof TodoAddFailure)
        console.error("APIリクエストエラー:", error);
      return [null, new TodoAddFailure()];
    }
  };

  class TodoUpdateFailure extends Error {
    constructor() {
      super();
    }
  }

  const updateTodo = async ({
    id,
    title,
  }: TodoIdAndTitle): Promise<
    [ResponseTodo, null] | [null, TodoUpdateFailure]
  > => {
    try {
      const response = await fetch(`http://localhost:3000/todos/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title }),
      });

      if (!response.ok) {
        throw new TodoUpdateFailure();
      }

      const data = (await response.json()) as ResponseTodo;
      return [data, null];
    } catch (error) {
      if (error instanceof TodoUpdateFailure)
        console.error("APIリクエストエラー:", error);
      return [null, new TodoUpdateFailure()];
    }
  };

  class TodoCompleteFailure extends Error {
    constructor() {
      super();
    }
  }

  const markAsCompleted = async ({
    id,
  }: TodoId): Promise<[ResponseTodo, null] | [null, TodoCompleteFailure]> => {
    try {
      const response = await fetch(
        `http://localhost:3000/todos/complete/${id}`,
        {
          method: "PATCH",
        }
      );

      if (!response.ok) {
        throw new TodoCompleteFailure();
      }

      const data = (await response.json()) as ResponseTodo;
      return [data, null];
    } catch (error) {
      if (error instanceof TodoCompleteFailure)
        console.error("APIリクエストエラー:", error);
      return [null, new TodoCompleteFailure()];
    }
  };

  class TodoIncompleteFailure extends Error {
    constructor() {
      super();
    }
  }

  const markAsIncomplete = async ({
    id,
  }: TodoId): Promise<[ResponseTodo, null] | [null, TodoIncompleteFailure]> => {
    try {
      const response = await fetch(
        `http://localhost:3000/todos/incomplete/${id}`,
        {
          method: "PATCH",
        }
      );

      if (!response.ok) {
        throw new TodoIncompleteFailure();
      }

      const data = (await response.json()) as ResponseTodo;
      return [data, null];
    } catch (error) {
      if (error instanceof TodoIncompleteFailure)
        console.error("APIリクエストエラー:", error);
      return [null, new TodoIncompleteFailure()];
    }
  };

  class TodoDeleteFailure extends Error {
    constructor() {
      super();
    }
  }

  const deleteTodo = async ({
    id,
  }: TodoId): Promise<[ResponseTodo, null] | [null, TodoDeleteFailure]> => {
    try {
      const response = await fetch(`http://localhost:3000/todos/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new TodoDeleteFailure();
      }

      const data = (await response.json()) as ResponseTodo;
      return [data, null];
    } catch (error) {
      if (error instanceof TodoDeleteFailure)
        console.error("APIリクエストエラー:", error);
      return [null, new TodoDeleteFailure()];
    }
  };

  return {
    getAllTodos,
    addTodo,
    updateTodo,
    markAsCompleted,
    markAsIncomplete,
    deleteTodo,
  };
}
