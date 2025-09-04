import {
  CreateRegionPayload,
  IRegionRepository,
  UpdateRegionPayload,
} from '@/domain/region/interfaces/IRegionRepository';
import { RegionEntity } from '@/domain/region/region.entity';
import { RegionModel } from '../schemas/region.schema';
import { RegionMapper } from '../mappers/region.mapper';

export class RegionRepository implements IRegionRepository {
  async create(payload: CreateRegionPayload): Promise<RegionEntity> {
    const regionDoc = new RegionModel({
      name: payload.name,
      geometry: {
        type: payload.geometry.type,
        coordinates: payload.geometry.coordinates,
      },
    });

    const saved = await regionDoc.save();

    return RegionMapper.toEntity(saved);
  }

  async list(page: number, pageSize: number): Promise<RegionEntity[]> {
    const regions = await RegionModel.find()
      .skip((page - 1) * pageSize)
      .limit(pageSize);

    return regions.map(RegionMapper.toEntity);
  }

  async count(): Promise<number> {
    return RegionModel.countDocuments();
  }

  async findById(id: string): Promise<RegionEntity | null> {
    const region = await RegionModel.findById(id);

    if (!region) return null;

    return RegionMapper.toEntity(region);
  }

  async update(
    id: string,
    payload: UpdateRegionPayload,
  ): Promise<RegionEntity | null> {
    const updatedRegion = await RegionModel.findByIdAndUpdate(id, payload, {
      new: true,
      upsert: false,
    });

    if (!updatedRegion) return null;

    return RegionMapper.toEntity(updatedRegion);
  }

  async delete(id: string): Promise<boolean> {
    const result = await RegionModel.findByIdAndDelete(id);
    return result !== null;
  }
}
