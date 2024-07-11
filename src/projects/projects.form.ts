import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateProjectForm {
  @ApiProperty({ description: '프로젝트 이름', required: false })
  @IsOptional()
  @IsNotEmpty({
    message: 'PROJECT_NAME_EMPTY:project name cannot be an empty string',
  })
  name?: string;

  @ApiProperty({ description: '프로젝트 노트', required: false })
  @IsOptional()
  note?: string;
}
