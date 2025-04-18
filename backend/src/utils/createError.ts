const createError = (message: string, statusCode = 500) => {
  const err = new Error(message) as Error & { statusCode?: number };
  err.statusCode = statusCode;
  return err;
};

export default createError;
