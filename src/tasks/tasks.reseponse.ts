import { ApiProperty } from '@nestjs/swagger';
import { TaskStatus } from '@/tasks/tasks.entity';

export class FindAllTasksResponse__Task {
  @ApiProperty({ description: '테스크 ID' })
  id: string;

  @ApiProperty({ description: '테스트 제목' })
  title: string;

  @ApiProperty({ description: '테스크 상태', required: false })
  status: TaskStatus;

  @ApiProperty({ description: '생성 일자' })
  createdAt: Date;

  @ApiProperty({ description: '수정 일자' })
  updatedAt: Date;

  @ApiProperty({ description: '마감 일자' })
  dueAt: Date;
}

export class FindAllTasksResponse {
  @ApiProperty({
    type: FindAllTasksResponse__Task,
    isArray: true,
    description: '테스크 전체 조회 내용',
  })
  content: FindAllTasksResponse__Task[];
}

export class FindTaskResponse {
  @ApiProperty({ description: '테스크 ID' })
  id: string;

  @ApiProperty({ description: '테스트 제목' })
  title: string;

  @ApiProperty({ description: '테스트 설명' })
  description: string;

  @ApiProperty({ description: '테스크 상태', required: false })
  status: TaskStatus;

  @ApiProperty({ description: '생성 일자' })
  createdAt: Date;

  @ApiProperty({ description: '수정 일자' })
  updatedAt: Date;

  @ApiProperty({ description: '마감 일자' })
  dueAt: Date;
}
