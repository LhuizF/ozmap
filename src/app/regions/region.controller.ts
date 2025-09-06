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

  async listRegions(req: Request, res: Response) {
    const response = await this.regionService.listRegions(
      Number(req.query.page),
      Number(req.query.pageSize),
    );
    return res.status(200).json(response);
  }

  async getRegionById(req: Request, res: Response) {
    const { id } = req.params;
    console.log(id);
    const region = await this.regionService.getRegionById(id);
    return res.status(200).json(region);
  }

  async updateRegion(req: Request, res: Response) {
    const { id } = req.params;
    const updateRegionDto = req.body;

    const updatedRegion = await this.regionService.updateRegion(
      id,
      updateRegionDto,
    );
    return res.status(200).json(updatedRegion);
  }

  async deleteRegion(req: Request, res: Response) {
    const { id } = req.params;
    await this.regionService.deleteRegion(id);

    const message = req.t('success.region.deleteMessage');
    return res.status(204).json({ message });
  }
}
