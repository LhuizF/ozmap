import { RegionEntity } from '../region.entity';

export interface CreateRegionPayload {
  name: string;
  geometry: {
    type: string;
    coordinates: [number, number][][];
  };
}

export interface IRegionRepository {
  create(payload: CreateRegionPayload): Promise<RegionEntity>;
  list(page: number, pageSize: number): Promise<RegionEntity[]>;
  count(): Promise<number>;
  findById(id: string): Promise<RegionEntity | null>;
}
