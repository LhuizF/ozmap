import { Request, Response } from 'express';
import { IRegionSearchService } from './interfaces/IRegionSearchService';

export class RegionSearchController {
  constructor(private readonly regionSearchService: IRegionSearchService) {}

  async listRegionsByPoint(req: Request, res: Response) {
    const { longitude, latitude, page, pageSize } = req.query;
    const response = await this.regionSearchService.listRegionsByPoint(
      { longitude: Number(longitude), latitude: Number(latitude) },
      Number(page),
      Number(pageSize),
    );

    res.status(200).json(response);
  }
  // listRegionsByDistance(req: Request, res: Response) {}
  // listRegionsByAddress(req: Request, res: Response) {}
}
