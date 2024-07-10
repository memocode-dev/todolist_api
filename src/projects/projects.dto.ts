import { ApiProperty } from '@nestjs/swagger';

export class CreateProjectRequest {
  @ApiProperty({ description: '프로젝트 이름' })
  name: string;
}

export class CreateProjectResponse {
  @ApiProperty({ description: '프로젝트 ID' })
  id: string;
}

export class FindAllProjectsResponse {
  content: FindAllProjectsResponse__Project[];
}

export class FindAllProjectsResponse__Project {
  @ApiProperty({ description: '프로젝트 ID' })
  id: string;

  @ApiProperty({ description: '프로젝트 이름' })
  name: string;

  @ApiProperty({ description: '프로젝트 노트' })
  note: string;

  @ApiProperty({ description: '생성 일자' })
  createdAt: Date;

  @ApiProperty({ description: '수정 일자' })
  updatedAt: Date;
}
