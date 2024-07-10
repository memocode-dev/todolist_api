import { Module } from '@nestjs/common';
import { ProjectsService } from '@/projects/projects.service';
import { ProjectsController } from '@/projects/projects.controller';
import { ProjectsMapper } from '@/projects/projects.mapper';

@Module({
  providers: [ProjectsService, ProjectsMapper],
  controllers: [ProjectsController],
})
export class ProjectsModule {}
