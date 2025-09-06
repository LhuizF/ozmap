import { Request, Response, NextFunction } from 'express';
import { ZodError, ZodType } from 'zod';

export const validateBody = (schema: ZodType<any>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      req.body = schema.parse(req.body);
      next();
    } catch (err) {
      if (err instanceof ZodError) {
        const formattedErrors = err.issues.map((issue) => ({
          field: issue.path[0],
          message: req.t(issue.message),
        }));

        return res.status(400).json({
          errors: formattedErrors,
        });
      }

      const message = err.message || req.t('errors.invalidRequestBody');

      return res.status(400).json({ message });
    }
  };
};
