import { TodosService } from './todos.service';
import { Controller, Get } from '@nestjs/common';

@Controller('todos')
export class TodosController {
  constructor(private todosService: TodosService){}

  @Get()
  getTodos(): string[] {
    return this.todosService.getTodos();
  }
}
