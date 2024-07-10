import { Injectable, Logger } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Project } from '@/projects/projects.entity';
import {
  CreateProjectRequest,
  FindAllProjectsResponse,
} from '@/projects/projects.dto';
import { ProjectsMapper } from '@/projects/projects.mapper';

@Injectable()
export class ProjectsService {
  private readonly logger = new Logger(ProjectsService.name);

  constructor(
    private readonly dataSource: DataSource,
    private readonly projectsMapper: ProjectsMapper,
  ) {}

  async createProject({ name }: CreateProjectRequest): Promise<string> {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const projectRepository = this.dataSource.getRepository(Project);

      const project = projectRepository.create({
        name,
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

  async findAllProjects(): Promise<FindAllProjectsResponse> {
    const projects = await this.dataSource.getRepository(Project).find();

    return this.projectsMapper.toFindAllProjectsResponse(projects);
  }
}
