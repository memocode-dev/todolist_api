import {
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { TaskStatus } from '@/tasks/tasks.entity';

export class CreateTaskRequest {
  @IsString({ message: 'TASK_NAME_IS_STRING:task name must be string' })
  @IsNotEmpty({
    message: 'PROJECT_NAME_EMPTY:project name cannot be an empty string',
  })
  title: string;

  @IsString({
    message: 'TASK_DESCRIPTION_IS_STRING:task description must be string',
  })
  description: string;

  @IsUUID(4, { message: 'PROJECT_ID_NOT_UUID:project must be uuid' })
  projectId: string;

  @IsOptional()
  @IsDate()
  dueAt?: Date;
}

export class UpdateTaskRequest {
  @IsUUID(4, { message: 'PROJECT_ID_NOT_UUID:project id must be uuid' })
  projectId: string;

  @IsUUID(4, { message: 'TASK_ID_NOT_UUID:task id must be uuid' })
  taskId: string;

  @IsOptional()
  @IsString({ message: 'TASK_NAME_IS_STRING:task name must be string' })
  @IsNotEmpty({
    message: 'PROJECT_NAME_EMPTY:project name cannot be an empty string',
  })
  title?: string;

  @IsOptional()
  @IsString({
    message: 'TASK_DESCRIPTION_IS_STRING:task description must be string',
  })
  description?: string;

  @IsOptional()
  @IsEnum(TaskStatus, {
    message: 'TASK_STATUS_NOT_VALID:status must be DONE or NOT_DONE',
  })
  status?: TaskStatus;

  @IsOptional()
  @IsDate()
  dueAt?: Date;
}

export class DeleteTaskRequest {
  @IsUUID(4, { message: 'PROJECT_ID_NOT_UUID:project id must be uuid' })
  projectId: string;

  @IsUUID(4, { message: 'TASK_ID_NOT_UUID:task id must be uuid' })
  taskId: string;
}

export class FindAllTasksRequest {
  @IsUUID(4, { message: 'PROJECT_ID_NOT_UUID:project must be uuid' })
  projectId: string;

  @IsOptional()
  @IsDate()
  startDueAt?: Date;

  @IsOptional()
  @IsDate()
  endDueAt?: Date;
}

export class FindTaskRequest {
  @IsUUID(4, { message: 'PROJECT_ID_NOT_UUID:project must be uuid' })
  projectId: string;

  @IsUUID(4, { message: 'TASK_ID_NOT_UUID:project must be uuid' })
  taskId: string;
}
