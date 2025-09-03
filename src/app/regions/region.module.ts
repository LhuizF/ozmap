import type { Express } from 'express';
import { RegionController } from './region.controller';
import { RegionService } from '@/app/regions/region.service';
import { RegionRepository } from '@/infra/repositories/region.repository';
import { validateBody } from '@/core/middlewares/validateBody';
import { createRegionSchema } from './dtos/createRegion.dto';
import { registry } from '@/core/config/openapi.config';

function buildRegionModule() {
  const regionRepository = new RegionRepository();
  const regionService = new RegionService(regionRepository);
  const regionController = new RegionController(regionService);

  registry.register('Region', createRegionSchema);

  registry.registerPath({
    method: 'post',
    path: '/regions',
    summary: 'Cria uma nova região',
    tags: ['Regions'],
    request: {
      body: {
        content: {
          'application/json': {
            schema: createRegionSchema,
          },
        },
      },
    },
    responses: {
      201: {
        description: 'Região criada com sucesso',
        content: { 'application/json': { schema: createRegionSchema } },
      },
      400: {
        description: 'Erro de validação nos dados enviados',
      },
    },
  });

  return regionController;
}

export function setupRegionRoutes(app: Express) {
  const controller = buildRegionModule();
  app.post(
    '/regions',
    validateBody(createRegionSchema),
    controller.createRegion.bind(controller),
  );
}
