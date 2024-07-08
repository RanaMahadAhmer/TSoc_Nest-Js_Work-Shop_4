import { TodoService } from './todo.service';
import { TodoController } from './todo.controller';
import { DatabaseModule } from '../database/database.module';
import { Module } from '@nestjs/common';

@Module({
  controllers: [TodoController],
  providers: [TodoService],
  imports: [DatabaseModule],
})
export class TodoModule {}
