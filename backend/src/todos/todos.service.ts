import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Todo, Prisma } from '@prisma/client';

@Injectable()
export class TodosService {
  constructor(private readonly prisma: PrismaService) {}

  async getTodos(): Promise<Todo[]> {
    return this.prisma.todo.findMany();
  }

  async addTodo(title: string): Promise<Todo> {
    return this.prisma.todo.create({
      data: { title },
    });
  }

  async updateTodo(id: number, title: string): Promise<Todo> {
    return this.prisma.todo.update({
      where: { id },
      data: { title },
    });
  }

  async markAsCompleted(id: number): Promise<Todo> {
    return this.prisma.todo.update({
      where: { id, isCompleted: false },
      data: {
        isCompleted: true,
      },
    });
  }

  async markAsIncomplete(id: number): Promise<Todo> {
    return this.prisma.todo.update({
      where: { id, isCompleted: true },
      data: {
        isCompleted: false,
      },
    });
  }

  async deleteTodo(id: number): Promise<Todo> {
    return this.prisma.todo.delete({
      where: { id },
    });
  }
}
