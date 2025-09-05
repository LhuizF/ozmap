import 'mocha';
import { expect } from 'chai';
import { Request, Response, NextFunction } from 'express';
import { notFoundHandler } from '@/core/middlewares/notFoundHandler';
import { HttpError } from '@/core/errors/http.errors';

describe('notFoundHandler Middleware', () => {
  it('deve chamar next com um HttpError de status 404', () => {
    const req: Partial<Request> = {
      originalUrl: '/fake-route',
      t: (key: string) => key,
    };
    const res: Partial<Response> = {};
    let capturedError: any = null;

    const next: NextFunction = (error) => {
      capturedError = error;
    };

    notFoundHandler(req as Request, res as Response, next);

    expect(capturedError).to.be.instanceOf(HttpError);
    expect(capturedError.statusCode).to.equal(404);
    expect(capturedError.message).to.equal('errors.routeNotFound');
  });
});
