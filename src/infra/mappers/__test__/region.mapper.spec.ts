import 'mocha';
import { expect } from 'chai';
import { RegionMapper } from '@/infra/mappers/region.mapper';
import { IRegionDocument } from '@/infra/schemas/region.schema';
import { RegionEntity } from '@/domain/region/region.entity';

describe('RegionMapper', () => {
  it('deve mapear corretamente um IRegionDocument para uma RegionEntity', () => {
    const mockDocument: IRegionDocument = {
      id: '651b34e4f2095854653632f7',
      name: 'Região Mapeada',
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [-43.1, -22.9],
            [-43.2, -22.9],
            [-43.1, -22.9],
          ],
        ],
      },
      createdAt: new Date('2023-01-01T00:00:00.000Z'),
      updatedAt: new Date('2023-01-02T00:00:00.000Z'),
    } as IRegionDocument;

    const result = RegionMapper.toEntity(mockDocument);

    expect(result).to.be.instanceOf(RegionEntity);

    expect(result.id).to.equal(mockDocument.id);
    expect(result.name).to.equal(mockDocument.name);
    expect(result.geometry).to.deep.equal(mockDocument.geometry);
    expect(result.createdAt).to.equal(mockDocument.createdAt);
    expect(result.updatedAt).to.equal(mockDocument.updatedAt);
  });
});
