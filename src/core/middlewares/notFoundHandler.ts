import { Request, Response, NextFunction } from 'express';
import { HttpError } from '@/core/errors/http.errors';

export function notFoundHandler(
  req: Request,
  _res: Response,
  next: NextFunction,
) {
  next(new HttpError(`Rota '${req.originalUrl}' não encontrada`, 404));
}
