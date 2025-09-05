import 'mocha';
import { z } from 'zod';
import { expect } from 'chai';
import { Request, Response, NextFunction } from 'express';
import { validateParams } from '@/core/middlewares/validateParams';

describe('validateParams Middleware', () => {
  const testSchema = z.object({
    param: z.string().min(3),
  });

  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: NextFunction;
  let nextCalled: boolean;
  let capturedStatus: number;

  beforeEach(() => {
    req = { params: {} };
    nextCalled = false;
    capturedStatus = 0;
    res = {
      status: (statusCode: number) => {
        capturedStatus = statusCode;
        return res as Response;
      },
      json: () => res as Response,
    };
    next = () => {
      nextCalled = true;
    };
  });

  it('deve chamar next se os parâmetros forem válidos', () => {
    req.params = { param: 'valido' };
    const middleware = validateParams(testSchema);
    middleware(req as Request, res as Response, next);
    expect(nextCalled).to.equal(true);
  });

  it('deve retornar status 400 se os parâmetros forem inválidos', () => {
    req.params = { param: 'a' };
    const middleware = validateParams(testSchema);
    middleware(req as Request, res as Response, next);
    expect(nextCalled).to.equal(false);
    expect(capturedStatus).to.equal(400);
  });
});
