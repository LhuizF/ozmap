import { IRegionRepository } from '@/domain/region/interfaces/IRegionRepository';
import { CreateRegionDto } from './dtos/createRegion.dto';
import { IRegionService } from './interfaces/IRegionService';
import { RegionEntity } from '@/domain/region/region.entity';
import { PaginatedResponse } from '../../core/utils/pagination';
import { NotFoundError } from '../../core/errors/http.errors';

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

  async listRegions(
    page: number,
    pageSize: number,
  ): Promise<PaginatedResponse<RegionEntity>> {
    const [regions, total] = await Promise.all([
      this.regionRepository.list(page, pageSize),
      this.regionRepository.count(),
    ]);

    return {
      data: regions,
      total,
      page,
      pageSize,
      totalPages: Math.ceil(total / pageSize),
    };
  }

  async getRegionById(id: string): Promise<RegionEntity> {
    const region = await this.regionRepository.findById(id);

    if (!region) {
      throw new NotFoundError('Região não encontrada');
    }

    return region;
  }
}
