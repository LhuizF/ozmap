import { Request, Response, NextFunction } from 'express';
import { ZodType, ZodError } from 'zod';

export const validateQuery = (schema: ZodType<any>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      req.query = schema.parse(req.query);
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
