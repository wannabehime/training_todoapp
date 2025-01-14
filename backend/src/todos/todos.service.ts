import { Injectable } from '@nestjs/common';

@Injectable()
export class TodosService {
  private readonly todos: string[] = ['掃除', '洗濯', '炊飯'];

  getTodos(): string[] {
    return this.todos;
  }
}