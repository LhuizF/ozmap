import 'mocha';
import { z, ZodType } from 'zod';
import sinon from 'sinon';
import { expect } from 'chai';
import { Request, Response } from 'express';
import { validateParams } from '@/core/middlewares/validateParams';

describe('validateParams Middleware', () => {
  const testSchema = z.object({
    param: z.string().min(3),
  });

  let req: Partial<Request>;
  let res: {
    status: sinon.SinonStub;
    json: sinon.SinonStub;
  };
  let next: sinon.SinonSpy;

  beforeEach(() => {
    req = { query: {}, t: (key: string) => key };
    res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub().returnsThis(),
    };
    next = sinon.spy();
  });

  it('deve chamar next se os parâmetros forem válidos', () => {
    req.params = { param: 'valido' };
    const middleware = validateParams(testSchema);
    middleware(req as Request, res as Response, next);

    expect(next.calledOnce).to.be.equal(true);
  });

  it('deve retornar status 400 se os parâmetros forem inválidos', () => {
    req.params = { param: 'a' };
    const middleware = validateParams(testSchema);
    middleware(req as Request, res as Response, next);

    expect(next.called).to.equal(false);
    expect((res.status as sinon.SinonStub).calledOnceWith(400)).to.equal(true);
  });

  it('deve retornar 400 e mensagem de erro quando ocorre exceção inesperada', () => {
    const schema = {
      parse: () => {
        throw new Error('Erro inesperado');
      },
    } as unknown as ZodType<any>;

    const middleware = validateParams(schema);
    middleware(req as Request, res as Response, next);

    expect((res.status as sinon.SinonStub).calledOnceWith(400)).to.equal(true);
    expect(
      (res.json as sinon.SinonStub).calledOnceWith({
        message: 'Erro inesperado',
      }),
    ).to.equal(true);
    expect(next.notCalled).to.equal(true);
  });
});
