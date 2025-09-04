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

  async list(page: number, pageSize: number): Promise<RegionEntity[]> {
    const regions = await RegionModel.find()
      .skip((page - 1) * pageSize)
      .limit(pageSize);

    return regions.map(
      (region) =>
        new RegionEntity(
          region._id.toString(),
          region.name,
          region.geometry.coordinates,
        ),
    );
  }

  async count(): Promise<number> {
    return RegionModel.countDocuments();
  }

  async findById(id: string): Promise<RegionEntity | null> {
    const region = await RegionModel.findById(id);

    if (!region) return null;

    return new RegionEntity(
      region._id.toString(),
      region.name,
      region.geometry.coordinates,
    );
  }
}
