import { PartialType } from '@nestjs/mapped-types';
import { CreateTodoDto } from './create-todo.dto';
import { IsOptional, IsString } from 'class-validator';

export class UpdateTodoDto extends PartialType(CreateTodoDto) {
  @IsOptional()
  @IsString()
  status: TodoStatus;
}

enum TodoStatus {
  ACTIVE = 'ACTIVE',
  DONE = 'DONE',
}
