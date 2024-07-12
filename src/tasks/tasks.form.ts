import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { TaskStatus } from '@/tasks/tasks.entity';

export class CreateTaskForm {
  @ApiProperty({ description: '테스크 제목', required: true })
  title: string;

  @ApiProperty({ description: '테스크 설명', required: false })
  description?: string;

  @ApiProperty({ description: '테스크 만료일자', required: false })
  @Transform(({ value }) => (value ? new Date(value) : value))
  dueAt?: Date;
}

export class UpdateTaskForm {
  @ApiProperty({ description: '테스크 제목', required: false })
  title?: string;

  @ApiProperty({ description: '테스크 설명', required: false })
  description?: string;

  @ApiProperty({ description: '테스크 상태', required: false })
  status?: TaskStatus;

  @ApiProperty({ description: '테스크 만료일자', required: false })
  @Transform(({ value }) => (value ? new Date(value) : value))
  dueAt?: Date;
}

export class FindAllTasksQuery {
  @ApiProperty({ description: '테스크 시작 마감일자', required: false })
  @Transform(({ value }) => (value ? new Date(value) : value))
  startDueAt?: Date;

  @ApiProperty({ description: '테스크 종료 마감일자', required: false })
  @Transform(({ value }) => (value ? new Date(value) : value))
  endDueAt?: Date;
}
