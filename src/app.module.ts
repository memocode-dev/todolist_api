import { Module } from '@nestjs/common';
import { AppDataSource } from './common/data-source';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectsModule } from './projects/projects.module';

@Module({
  imports: [TypeOrmModule.forRoot(AppDataSource.options), ProjectsModule],
})
export class AppModule {}
