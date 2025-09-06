import 'mocha';
import { expect } from 'chai';
import sinon from 'sinon';
import express from 'express';
import { setupRegionRoutes } from '@/app/regions/region.module';

describe('RegionModule', () => {
  let app: express.Express;
  let getSpy: sinon.SinonSpy;
  let postSpy: sinon.SinonSpy;
  let putSpy: sinon.SinonSpy;
  let deleteSpy: sinon.SinonSpy;

  beforeEach(() => {
    app = express();
    getSpy = sinon.spy(app, 'get');
    postSpy = sinon.spy(app, 'post');
    putSpy = sinon.spy(app, 'put');
    deleteSpy = sinon.spy(app, 'delete');
  });

  afterEach(() => {
    sinon.restore();
  });

  it('deve configurar rota POST /regions corretamente', () => {
    setupRegionRoutes(app);

    expect(postSpy.calledOnce).to.equal(true);
    const postCall = postSpy.getCall(0);
    expect(postCall.args[0]).to.equal('/regions');
    expect(postCall.args[1]).to.be.a('function');
    expect(postCall.args[2]).to.be.a('function');
  });

  it('deve configurar a rota GET /regions corretamente', () => {
    setupRegionRoutes(app);

    const listGetCall = getSpy
      .getCalls()
      .find((call) => call.args[0] === '/regions');

    expect(listGetCall).to.not.be.equal(undefined);
    expect(listGetCall.args[1]).to.be.a('function');
    expect(listGetCall.args[2]).to.be.a('function');
  });

  it('deve configurar a rota GET /regions/:id corretamente', () => {
    setupRegionRoutes(app);

    const byIdGetCall = getSpy
      .getCalls()
      .find((call) => call.args[0] === '/regions/:id');

    expect(byIdGetCall).to.not.be.equal(undefined);
    expect(byIdGetCall.args[1]).to.be.a('function');
    expect(byIdGetCall.args[2]).to.be.a('function');
  });

  it('deve configurar rota PUT /regions/:id corretamente', () => {
    setupRegionRoutes(app);

    expect(putSpy.calledOnce).to.equal(true);
    const putCall = putSpy.getCall(0);
    expect(putCall.args[0]).to.equal('/regions/:id');
    expect(putCall.args[1]).to.be.a('function');
    expect(putCall.args[2]).to.be.a('function');
    expect(putCall.args[3]).to.be.a('function');
  });

  it('deve configurar rota DELETE /regions/:id corretamente', () => {
    setupRegionRoutes(app);

    expect(deleteSpy.calledOnce).to.equal(true);
    const deleteCall = deleteSpy.getCall(0);
    expect(deleteCall.args[0]).to.equal('/regions/:id');
    expect(deleteCall.args[1]).to.be.a('function');
    expect(deleteCall.args[2]).to.be.a('function');
  });
});
