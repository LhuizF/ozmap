import 'mocha';
import { expect } from 'chai';
import { Request, Response } from 'express';
import { RegionSearchController } from '@/app/regionSearch/regionSearch.controller';
import { IRegionSearchService } from '@/app/regionSearch/interfaces/IRegionSearchService';
import { RegionEntity } from '@/domain/region/region.entity';

const paginatedMock = {
  data: [] as RegionEntity[],
  total: 0,
  page: 1,
  pageSize: 10,
  totalPages: 0,
};

const mockRegionSearchService: IRegionSearchService = {
  listRegionsByPoint: async () => paginatedMock,
  listRegionsByDistance: async () => paginatedMock,
  listRegionsByAddress: async () => paginatedMock,
};

describe('RegionSearchController', () => {
  let regionSearchController: RegionSearchController;
  let req: Partial<Request>;
  let res: Partial<Response>;

  let capturedStatus: number;
  let capturedJson: any;

  const mockRegion = new RegionEntity(
    'id',
    'Test Region',
    { type: 'Polygon', coordinates: [] },
    new Date(),
    new Date(),
  );

  beforeEach(() => {
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

    req = {
      query: {},
      t: (key: string) => key,
    };

    regionSearchController = new RegionSearchController(
      mockRegionSearchService,
    );
  });

  describe('listRegionsByPoint', () => {
    it('deve chamar o serviço e retornar status 200 com os dados corretos', async () => {
      req.query = {
        longitude: '-43.3',
        latitude: '-21.7',
        page: '1',
        pageSize: '10',
      };

      const paginatedResponse = {
        ...paginatedMock,
        data: [mockRegion],
        total: 1,
        totalPages: 1,
      };

      mockRegionSearchService.listRegionsByPoint = async () =>
        paginatedResponse;

      await regionSearchController.listRegionsByPoint(
        req as Request,
        res as Response,
      );

      expect(capturedStatus).to.equal(200);
      expect(capturedJson).to.deep.equal(paginatedResponse);
    });
  });

  describe('listRegionsByDistance', () => {
    it('deve chamar o serviço e retornar status 200 com os dados corretos', async () => {
      req.query = {
        longitude: '-43.3',
        latitude: '-21.7',
        distance: '5000',
        page: '1',
        pageSize: '10',
      };

      const paginatedResponse = {
        ...paginatedMock,
        data: [mockRegion],
        total: 1,
        totalPages: 1,
      };

      mockRegionSearchService.listRegionsByDistance = async () =>
        paginatedResponse;

      await regionSearchController.listRegionsByDistance(
        req as Request,
        res as Response,
      );

      expect(capturedStatus).to.equal(200);
      expect(capturedJson).to.deep.equal(paginatedResponse);
    });
  });

  describe('listRegionsByAddress', () => {
    it('deve chamar o serviço e retornar status 200 com os dados corretos', async () => {
      const address = 'Avenida Rio Branco, 1000';
      req.query = { address, page: '1', pageSize: '10' };
      const paginatedResponse = {
        ...paginatedMock,
        data: [mockRegion],
        total: 1,
        totalPages: 1,
      };

      mockRegionSearchService.listRegionsByAddress = async () =>
        paginatedResponse;

      await regionSearchController.listRegionsByAddress(
        req as Request,
        res as Response,
      );

      expect(capturedStatus).to.equal(200);
      expect(capturedJson).to.deep.equal(paginatedResponse);
    });
  });
});
