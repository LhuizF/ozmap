import { IRegionRepository } from '../../domain/region/interfaces/IRegionRepository';
import { RegionEntity } from '../../domain/region/region.entity';
import { IRegionSearchService, Point } from './interfaces/IRegionSearchService';
import { PaginatedResponseDto } from '@/shared/dtos/pagination.dto';

export class RegionSearchService implements IRegionSearchService {
  constructor(private readonly regionRepository: IRegionRepository) {}
  async listRegionsByPoint(
    point: Point,
    page: number,
    pageSize: number,
  ): Promise<PaginatedResponseDto<RegionEntity>> {
    const { longitude, latitude } = point;
    const { regions, total } = await this.regionRepository.findByPoint(
      longitude,
      latitude,
      page,
      pageSize,
    );

    return {
      data: regions,
      total,
      page,
      pageSize,
      totalPages: Math.ceil(total / pageSize),
    };
  }
}
