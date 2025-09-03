import { Response, Request } from 'express';
import { IRegionService } from './interfaces/IRegionService';
import { CreateRegionDto } from './dtos/createRegion.dto';

export class RegionController {
  constructor(private readonly regionService: IRegionService) {}
  async createRegion(req: Request, res: Response) {
    const createRegionDto: CreateRegionDto = req.body;

    const region = await this.regionService.createRegion(createRegionDto);

    return res.status(201).json(region);
  }
}
