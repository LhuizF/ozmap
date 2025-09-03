import {
  CreateRegionPayload,
  IRegionRepository,
} from '@/domain/region/interfaces/IRegionRepository';
import { RegionEntity } from '@/domain/region/region.entity';
import { RegionModel } from '../schemas/region.schema';

export class RegionRepository implements IRegionRepository {
  async create(payload: CreateRegionPayload): Promise<RegionEntity> {
    console.log(payload.geometry.coordinates);
    const regionDoc = new RegionModel({
      name: payload.name,
      geometry: {
        type: payload.geometry.type,
        coordinates: payload.geometry.coordinates,
      },
    });
    const saved = await regionDoc.save();

    return new RegionEntity(
      saved._id.toString(),
      saved.name,
      saved.geometry.coordinates,
    );
  }
}
