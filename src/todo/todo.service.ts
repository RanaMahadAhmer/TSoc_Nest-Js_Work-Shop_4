import { Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { DatabaseService } from '../database/database.service';

import { Prisma } from '@prisma/client';

@Injectable()
export class TodoService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createTodoDto: CreateTodoDto) {
    try {
      const data: Prisma.TodoCreateInput = {
        task: createTodoDto.task,
        description: createTodoDto.description,
        status: 'ACTIVE',
      };
      console.log(data);
      return this.databaseService.todo.create({ data });
    } catch (error) {
      return error;
    }
  }

  findAll() {
    return this.databaseService.todo.findMany();
  }

  findOne(id: number) {
    return this.databaseService.todo.findFirst({ where: { id: id } });
  }

  async update(id: number, updateTodoDto: UpdateTodoDto) {
    return this.databaseService.todo.update({
      where: { id: id },
      data: updateTodoDto,
    });
  }

  remove(id: number) {
    return this.databaseService.todo.delete({ where: { id: id } });
  }
}
