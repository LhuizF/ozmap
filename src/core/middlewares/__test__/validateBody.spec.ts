import 'mocha';
import { expect } from 'chai';
import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { validateBody } from '@/core/middlewares/validateBody';

describe('validateBody Middleware', () => {
  const testSchema = z.object({
    name: z.string().min(3),
  });

  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: NextFunction;
  let nextCalled: boolean;
  let capturedStatus: number;
  let capturedJson: any;

  beforeEach(() => {
    req = { body: {} };
    nextCalled = false;
    capturedStatus = 0;
    capturedJson = null;

    res = {
      status: (statusCode: number) => {
        capturedStatus = statusCode;
        return res as Response;
      },
      json: (data: any) => {
        capturedJson = data;
        return res as Response;
      },
    };
    next = () => {
      nextCalled = true;
    };
  });

  it('deve chamar next se o body for válido', () => {
    req.body = { name: 'Nome Válido' };
    const middleware = validateBody(testSchema);

    middleware(req as Request, res as Response, next);

    expect(nextCalled).to.be.equal(true);
  });

  it('deve retornar status 400 se o body for inválido', () => {
    req.body = { name: 'ab' };
    const middleware = validateBody(testSchema);

    middleware(req as Request, res as Response, next);

    expect(nextCalled).to.be.equal(false);
    expect(capturedStatus).to.equal(400);
    expect(capturedJson.errors[0].field).to.equal('name');
  });
});
