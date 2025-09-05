import 'mocha';
import { expect } from 'chai';
import { Request, Response, NextFunction } from 'express';
import { errorHandler } from '@/core/middlewares/errorHandler';
import { NotFoundError } from '@/core/errors/http.errors';
import sinon from 'sinon';
import { i18next } from '@/core/config/i18n.config';

describe('errorHandler Middleware', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: NextFunction;
  let tStub: sinon.SinonStub;

  let capturedStatus: number;
  let capturedJson: any;

  beforeEach(() => {
    req = {
      t: (key: string) => key,
    };

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

    next = () => {};

    tStub = sinon.stub(i18next, 't').callsFake((key: string) => key);
  });

  afterEach(() => {
    tStub.restore();
  });

  it('deve lidar com um HttpError e retornar o status e a mensagem corretos', () => {
    const error = new NotFoundError('Recurso não encontrado');

    errorHandler(error, req as Request, res as Response, next);

    expect(capturedStatus).to.equal(404);
    expect(capturedJson).to.deep.equal({ message: 'Recurso não encontrado' });
  });

  it('deve lidar com um SyntaxError de body inválido e retornar status 400', () => {
    const error = new SyntaxError('Unexpected token i in JSON at position 1');
    (error as any).body = 'invalid json';

    errorHandler(error, req as Request, res as Response, next);

    expect(capturedStatus).to.equal(400);
    expect(capturedJson).to.deep.equal({ message: 'errors.invalidBody' });
  });

  it('deve lidar com um erro genérico e retornar status 500', () => {
    const error = new Error('Erro inesperado');

    errorHandler(error, req as Request, res as Response, next);

    expect(capturedStatus).to.equal(500);
    expect(capturedJson).to.deep.equal({
      message: 'errors.internalServerError',
    });
  });
});
