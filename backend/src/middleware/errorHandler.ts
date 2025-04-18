import { Request, Response, NextFunction } from 'express';

export const errorHandler = (
  err: Error & { statusCode?: number },
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  const status = err.statusCode || 500;
  res.status(status).json({
    success: false,
    message: err.message || 'Internal Server Error',
  });
};
