import { TodosService } from './todos.service';
import { Controller, Get } from '@nestjs/common';
import { Todo } from '@prisma/client';

@Controller('todos')
export class TodosController {
  constructor(private todosService: TodosService){}

  @Get()
  getTodos(): Promise<Todo[]> {
    return this.todosService.getTodos();
  }
}
