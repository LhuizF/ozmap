import { RegionEntity } from '@/domain/region/region.entity';
import { IRegionDocument } from '../schemas/region.schema';

export class RegionMapper {
  public static toEntity(document: IRegionDocument): RegionEntity {
    const { id, name, geometry, createdAt, updatedAt } = document;

    const regionEntity = new RegionEntity(
      id,
      name,
      geometry,
      createdAt,
      updatedAt,
    );

    return regionEntity;
  }
}
