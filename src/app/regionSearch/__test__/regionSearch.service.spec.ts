import 'mocha';
import { expect } from 'chai';
import { RegionSearchService } from '@/app/regionSearch/regionSearch.service';
import { IRegionRepository } from '@/domain/region/interfaces/IRegionRepository';
import { IGeocodingService } from '@/app/regionSearch/interfaces/IGeocodingService';
import { RegionEntity } from '@/domain/region/region.entity';
import { FindAndCountRegionResponse } from '@/domain/region/interfaces/IRegionRepository';

const mockRegionRepository: IRegionRepository = {
  create: async () => null,
  list: async () => [],
  count: async () => 0,
  findById: async () => null,
  update: async () => null,
  delete: async () => false,
  findByPoint: async () => ({ regions: [], total: 0 }),
  findByDistance: async () => ({ regions: [], total: 0 }),
};

const mockGeocodingService: IGeocodingService = {
  getCoordinates: async () => ({ latitude: 0, longitude: 0 }),
};

describe('RegionSearchService', () => {
  let regionSearchService: RegionSearchService;

  const mockRegion = new RegionEntity(
    'id',
    'Test Region',
    { type: 'Polygon', coordinates: [] },
    new Date(),
    new Date(),
  );

  beforeEach(() => {
    mockRegionRepository.findByPoint = async () => ({ regions: [], total: 0 });
    mockRegionRepository.findByDistance = async () => ({
      regions: [],
      total: 0,
    });
    mockGeocodingService.getCoordinates = async () => ({
      latitude: 0,
      longitude: 0,
    });

    regionSearchService = new RegionSearchService(
      mockRegionRepository,
      mockGeocodingService,
    );
  });

  describe('listRegionsByPoint', () => {
    it('deve chamar retornar regions paginados', async () => {
      const point = { longitude: -40, latitude: -20 };
      const page = 1;
      const pageSize = 10;

      const repositoryResponse: FindAndCountRegionResponse = {
        regions: [mockRegion],
        total: 1,
      };

      mockRegionRepository.findByPoint = async () => repositoryResponse;

      const result = await regionSearchService.listRegionsByPoint(
        point,
        page,
        pageSize,
      );

      expect(result).to.deep.equal({
        data: [mockRegion],
        total: 1,
        page,
        pageSize,
        totalPages: 1,
      });
    });
  });

  describe('listRegionsByDistance', () => {
    it('deve chamar o repositório com a distância convertida para radianos', async () => {
      const pointWithDistance = {
        longitude: -40,
        latitude: -20,
        distance: 10,
      };
      const page = 2;
      const pageSize = 10;
      const repositoryResponse: FindAndCountRegionResponse = {
        regions: [mockRegion],
        total: 1,
      };

      mockRegionRepository.findByDistance = async (
        long,
        lat,
        radiusInRadians,
        page,
        pageSize,
      ) => {
        expect(long).to.equal(pointWithDistance.longitude);
        expect(lat).to.equal(pointWithDistance.latitude);
        expect(radiusInRadians).to.be.closeTo(0.0001, 0.0001);
        expect(page).to.equal(page);
        expect(pageSize).to.equal(pageSize);
        return repositoryResponse;
      };

      const result = await regionSearchService.listRegionsByDistance(
        pointWithDistance,
        page,
        pageSize,
      );

      expect(result).to.deep.equal({
        data: repositoryResponse.regions,
        total: repositoryResponse.total,
        page,
        pageSize,
        totalPages: 1,
      });
    });
  });

  describe('listRegionsByAddress', () => {
    it('deve primeiro obter coordenadas e depois chamar o repositório', async () => {
      const address = 'Avenida Rio Branco';
      const page = 1;
      const pageSize = 10;
      const coordinates = { latitude: -20, longitude: -40 };

      const repositoryResponse: FindAndCountRegionResponse = {
        regions: [mockRegion],
        total: 1,
      };

      mockGeocodingService.getCoordinates = async (addr) => {
        expect(addr).to.equal(address);
        return coordinates;
      };

      mockRegionRepository.findByPoint = async (long, lat) => {
        expect(long).to.equal(coordinates.longitude);
        expect(lat).to.equal(coordinates.latitude);
        return repositoryResponse;
      };

      const result = await regionSearchService.listRegionsByAddress(
        address,
        page,
        pageSize,
      );

      expect(result).to.deep.equal({
        data: repositoryResponse.regions,
        total: repositoryResponse.total,
        page,
        pageSize,
        totalPages: 1,
      });
    });

    it('deve repassar erro se geocoding falhar', async () => {
      const address = 'Avenida Rio Branco';
      const page = 1;
      const pageSize = 10;
      const expectedError = new Error('Geocoding failed');

      mockGeocodingService.getCoordinates = async () => {
        throw expectedError;
      };

      try {
        await regionSearchService.listRegionsByAddress(address, page, pageSize);

        expect.fail('A função deveria ter lançado um erro, mas não o fez.');
      } catch (error) {
        expect(error).to.equal(expectedError);
        expect(error.message).to.equal('Geocoding failed');
      }
    });
  });
});
