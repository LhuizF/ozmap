import type { Express } from 'express';
import { RegionController } from './region.controller';
import { RegionService } from '@/app/regions/region.service';
import { RegionRepository } from '@/infra/repositories/region.repository';
import { validateBody } from '@/core/middlewares/validateBody';
import { createRegionSchema } from './dtos/createRegion.dto';
import { paginationSchema } from '@/shared/dtos/pagination.dto';
import { validateQuery } from '@/core/middlewares/validateQuery';
import { idParamsSchema } from '@/shared/dtos/idParams.dto';
import { validateParams } from '@/core/middlewares/validateParams';
import { updateRegionSchema } from './dtos/updateRegion.dto';
import { registerRegionDocs } from './region.docs';

function buildRegionModule() {
  const regionRepository = new RegionRepository();
  const regionService = new RegionService(regionRepository);
  const regionController = new RegionController(regionService);

  registerRegionDocs();

  return regionController;
}

export function setupRegionRoutes(app: Express) {
  const controller = buildRegionModule();
  app.post(
    '/regions',
    validateBody(createRegionSchema),
    controller.createRegion.bind(controller),
  );

  app.get(
    '/regions',
    validateQuery(paginationSchema),
    controller.listRegions.bind(controller),
  );

  app.get(
    '/regions/:id',
    validateParams(idParamsSchema),
    controller.getRegionById.bind(controller),
  );

  app.put(
    '/regions/:id',
    validateParams(idParamsSchema),
    validateBody(updateRegionSchema),
    controller.updateRegion.bind(controller),
  );

  app.delete(
    '/regions/:id',
    validateParams(idParamsSchema),
    controller.deleteRegion.bind(controller),
  );
}
