import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateProjectRequest {
  @ApiProperty({ description: '프로젝트 이름' })
  @IsNotEmpty({
    message: 'PROJECT_NAME_EMPTY:project name cannot be an empty string',
  })
  name: string;
}

export class UpdateProjectRequest {
  @IsUUID(4, { message: 'PROJECT_ID_NOT_UUID:project is not uuid' })
  projectId: string;

  @IsOptional()
  @IsNotEmpty({
    message: 'PROJECT_NAME_EMPTY:project name cannot be an empty string',
  })
  name?: string;

  @IsOptional()
  @IsString()
  note?: string;
}

export class FindProjectRequest {
  @IsUUID(4, { message: 'PROJECT_ID_NOT_UUID:project is not uuid' })
  projectId: string;
}

export class DeleteProjectRequest {
  @IsUUID(4, { message: 'PROJECT_ID_NOT_UUID:project is not uuid' })
  projectId: string;
}
