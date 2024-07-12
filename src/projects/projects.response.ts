import { ApiProperty } from '@nestjs/swagger';

export class CreateProjectResponse {
  @ApiProperty({ description: '프로젝트 ID' })
  id: string;
}

export class FindAllProjectsResponse__Project {
  @ApiProperty({ description: '프로젝트 ID' })
  id: string;

  @ApiProperty({ description: '프로젝트 이름' })
  name: string;

  @ApiProperty({ description: '생성 일자' })
  createdAt: Date;

  @ApiProperty({ description: '수정 일자' })
  updatedAt: Date;
}

export class FindAllProjectsResponse {
  @ApiProperty({
    type: FindAllProjectsResponse__Project,
    isArray: true,
    description: '프로젝트 전체 조회 내용',
  })
  content: FindAllProjectsResponse__Project[];
}

export class FindProjectResponse {
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
