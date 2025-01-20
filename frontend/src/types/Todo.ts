export interface Todo {
  id: number;
  title: string;
  isCompleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export type TodoId = Pick<Todo, "id">;

export type TodoTitle = Pick<Todo, "title">;

export type TodoIdAndTitle = Pick<Todo, "id" | "title">;

export type ResponseTodo = Pick<Todo, "id" | "title" | "isCompleted">;