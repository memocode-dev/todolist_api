import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { TasksMapper } from '@/tasks/tasks.mapper';

@Module({
  providers: [TasksService, TasksMapper],
  controllers: [TasksController],
})
export class TasksModule {}
