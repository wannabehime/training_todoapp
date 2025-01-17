export interface Todo {
  id: number;
  title: string;
  isCompleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export type RequestTodo = Pick<Todo, "title">;

export type ResponseTodo = Pick<Todo, "id" | "title" | "isCompleted">;