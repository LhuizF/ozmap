import { NextFunction, Request, Response } from 'express';
import { HttpError } from '@/core/errors/http.errors';
import { i18next } from '@/core/config/i18n.config';

export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  //disable-next-line eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: NextFunction,
) {
  if (err instanceof HttpError) {
    const message = req.t(err.message, { ...err.params });
    return res.status(err.statusCode).json({ message });
  }

  if (err instanceof SyntaxError && 'body' in err) {
    const t = i18next.t.bind(i18next);

    const message = t('errors.invalidBody');
    return res.status(400).json({ message });
  }

  console.error(err);
  const message = req.t('errors.internalServerError');
  res.status(500).json({ message });
}
