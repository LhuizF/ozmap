import 'mocha';
import { expect } from 'chai';
import sinon from 'sinon';
import { Request, Response } from 'express';
import { z, ZodType } from 'zod';
import { validateBody } from '@/core/middlewares/validateBody';

describe('validateBody Middleware', () => {
  const testSchema = z.object({
    name: z.string().min(3, 'error message'),
  });

  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: sinon.SinonSpy;

  beforeEach(() => {
    req = { body: {}, t: (key: string) => key };
    res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub().returnsThis(),
    };
    next = sinon.spy();
  });

  it('deve chamar next se o body for válido', () => {
    req.body = { name: 'Nome Válido' };
    const middleware = validateBody(testSchema);

    middleware(req as Request, res as Response, next);

    expect(next.calledOnce).to.be.equal(true);
  });

  it('deve retornar status 400 se o body for inválido', () => {
    req.body = { name: 'ab' };
    const middleware = validateBody(testSchema);

    middleware(req as Request, res as Response, next);

    expect(next.called).to.be.equal(false);
    expect((res.status as sinon.SinonStub).calledOnceWith(400)).to.equal(true);
    expect(
      (res.json as sinon.SinonStub).calledOnceWith({
        errors: [{ field: 'name', message: 'error message' }],
      }),
    ).to.equal(true);
  });

  it('deve retornar 400 e mensagem de erro quando ocorre exceção inesperada', () => {
    const schema = {
      parse: () => {
        throw new Error('Erro inesperado');
      },
    } as unknown as ZodType<any>;

    const middleware = validateBody(schema);
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
