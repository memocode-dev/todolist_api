import { Injectable } from '@nestjs/common';
import { Project } from '@/projects/projects.entity';
import {
  FindAllProjectsResponse,
  FindAllProjectsResponse__Project,
} from '@/projects/projects.response';

@Injectable()
export class ProjectsMapper {
  toFindAllProjectsResponse(projects: Project[]): FindAllProjectsResponse {
    const content = projects.map(this.toFindAllProjectsResponse__Project);

    return { content };
  }

  toFindAllProjectsResponse__Project(
    project: Project,
  ): FindAllProjectsResponse__Project {
    return {
      id: project.id,
      name: project.name,
      createdAt: project.createdAt,
      updatedAt: project.updatedAt,
    };
  }
}
