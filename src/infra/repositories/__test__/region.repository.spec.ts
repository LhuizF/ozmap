import 'mocha';
import { expect } from 'chai';
import sinon from 'sinon';
import { RegionRepository } from '@/infra/repositories/region.repository';
import { RegionModel } from '@/infra/schemas/region.schema';
import { RegionMapper } from '@/infra/mappers/region.mapper';
import { RegionEntity } from '@/domain/region/region.entity';
import { CreateRegionPayload } from '@/domain/region/interfaces/IRegionRepository';

describe('RegionRepository', () => {
  let regionRepository: RegionRepository;

  const mockRegionDocument = {
    id: 'doc-id',
    name: 'Test Document',
    geometry: { type: 'Polygon', coordinates: [] },
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockRegionEntity = new RegionEntity(
    'entity-id',
    'Test Entity',
    { type: 'Polygon', coordinates: [] },
    new Date(),
    new Date(),
  );

  beforeEach(() => {
    regionRepository = new RegionRepository();

    sinon.stub(RegionMapper, 'toEntity').returns(mockRegionEntity);
  });

  afterEach(() => {
    sinon.restore();
  });

  describe('create', () => {
    it('deve salvar e mapear uma nova região', async () => {
      const saveStub = sinon
        .stub(RegionModel.prototype, 'save')
        .resolves(mockRegionDocument);

      const payload: CreateRegionPayload = {
        name: 'New Region',
        geometry: {
          type: 'Polygon',
          coordinates: [
            [
              [-43, -22],
              [-43, -21],
              [-42, -21],
              [-43, -22],
            ],
          ],
        },
      };

      const result = await regionRepository.create(payload);

      expect(saveStub.calledOnce).to.equal(true);
      expect(result).to.deep.equal(mockRegionEntity);
    });
  });

  describe('list', () => {
    it('deve chamar find, skip e limit com os parâmetros corretos', async () => {
      const findStub = sinon.stub(RegionModel, 'find').returns({
        skip: sinon.stub().returnsThis(),
        limit: sinon.stub().resolves([mockRegionDocument]),
      } as any);

      const result = await regionRepository.list(2, 10);

      expect(findStub.calledOnce).to.equal(true);
      const skipStub = findStub.firstCall.returnValue.skip;
      const limitStub = skipStub.firstCall.returnValue.limit;

      expect(skipStub.calledWith(10)).to.equal(true);
      expect(limitStub.calledWith(10)).to.equal(true);
      expect(result).to.be.an('array').with.lengthOf(1);
      expect(result[0]).to.deep.equal(mockRegionEntity);
    });
  });

  describe('count', () => {
    it('deve retornar o número de documentos', async () => {
      sinon.stub(RegionModel, 'countDocuments').resolves(5);

      const result = await regionRepository.count();

      expect(result).to.equal(5);
    });
  });

  describe('findById', () => {
    it('deve retornar uma entidade se a região for encontrada', async () => {
      sinon.stub(RegionModel, 'findById').resolves(mockRegionDocument);

      const result = await regionRepository.findById('some-id');

      expect(result).to.deep.equal(mockRegionEntity);
    });

    it('deve retornar null se a região não for encontrada', async () => {
      sinon.stub(RegionModel, 'findById').resolves(null);

      const result = await regionRepository.findById('not-found-id');

      expect(result).to.equal(null);
    });
  });

  describe('update', () => {
    it('deve atualizar e retornar a entidade atualizada', async () => {
      const updateStub = sinon
        .stub(RegionModel, 'findByIdAndUpdate')
        .resolves(mockRegionDocument);

      const payload = { name: 'Updated Name' };

      const result = await regionRepository.update('some-id', payload);

      expect(
        updateStub.calledOnceWith('some-id', payload, {
          new: true,
          upsert: false,
        }),
      ).to.equal(true);
      expect(result).to.deep.equal(mockRegionEntity);
    });

    it('deve retornar null se a região para atualizar não for encontrada', async () => {
      sinon.stub(RegionModel, 'findByIdAndUpdate').resolves(null);

      const payload = { name: 'Updated Name' };

      const result = await regionRepository.update('not-found-id', payload);

      expect(result).to.equal(null);
    });
  });

  describe('delete', () => {
    it('deve retornar true se a deleção for bem-sucedida', async () => {
      sinon.stub(RegionModel, 'findByIdAndDelete').resolves(mockRegionDocument);
      const result = await regionRepository.delete('some-id');
      expect(result).to.equal(true);
    });

    it('deve retornar false se o documento não existir para deletar', async () => {
      sinon.stub(RegionModel, 'findByIdAndDelete').resolves(null);
      const result = await regionRepository.delete('not-found-id');
      expect(result).to.equal(false);
    });
  });

  describe('findByPoint', () => {
    it('deve chamar find com a query geoIntersects correta', async () => {
      const findStub = sinon.stub(RegionModel, 'find').returns({
        skip: sinon.stub().returnsThis(),
        limit: sinon.stub().resolves([]),
      } as any);
      sinon.stub(RegionModel, 'countDocuments').resolves(0);

      await regionRepository.findByPoint(-43, -22, 1, 10);

      const expectedQuery = {
        geometry: {
          $geoIntersects: {
            $geometry: { type: 'Point', coordinates: [-43, -22] },
          },
        },
      };
      expect(findStub.calledWith(expectedQuery)).to.equal(true);
    });
  });

  describe('findByDistance', () => {
    it('deve chamar find com a query geoWithin e centerSphere correta', async () => {
      const findStub = sinon.stub(RegionModel, 'find').returns({
        skip: sinon.stub().returnsThis(),
        limit: sinon.stub().resolves([]),
      } as any);
      sinon.stub(RegionModel, 'countDocuments').resolves(0);

      await regionRepository.findByDistance(-43, -22, 0.5, 1, 10);

      const expectedQuery = {
        geometry: {
          $geoWithin: {
            $centerSphere: [[-43, -22], 0.5],
          },
        },
      };
      expect(findStub.calledWith(expectedQuery)).to.equal(true);
    });
  });
});
