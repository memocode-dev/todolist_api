import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { Between, DataSource } from 'typeorm';
import {
  CreateTaskRequest,
  DeleteTaskRequest,
  FindAllTasksRequest,
  FindTaskRequest,
  UpdateTaskRequest,
} from '@/tasks/tasks.request';
import { Validation } from '@/common/utils/validation';
import { Project } from '@/projects/projects.entity';
import { Task, TaskStatus } from '@/tasks/tasks.entity';
import { ErrorCodes } from '@/common/exception/error';
import {
  FindAllTasksResponse,
  FindTaskResponse,
} from '@/tasks/tasks.reseponse';
import { TasksMapper } from '@/tasks/tasks.mapper';

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);

  constructor(
    private readonly dataSource: DataSource,
    private readonly tasksMapper: TasksMapper,
  ) {}

  async createTask(request: CreateTaskRequest) {
    await Validation.validate(request, CreateTaskRequest);

    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const projectRepository = queryRunner.manager.getRepository(Project);
      const taskRepository = queryRunner.manager.getRepository(Task);

      const project = await projectRepository.findOneBy({
        id: request.projectId,
      });
      if (!project) {
        throw new NotFoundException(ErrorCodes.PROJECT_NOT_FOUND);
      }

      const task = taskRepository.create({
        title: request.title,
        description: request.description,
        project: project,
        status: TaskStatus.NOT_DONE,
      });

      if (request.dueAt !== undefined) {
        task.changeDueAt(request.dueAt);
      }

      await taskRepository.save(task);

      await queryRunner.commitTransaction();

      this.logger.log('Created Task id: ' + task.id);

      return task.id;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async findAllTasks(
    request: FindAllTasksRequest,
  ): Promise<FindAllTasksResponse> {
    await Validation.validate(request, FindAllTasksRequest);

    // 둘 중 하나라도 존재할 때 모두 존재해야함
    if (request.startDueAt || request.endDueAt) {
      if (!(request.startDueAt && request.endDueAt)) {
        throw new BadRequestException(ErrorCodes.TASK_DUE_DATES_REQUIRED);
      }

      // endDueAt은 startDueAt보다 작을 수 없음
      if (request.startDueAt >= request.endDueAt) {
        throw new BadRequestException(
          ErrorCodes.TASK_END_DATE_BEFORE_START_DATE,
        );
      }
    }

    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();

    try {
      const projectRepository = queryRunner.manager.getRepository(Project);
      const taskRepository = queryRunner.manager.getRepository(Task);

      const project = await projectRepository.findOneBy({
        id: request.projectId,
      });
      if (!project) {
        throw new NotFoundException(ErrorCodes.PROJECT_NOT_FOUND);
      }

      const tasks = await taskRepository.find({
        where: {
          project: { id: project.id },
          dueAt:
            request.startDueAt && request.endDueAt
              ? Between(request.startDueAt, request.endDueAt)
              : null,
        },
        order: {
          createdAt: 'ASC',
        },
      });

      return this.tasksMapper.toFindAllTasksResponse({
        tasks: tasks,
      });
    } catch (error) {
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async findTask(request: FindTaskRequest): Promise<FindTaskResponse> {
    await Validation.validate(request, FindTaskRequest);

    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();

    try {
      const projectRepository = queryRunner.manager.getRepository(Project);
      const taskRepository = queryRunner.manager.getRepository(Task);

      const project = await projectRepository.findOneBy({
        id: request.projectId,
      });
      if (!project) {
        throw new NotFoundException(ErrorCodes.PROJECT_NOT_FOUND);
      }

      const task = await taskRepository.findOneBy({ id: request.taskId });
      if (!task) {
        throw new NotFoundException(ErrorCodes.PROJECT_NOT_FOUND);
      }

      return this.tasksMapper.toFindTaskResponse({
        task,
      });
    } catch (error) {
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async updateTask(request: UpdateTaskRequest): Promise<void> {
    await Validation.validate(request, UpdateTaskRequest);

    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const projectRepository = queryRunner.manager.getRepository(Project);
      const taskRepository = queryRunner.manager.getRepository(Task);

      const project = await projectRepository.findOneBy({
        id: request.projectId,
      });
      if (!project) {
        throw new NotFoundException(ErrorCodes.PROJECT_NOT_FOUND);
      }

      const task = await taskRepository.findOneBy({ id: request.taskId });
      if (!task) {
        throw new NotFoundException(ErrorCodes.PROJECT_NOT_FOUND);
      }

      if (request.title !== undefined) {
        task.changeTitle(request.title);
      }

      if (request.description !== undefined) {
        task.changeDescription(request.description);
      }

      if (request.status !== undefined) {
        task.changeStatus(request.status);
      }

      if (request.dueAt !== undefined) {
        task.changeDueAt(request.dueAt);
      }

      await taskRepository.save(task);

      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async deleteTask(request: DeleteTaskRequest): Promise<void> {
    await Validation.validate(request, DeleteTaskRequest);

    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const projectRepository = queryRunner.manager.getRepository(Project);
      const taskRepository = queryRunner.manager.getRepository(Task);

      const project = await projectRepository.findOneBy({
        id: request.projectId,
      });
      if (!project) {
        throw new NotFoundException(ErrorCodes.PROJECT_NOT_FOUND);
      }

      const task = await taskRepository.findOneBy({ id: request.taskId });
      if (!task) {
        throw new NotFoundException(ErrorCodes.TASK_NOT_FOUND);
      }

      await taskRepository.remove(task);

      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }
}
