import 'mocha';
import { expect } from 'chai';
import express from 'express';
import { setupRegionSearchRoutes } from '@/app/regionSearch/regionSearch.module';

process.env.GOOGLE_GEOCODING_API_KEY = 'fake-api-key';

describe('RegionSearchModule', () => {
  let app: express.Express;
  let getCalls: any[][];

  beforeEach(() => {
    app = express();
    getCalls = [];

    app.get = (...args: any[]): express.Express => {
      getCalls.push(args);
      return app;
    };
  });

  it('deve configurar a rota GET /regions/search/by-point corretamente', () => {
    setupRegionSearchRoutes(app);

    const routeCall = getCalls.find(
      (args) => args[0] === '/regions/search/by-point',
    );

    expect(routeCall).to.not.be.equal(undefined);
    expect(routeCall[1]).to.be.a('function');
    expect(routeCall[2]).to.be.a('function');
  });

  it('deve configurar a rota GET /regions/search/by-distance corretamente', () => {
    setupRegionSearchRoutes(app);
    const routeCall = getCalls.find(
      (args) => args[0] === '/regions/search/by-distance',
    );

    expect(routeCall).to.not.be.equal(undefined);
    expect(routeCall[1]).to.be.a('function');
    expect(routeCall[2]).to.be.a('function');
  });

  it('deve configurar a rota GET /regions/search/by-address corretamente', () => {
    setupRegionSearchRoutes(app);
    const routeCall = getCalls.find(
      (args) => args[0] === '/regions/search/by-address',
    );

    expect(routeCall).to.not.be.equal(undefined);
    expect(routeCall[1]).to.be.a('function');
    expect(routeCall[2]).to.be.a('function');
  });
});
