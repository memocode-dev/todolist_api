import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Res,
} from '@nestjs/common';
import { ProjectsService } from '@/projects/projects.service';
import { UpdateProjectForm } from './projects.form';
import { Response } from 'express';
import {
  CreateProjectResponse,
  FindAllProjectsResponse,
  FindProjectResponse,
} from '@/projects/projects.response';
import { CreateProjectRequest } from '@/projects/projects.request';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { FindAllTasksResponse } from '@/tasks/tasks.reseponse';

@ApiTags('projects')
@Controller('/projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Get()
  @ApiOperation({ summary: '프로젝트 전체 조회' })
  @ApiOkResponse({
    type: FindAllProjectsResponse,
  })
  async findAllProjects(): Promise<FindAllProjectsResponse> {
    return this.projectsService.findAllProjects();
  }

  @Get('/:projectId')
  @ApiOperation({ summary: '프로젝트 단건 조회' })
  @ApiOkResponse({
    type: FindProjectResponse,
  })
  async findProject(
    @Param('projectId') projectId: string,
  ): Promise<FindProjectResponse> {
    return this.projectsService.findProject({ projectId: projectId });
  }

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

  @Patch('/:projectId')
  @ApiOperation({ summary: '프로젝트 수정' })
  async updateProject(
    @Param('projectId') projectId: string,
    @Body() { name, note }: UpdateProjectForm,
    @Res() response: Response,
  ): Promise<Response<void>> {
    await this.projectsService.updateProject({ projectId, name, note });

    return response.status(HttpStatus.NO_CONTENT).send();
  }

  @Delete('/:projectId')
  @ApiOperation({ summary: '프로젝트 삭제' })
  async deleteProject(
    @Param('projectId') projectId: string,
    @Res() response: Response,
  ): Promise<Response<void>> {
    await this.projectsService.deleteProject({ projectId });

    return response.status(HttpStatus.NO_CONTENT).send();
  }
}
