import { TodosService } from './todos.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { Todo } from '@prisma/client';

@Controller('todos')
export default class TodosController {
  constructor(private todosService: TodosService) {}

  @Get()
  async getTodos(): Promise<Todo[]> {
    return this.todosService.getTodos();
  }

  @Post()
  async addTodo(@Body() todoData: { title: string }): Promise<Todo> {
    return this.todosService.addTodo({
      title: todoData.title,
    });
  }

  @Patch(':id')
  async updateTodo(
    @Param('id', ParseIntPipe) id: number,
    @Body('title') title: string,
  ): Promise<Todo> {
    return this.todosService.updateTodo(id, title);
  }

  @Patch('complete/:id')
  async markAsCompleted(@Param('id', ParseIntPipe) id: number): Promise<Todo> {
    return this.todosService.markAsCompleted(id);
  }

  @Patch('incomplete/:id')
  async markAsIncomplete(@Param('id', ParseIntPipe) id: number): Promise<Todo> {
    return this.todosService.markAsIncomplete(id);
  }

  @Delete(':id')
  async deleteTodo(@Param('id', ParseIntPipe) id: number): Promise<Todo> {
    return this.todosService.deleteTodo(id);
  }
}
