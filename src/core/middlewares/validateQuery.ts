import { Request, Response, NextFunction } from 'express';
import { ZodType, ZodError } from 'zod';

export const validateQuery = (...schemas: ZodType<any>[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      req.query = schemas.reduce(
        (acc, schema) => ({ ...acc, ...schema.parse(req.query) }),
        {},
      );

      next();
    } catch (err) {
      if (err instanceof ZodError) {
        const formattedErrors = err.issues.map((issue) => ({
          field: issue.path[0],
          message: issue.message,
        }));
        return res.status(400).json({
          errors: formattedErrors,
        });
      }

      return res.status(400).json({ message: err.message });
    }
  };
};
