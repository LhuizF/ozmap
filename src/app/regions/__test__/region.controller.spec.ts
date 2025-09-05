import 'mocha';
import { expect } from 'chai';
import { Request, Response } from 'express';
import { RegionController } from '@/app/regions/region.controller';
import { IRegionService } from '@/app/regions/interfaces/IRegionService';
import { RegionEntity } from '@/domain/region/region.entity';

const mockRegionService: IRegionService = {
  createRegion: async () => null,
  listRegions: async () => ({
    data: [],
    total: 0,
    page: 1,
    pageSize: 10,
    totalPages: 0,
  }),
  getRegionById: async () => null,
  updateRegion: async () => null,
  deleteRegion: async () => {},
};

describe('RegionController', () => {
  let regionController: RegionController;
  let req: Partial<Request>;

  let res: Partial<Response>;
  let capturedStatus: number = 0;
  let capturedJson: any = null;

  const testRegion = new RegionEntity(
    'test-id',
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

    req = {};

    regionController = new RegionController(mockRegionService);
  });

  describe('createRegion', () => {
    it('deve criar uma região e retornar status 201', async () => {
      req.body = {
        name: 'New Region',
        geometry: { type: 'Polygon', coordinates: [] },
      };
      mockRegionService.createRegion = async () => testRegion;

      await regionController.createRegion(req as Request, res as Response);

      expect(capturedStatus).to.equal(201);
      expect(capturedJson).to.deep.equal(testRegion);
    });
  });

  describe('listRegions', () => {
    it('deve listar regiões e retornar status 200', async () => {
      req.query = { page: '1', pageSize: '10' };
      const paginatedResponse = {
        data: [testRegion],
        total: 1,
        page: 1,
        pageSize: 10,
        totalPages: 1,
      };
      mockRegionService.listRegions = async () => paginatedResponse;

      await regionController.listRegions(req as Request, res as Response);

      expect(capturedStatus).to.equal(200);
      expect(capturedJson).to.deep.equal(paginatedResponse);
    });
  });

  describe('getRegionById', () => {
    it('deve retornar uma região por id e status 200', async () => {
      req.params = { id: 'test-id' };
      mockRegionService.getRegionById = async () => testRegion;

      await regionController.getRegionById(req as Request, res as Response);

      expect(capturedStatus).to.equal(200);
      expect(capturedJson).to.deep.equal(testRegion);
    });
  });

  describe('updateRegion', () => {
    it('deve atualizar uma região e retornar status 200', async () => {
      req.params = { id: 'test-id' };
      req.body = { name: 'Updated Name' };
      const updatedRegion = { ...testRegion, name: 'Updated Name' };
      mockRegionService.updateRegion = async () => updatedRegion;

      await regionController.updateRegion(req as Request, res as Response);

      expect(capturedStatus).to.equal(200);
      expect(capturedJson).to.deep.equal(updatedRegion);
    });
  });

  describe('deleteRegion', () => {
    it('deve deletar uma região e retornar status 204', async () => {
      req.params = { id: 'test-id' };
      mockRegionService.deleteRegion = async () => {};

      await regionController.deleteRegion(req as Request, res as Response);

      expect(capturedStatus).to.equal(204);
      expect(capturedJson).to.deep.equal({
        message: 'Região deletada com sucesso!',
      });
    });
  });
});
