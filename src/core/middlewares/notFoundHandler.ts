import { Request, Response, NextFunction } from 'express';
import { HttpError } from '@/core/errors/http.errors';

export function notFoundHandler(
  req: Request,
  _res: Response,
  next: NextFunction,
) {
  const message = req.t('errors.routeNotFound', { route: req.originalUrl });
  next(new HttpError(message, 404));
}
