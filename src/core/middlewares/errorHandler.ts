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

  if (err instanceof SyntaxError && 'body' in err) {
    return res.status(400).json({
      message: 'body inválido.',
    });
  }

  console.error(err);
  res.status(500).json({ message: 'Internal server error' });
}
