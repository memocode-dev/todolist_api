import { ApiProperty } from '@nestjs/swagger';

export class UpdateProjectForm {
  @ApiProperty({ description: '프로젝트 이름', required: false })
  name?: string;

  @ApiProperty({ description: '프로젝트 노트', required: false })
  note?: string;
}
