import { RegionEntity } from '@/domain/region/region.entity';
import { CreateRegionDto } from '../dtos/createRegion.dto';

export interface IRegionService {
  createRegion(createRegionDto: CreateRegionDto): Promise<RegionEntity>;
}
