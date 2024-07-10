import { Body, Controller, Get, HttpStatus, Post, Res } from '@nestjs/common';
import { ProjectsService } from '@/projects/projects.service';
import {
  CreateProjectRequest,
  CreateProjectResponse,
  FindAllProjectsResponse,
} from './projects.dto';
import { Response } from 'express';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('projects')
@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post()
  @ApiOperation({ summary: '프로젝트 생성' })
  async createProject(
    @Body() createProjectRequest: CreateProjectRequest,
    @Res() response: Response,
  ): Promise<Response<CreateProjectResponse>> {
    const projectId =
      await this.projectsService.createProject(createProjectRequest);

    return response
      .status(HttpStatus.CREATED)
      .location(projectId)
      .json({ id: projectId });
  }

  @Get()
  @ApiOperation({ summary: '프로젝트 전체 조회' })
  async findAllProjects(): Promise<FindAllProjectsResponse> {
    return this.projectsService.findAllProjects();
  }
}
