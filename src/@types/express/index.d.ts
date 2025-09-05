import 'express';

declare module 'express-serve-static-core' {
  interface Request {
    t: (key: string, options?: any) => string;
  }
}
