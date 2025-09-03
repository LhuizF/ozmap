import { NextFunction, Request, Response } from 'express';
import { HttpError } from '@/core/errors/http.errors';

export function errorHandler(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
) {
  if (err instanceof HttpError) {
    return res.status(err.statusCode).json({ message: err.message });
  }
  console.error(err);
  res.status(500).json({ message: 'Internal server error' });
}
