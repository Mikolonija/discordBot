export interface SuccessResponse<T = any> {
  success: true;
  message: string;
  data: T | null;
}

const createSuccess = <T>(
  message: string,
  data: T | null = null
): SuccessResponse<T> => {
  return {
    success: true,
    message,
    data,
  };
};

export default createSuccess;
