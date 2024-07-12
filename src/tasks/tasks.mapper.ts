import { Injectable } from '@nestjs/common';
import { Task } from '@/tasks/tasks.entity';
import {
  FindAllTasksResponse,
  FindAllTasksResponse__Task,
  FindTaskResponse,
} from '@/tasks/tasks.reseponse';

@Injectable()
export class TasksMapper {
  toFindAllTasksResponse({ tasks }: { tasks: Task[] }): FindAllTasksResponse {
    const content = tasks.map(this.toFindAllTasksResponse__Task);

    return { content };
  }

  toFindAllTasksResponse__Task(task: Task): FindAllTasksResponse__Task {
    return {
      id: task.id,
      title: task.title,
      status: task.status,
      createdAt: task.createdAt,
      updatedAt: task.updatedAt,
      dueAt: task.dueAt,
    };
  }

  toFindTaskResponse({ task }: { task: Task }): FindTaskResponse {
    return {
      id: task.id,
      title: task.title,
      description: task.description,
      status: task.status,
      createdAt: task.createdAt,
      updatedAt: task.updatedAt,
      dueAt: task.dueAt,
    };
  }
}
