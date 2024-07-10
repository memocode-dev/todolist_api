import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsUUID } from 'class-validator';

export class CreateProjectRequest {
  @ApiProperty({ description: '프로젝트 이름' })
  @IsUUID()
  name: string;
}

export class UpdateProjectRequest {
  @IsUUID()
  projectId: string;

  @IsOptional()
  @IsNotEmpty({ message: 'name cannot be an empty string' })
  name?: string;

  @IsOptional()
  note?: string;
}

export class FindProjectRequest {
  @IsUUID()
  projectId: string;
}

export class DeleteProjectRequest {
  @IsUUID()
  projectId: string;
}
