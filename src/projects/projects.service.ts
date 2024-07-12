import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Project } from '@/projects/projects.entity';
import { ProjectsMapper } from '@/projects/projects.mapper';
import { Validation } from '@/common/utils/validation';
import {
  FindAllProjectsResponse,
  FindProjectResponse,
} from '@/projects/projects.response';
import {
  CreateProjectRequest,
  DeleteProjectRequest,
  FindProjectRequest,
  UpdateProjectRequest,
} from '@/projects/projects.request';

@Injectable()
export class ProjectsService {
  private readonly logger = new Logger(ProjectsService.name);

  constructor(
    private readonly dataSource: DataSource,
    private readonly projectsMapper: ProjectsMapper,
  ) {}

  async findAllProjects(): Promise<FindAllProjectsResponse> {
    const projects = await this.dataSource.getRepository(Project).find({
      order: {
        createdAt: 'ASC',
      },
    });

    return this.projectsMapper.toFindAllProjectsResponse(projects);
  }

  async findProject(request: FindProjectRequest): Promise<FindProjectResponse> {
    await Validation.validate(request, FindProjectRequest);

    const project = await this.dataSource
      .getRepository(Project)
      .findOneBy({ id: request.projectId });

    if (!project) {
      throw new NotFoundException('not found project');
    }

    return {
      id: project.id,
      name: project.name,
      note: project.note,
      createdAt: project.createdAt,
      updatedAt: project.updatedAt,
    };
  }

  async createProject(request: CreateProjectRequest): Promise<string> {
    await Validation.validate(request, CreateProjectRequest);

    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const projectRepository = queryRunner.manager.getRepository(Project);

      const project = projectRepository.create({
        name: request.name,
      });

      await projectRepository.save(project);

      await queryRunner.commitTransaction();

      this.logger.log('Created Project id: ' + project.id);

      return project.id;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async updateProject(request: UpdateProjectRequest): Promise<void> {
    await Validation.validate(request, UpdateProjectRequest);

    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const projectRepository = queryRunner.manager.getRepository(Project);

      const project = await projectRepository.findOneBy({
        id: request.projectId,
      });

      if (!project) {
        throw new NotFoundException('not found project');
      }

      if (request.name !== undefined && request.name !== null) {
        project.name = request.name;
      }

      if (request.note !== undefined && request.note !== null) {
        project.note = request.note;
      }

      await projectRepository.save(project);

      this.logger.log('Updated Project id: ' + project.id);

      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async deleteProject(request: DeleteProjectRequest): Promise<void> {
    await Validation.validate(request, DeleteProjectRequest);

    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const projectRepository = queryRunner.manager.getRepository(Project);

      const project = await projectRepository.findOneBy({
        id: request.projectId,
      });

      if (!project) {
        throw new NotFoundException('not found project');
      }

      await projectRepository.remove(project);

      this.logger.log('Deleted Project id: ' + project.id);

      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }
}
