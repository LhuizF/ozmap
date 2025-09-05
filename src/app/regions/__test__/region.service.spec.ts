import 'mocha';
import { expect } from 'chai';
import { RegionService } from '@/app/regions/region.service';
import { IRegionRepository } from '@/domain/region/interfaces/IRegionRepository';
import { RegionEntity } from '@/domain/region/region.entity';
import { CreateRegionDto } from '@/app/regions/dtos/createRegion.dto';
import { NotFoundError } from '@/core/errors/http.errors';
import { UpdateRegionDto } from '../dtos/updateRegion.dto';

const mockRegionRepository: IRegionRepository = {
  create: async () => null,
  list: async () => [],
  count: async () => 0,
  findById: async () => null,
  update: async () => null,
  delete: async () => true,
  findByPoint: async () => ({
    regions: [],
    total: 0,
  }),
  findByDistance: async () => ({ regions: [], total: 0 }),
};

describe('RegionService', () => {
  let regionService: RegionService;

  const mockRegion = new RegionEntity(
    'test-id',
    'Test Region',
    { type: 'Polygon', coordinates: [] },
    new Date(),
    new Date(),
  );

  beforeEach(() => {
    mockRegionRepository.create = async () => null;
    mockRegionRepository.findById = async () => null;

    regionService = new RegionService(mockRegionRepository);
  });

  it('deve ser criado', () => {
    expect(regionService).to.be.instanceOf(RegionService);
  });

  describe('createRegion', () => {
    it('deve criar uma região com sucesso', async () => {
      const createDto: CreateRegionDto = {
        name: 'new region',
        geometry: {
          type: 'Polygon',
          coordinates: [
            [
              [-43.1, -22.9],
              [-43.2, -22.9],
            ],
          ],
        },
      };

      const expectedRegion = new RegionEntity(
        'id',
        createDto.name,
        createDto.geometry,
        new Date(),
        new Date(),
      );

      mockRegionRepository.create = async () => expectedRegion;

      const result = await regionService.createRegion(createDto);

      expect(result).to.deep.equal(expectedRegion);
    });
  });

  describe('listRegions', () => {
    it('deve retornar uma lista paginada de regiões', async () => {
      const page = 1;
      const pageSize = 10;
      const total = 1;
      const regions = [mockRegion];

      mockRegionRepository.list = async () => regions;
      mockRegionRepository.count = async () => total;

      const result = await regionService.listRegions(page, pageSize);

      expect(result).to.deep.equal({
        data: regions,
        total,
        page,
        pageSize,
        totalPages: 1,
      });
    });
  });

  describe('getRegionById', () => {
    it('deve retornar uma região quando um id válido for fornecido', async () => {
      mockRegionRepository.findById = async () => mockRegion;

      const result = await regionService.getRegionById('test-id');

      expect(result).to.deep.equal(mockRegion);
    });

    it('deve lançar NotFoundError quando uma região não for encontrada', async () => {
      mockRegionRepository.findById = async () => null;

      try {
        await regionService.getRegionById('invalid-id');
        expect.fail('Deveria ter lançado NotFoundError');
      } catch (error) {
        expect(error).to.be.instanceOf(NotFoundError);
        expect(error.message).to.equal('errors.regionNotFound');
      }
    });
  });

  describe('updateRegion', () => {
    it('deve atualizar uma região com sucesso', async () => {
      const updateDto: UpdateRegionDto = { name: 'Updated Region' };
      const updatedRegion = { ...mockRegion, ...updateDto };
      mockRegionRepository.findById = async () => mockRegion;
      mockRegionRepository.update = async () => updatedRegion;

      const result = await regionService.updateRegion('test-id', updateDto);

      expect(result).to.deep.equal(updatedRegion);
    });

    it('deve lançar NotFoundError ao tentar atualizar uma região que não existe', async () => {
      const updateDto: UpdateRegionDto = { name: 'Updated Region' };
      mockRegionRepository.findById = async () => null;

      try {
        await regionService.updateRegion('invalid-id', updateDto);
        expect.fail('Deveria ter lançado NotFoundError');
      } catch (error) {
        expect(error).to.be.instanceOf(NotFoundError);
        expect(error.message).to.equal('errors.regionNotFound');
      }
    });
  });

  describe('deleteRegion', () => {
    it('deve deletar uma região com sucesso', async () => {
      mockRegionRepository.findById = async () => mockRegion;
      mockRegionRepository.delete = async () => true;

      await regionService.deleteRegion('test-id');
    });

    it('deve lançar NotFoundError ao tentar deletar uma região que não existe', async () => {
      mockRegionRepository.findById = async () => null;

      try {
        await regionService.deleteRegion('invalid-id');
        expect.fail('Deveria ter lançado NotFoundError');
      } catch (error) {
        expect(error).to.be.instanceOf(NotFoundError);
        expect(error.message).to.equal('errors.regionNotFound');
      }
    });
  });
});
