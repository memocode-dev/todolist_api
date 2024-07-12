import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  Res,
} from '@nestjs/common';
import {
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { TasksService } from '@/tasks/tasks.service';
import { Response } from 'express';
import { CreateProjectResponse } from '@/projects/projects.response';
import {
  CreateTaskForm,
  FindAllTasksQuery,
  UpdateTaskForm,
} from '@/tasks/tasks.form';
import {
  FindAllTasksResponse,
  FindTaskResponse,
} from '@/tasks/tasks.reseponse';

@ApiTags('tasks')
@Controller('/projects/:projectId/tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  @ApiOperation({ summary: '테스크 전체 조회' })
  @ApiOkResponse({
    description: 'Successful response with a list of tasks',
    type: FindAllTasksResponse,
  })
  async findAllProjects(
    @Param('projectId') projectId: string,
    @Query() { startDueAt, endDueAt }: FindAllTasksQuery,
  ): Promise<FindAllTasksResponse> {
    return this.tasksService.findAllTasks({
      projectId,
      startDueAt,
      endDueAt,
    });
  }

  @Post()
  @ApiOperation({ summary: '테스크 생성' })
  async createProject(
    @Param('projectId') projectId: string,
    @Body() { title, description, dueAt }: CreateTaskForm,
    @Res() response: Response,
  ): Promise<Response<CreateProjectResponse>> {
    const taskId = await this.tasksService.createTask({
      title,
      description,
      dueAt,
      projectId,
    });

    return response
      .status(HttpStatus.CREATED)
      .location(taskId)
      .json({ id: taskId });
  }

  @Get('/:taskId')
  @ApiOperation({ summary: '테스크 단건 조회' })
  @ApiOkResponse({
    description: 'Successful response with a list of tasks',
    type: FindTaskResponse,
  })
  async findTask(
    @Param('projectId') projectId: string,
    @Param('taskId') taskId: string,
  ): Promise<FindTaskResponse> {
    return this.tasksService.findTask({ projectId: projectId, taskId: taskId });
  }

  @Patch('/:taskId')
  @ApiOperation({ summary: '테스크 수정' })
  async updateTask(
    @Param('projectId') projectId: string,
    @Param('taskId') taskId: string,
    @Body() { title, description, dueAt, status }: UpdateTaskForm,
    @Res() response: Response,
  ): Promise<Response<void>> {
    await this.tasksService.updateTask({
      projectId,
      taskId,
      title,
      description,
      dueAt,
      status,
    });

    return response.status(HttpStatus.NO_CONTENT).send();
  }

  @Delete('/:taskId')
  @ApiOperation({ summary: '테스크 삭제' })
  async deleteTask(
    @Param('projectId') projectId: string,
    @Param('taskId') taskId: string,
    @Res() response: Response,
  ): Promise<Response<void>> {
    await this.tasksService.deleteTask({ projectId, taskId });

    return response.status(HttpStatus.NO_CONTENT).send();
  }
}
