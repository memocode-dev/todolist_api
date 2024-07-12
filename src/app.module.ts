import { Module } from '@nestjs/common';
import { AppDataSource } from './common/data-source';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectsModule } from './projects/projects.module';
import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(AppDataSource.options),
    ProjectsModule,
    TasksModule,
  ],
})
export class AppModule {}
