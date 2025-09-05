import { RegionEntity } from '@/domain/region/region.entity';
import { PaginatedResponseDto } from '@/shared/dtos/pagination.dto';

export interface Point {
  long: number;
  lat: number;
}

export interface IRegionSearchService {
  listRegionsByPoint(
    point: Point,
    page: number,
    pageSize: number,
  ): Promise<PaginatedResponseDto<RegionEntity>>;
  // listRegionsByDistance(
  //   lat: number,
  //   long: number,
  //   distance: number,
  // ): Promise<PaginatedResponseDto<RegionEntity[]>>;
  // listRegionsByAddress(
  //   address: string,
  // ): Promise<PaginatedResponseDto<RegionEntity[]>>;
}
