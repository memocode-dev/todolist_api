export interface ErrorCode {
  code: string;
  message: string;
}

const ErrorCodes: Record<string, ErrorCode> = {
  // project
  PROJECT_NOT_FOUND: {
    code: 'PROJECT_NOT_FOUND',
    message: '테스크를 찾을 수 없습니다.',
  },

  // task
  TASK_NOT_FOUND: {
    code: 'TASK_NOT_FOUND',
    message: '테스크를 찾을 수 없습니다.',
  },
  TASK_DUE_AT_BEFORE_CREATED_AT: {
    code: 'TASK_DUE_AT_BEFORE_CREATED_AT',
    message: '테스크가 생성된 일자 전으로 설정해주세요.',
  },
  TASK_DUE_DATES_REQUIRED: {
    code: 'TASK_DUE_DATES_REQUIRED',
    message: 'startDueAt과 endDueAt은 함께 존재해야 합니다.',
  },
  TASK_END_DATE_BEFORE_START_DATE: {
    code: 'TASK_END_DATE_BEFORE_START_DATE',
    message: 'endDueAt은 startDueAt보다 작을 수 없습니다.',
  },
};

export { ErrorCodes };
