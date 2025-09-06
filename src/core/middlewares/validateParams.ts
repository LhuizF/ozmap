import { Request, Response, NextFunction } from 'express';
import { ZodType, ZodError } from 'zod';

export const validateParams = (schema: ZodType<any>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      req.params = schema.parse(req.params);
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

      return res.status(400).json({ message: err.message });
    }
  };
};
