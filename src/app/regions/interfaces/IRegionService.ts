import { RegionEntity } from '@/domain/region/region.entity';
import { CreateRegionDto } from '../dtos/createRegion.dto';
import { PaginatedResponseDto } from '@/shared/dtos/pagination.dto';
import { UpdateRegionDto } from '../dtos/updateRegion.dto';

export interface IRegionService {
  createRegion(createRegionDto: CreateRegionDto): Promise<RegionEntity>;
  listRegions(
    page: number,
    pageSize: number,
  ): Promise<PaginatedResponseDto<RegionEntity>>;
  getRegionById(id: string): Promise<RegionEntity>;
  updateRegion(
    id: string,
    updateRegionDto: UpdateRegionDto,
  ): Promise<RegionEntity>;
  deleteRegion(id: string): Promise<void>;
}
