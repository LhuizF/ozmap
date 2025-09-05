import 'mocha';
import sinon from 'sinon';
import { expect } from 'chai';
import { Request, Response } from 'express';
import { z, ZodType } from 'zod';
import { validateQuery } from '@/core/middlewares/validateQuery';

describe('validateQuery Middleware', () => {
  const schema1 = z.object({ search: z.string() });
  const schema2 = z.object({ name: z.string().max(5) });

  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: sinon.SinonSpy;

  beforeEach(() => {
    req = { query: {} };
    res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub().returnsThis(),
    };
    next = sinon.spy();
  });

  it('deve chamar next se a query for válida', () => {
    req.query = { search: 'teste', name: 'John' };
    const middleware = validateQuery(schema1);
    middleware(req as Request, res as Response, next);

    expect(next.calledOnce).to.be.equal(true);
  });

  it('deve mesclar e converter os dados de todas as queries', () => {
    req.query = { search: 'teste', name: 'John' };
    const middleware = validateQuery(schema1, schema2);
    middleware(req as Request, res as Response, next);

    expect(req.query).to.deep.equal({ search: 'teste', name: 'John' });
  });

  it('deve retornar status 400 se a query for inválida', () => {
    req.query = { search: 'teste', name: 'fake-name' };
    const middleware = validateQuery(schema1, schema2);
    middleware(req as Request, res as Response, next);

    expect(next.called).to.equal(false);
    expect((res.status as sinon.SinonStub).calledOnceWith(400)).to.equal(true);
  });

  it('deve retornar status 400 se a query estiver vazia', () => {
    req.query = {};
    const middleware = validateQuery(schema1, schema2);
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

    const middleware = validateQuery(schema);
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
