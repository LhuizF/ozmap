import { IRegionRepository } from '../../domain/region/interfaces/IRegionRepository';
import { RegionEntity } from '../../domain/region/region.entity';
import {
  IRegionSearchService,
  Point,
  PointWithDistance,
} from './interfaces/IRegionSearchService';
import { PaginatedResponseDto } from '@/shared/dtos/pagination.dto';

export class RegionSearchService implements IRegionSearchService {
  private readonly EARTH_RADIUS_IN_METERS = 6371000; //6.371 km
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

  async listRegionsByDistance(
    pointWithDistance: PointWithDistance,
    page: number,
    pageSize: number,
  ): Promise<PaginatedResponseDto<RegionEntity>> {
    const { longitude, latitude, distance } = pointWithDistance;
    const distanceInRadians = distance / this.EARTH_RADIUS_IN_METERS;

    const { regions, total } = await this.regionRepository.findByDistance(
      longitude,
      latitude,
      distanceInRadians,
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
