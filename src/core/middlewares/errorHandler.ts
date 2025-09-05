import { NextFunction, Request, Response } from 'express';
import { HttpError } from '@/core/errors/http.errors';

export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  _next: NextFunction,
) {
  console.log('Handling HttpError:', req.t);
  if (err instanceof HttpError) {
    const message = req.t(err.message, { ...err.params });
    return res.status(err.statusCode).json({ message });
  }

  if (err instanceof SyntaxError && 'body' in err) {
    const message = req.t('errors.invalidBody');
    return res.status(400).json({ message });
  }

  console.error(err);
  const message = req.t('errors.internalServerError');
  res.status(500).json({ message });
}
