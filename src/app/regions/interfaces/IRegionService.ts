import { RegionEntity } from '@/domain/region/region.entity';
import { CreateRegionDto } from '../dtos/createRegion.dto';
import { PaginatedResponse } from '@/core/utils/pagination';
import { UpdateRegionDto } from '../dtos/updateRegion.dto';

export interface IRegionService {
  createRegion(createRegionDto: CreateRegionDto): Promise<RegionEntity>;
  listRegions(
    page: number,
    pageSize: number,
  ): Promise<PaginatedResponse<RegionEntity>>;
  getRegionById(id: string): Promise<RegionEntity>;
  updateRegion(
    id: string,
    updateRegionDto: UpdateRegionDto,
  ): Promise<RegionEntity>;
}
