import { Request, Response } from 'express';
import { IRegionSearchService } from './interfaces/IRegionSearchService';

export class RegionSearchController {
  constructor(private readonly regionSearchService: IRegionSearchService) {}

  async listRegionsByPoint(req: Request, res: Response) {
    const { long, lat, page, pageSize } = req.query;
    const response = await this.regionSearchService.listRegionsByPoint(
      { long: Number(long), lat: Number(lat) },
      Number(page),
      Number(pageSize),
    );

    res.status(200).json(response);
  }
  // listRegionsByDistance(req: Request, res: Response) {}
  // listRegionsByAddress(req: Request, res: Response) {}
}
