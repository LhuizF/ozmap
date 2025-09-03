import { IRegionRepository } from '@/domain/region/interfaces/IRegionRepository';
import { CreateRegionDto } from './dtos/createRegion.dto';
import { IRegionService } from './interfaces/IRegionService';
import { RegionEntity } from '@/domain/region/region.entity';

export class RegionService implements IRegionService {
  constructor(private readonly regionRepository: IRegionRepository) {}
  createRegion(createRegionDto: CreateRegionDto): Promise<RegionEntity> {
    return this.regionRepository.create({
      name: createRegionDto.name,
      geometry: {
        type: createRegionDto.geometry.type,
        coordinates: createRegionDto.geometry.coordinates,
      },
    });
  }
}
