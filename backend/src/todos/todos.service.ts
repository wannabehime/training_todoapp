import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Todo } from '@prisma/client';

@Injectable()
export class TodosService {
  constructor(private prisma: PrismaService) {}

//   private readonly todos: string[] = ['掃除', '洗濯', '炊飯'];

  async getTodos(): Promise<Todo[]> {
    return this.prisma.todo.findMany();
  }
}