export interface ErrorCode {
  code: string;
  message: string;
}

const ErrorCodes: Record<string, ErrorCode> = {
  PROJECT_NOT_FOUND: {
    code: 'PROJECT_NOT_FOUND',
    message: 'Project not found',
  },
};

export { ErrorCodes };
