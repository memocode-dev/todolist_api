import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Project } from '@/projects/projects.entity';
import { BadRequestException } from '@nestjs/common';
import { ErrorCodes } from '@/common/exception/error';

export enum TaskStatus {
  DONE = 'DONE',
  NOT_DONE = 'NOT_DONE',
}

@Entity('tasks')
export class Task {
  @PrimaryGeneratedColumn('uuid', {
    name: 'id',
    primaryKeyConstraintName: 'PK_tasks_id',
  })
  id: string;

  @Column({ name: 'title', type: 'text' })
  title: string;

  @Column({ name: 'description', type: 'text', default: '' })
  description: string;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @ManyToOne(() => Project)
  @JoinColumn({
    name: 'project_id',
    foreignKeyConstraintName: 'FK_tasks_project_id',
  })
  project: Project;

  @Column({
    name: 'status',
    type: 'enum',
    enum: TaskStatus,
    default: TaskStatus.NOT_DONE,
  })
  status: TaskStatus;

  @Column({
    name: 'due_at',
    type: 'timestamptz',
    default: () => "'9999-12-31 23:59:59+00'",
  })
  dueAt: Date;

  changeTitle(title: string) {
    this.title = title;
  }

  changeDescription(description: string) {
    this.description = description;
  }

  changeStatus(status: TaskStatus) {
    this.status = status;
  }

  changeDueAt(dueAt: Date) {
    if (dueAt <= this.createdAt) {
      throw new BadRequestException(ErrorCodes.TASK_DUE_AT_BEFORE_CREATED_AT);
    }

    this.dueAt = dueAt;
  }
}
