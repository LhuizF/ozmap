import { registry } from '@/core/config/openapi.config';
import { createRegionSchema } from './dtos/createRegion.dto';
import { paginationSchema } from '@/core/utils/pagination';
import { idParamsSchema } from '@/core/utils/idParams';
import { updateRegionSchema } from './dtos/updateRegion.dto';

export function registerRegionDocs() {
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

  registry.registerPath({
    method: 'get',
    path: '/regions',
    summary: 'Lista todas as regiões',
    request: {
      query: paginationSchema,
    },
    tags: ['Regions'],
    responses: {
      200: {
        description: 'Lista de regiões',
        content: { 'application/json': { schema: createRegionSchema } },
      },
    },
  });

  registry.registerPath({
    method: 'get',
    path: '/regions/{id}',
    summary: 'Obtém uma região pelo id',
    request: {
      params: idParamsSchema,
    },
    tags: ['Regions'],
    responses: {
      200: {
        description: 'Região encontrada',
        content: { 'application/json': { schema: createRegionSchema } },
      },
      404: {
        description: 'Região não encontrada',
      },
    },
  });

  registry.registerPath({
    method: 'put',
    path: '/regions/{id}',
    summary: 'Atualiza uma região pelo id',
    request: {
      params: idParamsSchema,
      body: {
        content: {
          'application/json': {
            schema: updateRegionSchema,
          },
        },
      },
    },
    tags: ['Regions'],
    responses: {
      200: {
        description: 'Região atualizada com sucesso',
        content: { 'application/json': { schema: updateRegionSchema } },
      },
      404: {
        description: 'Região não encontrada',
      },
    },
  });

  registry.registerPath({
    method: 'delete',
    path: '/regions/{id}',
    summary: 'Remove uma região pelo id',
    request: {
      params: idParamsSchema,
    },
    tags: ['Regions'],
    responses: {
      204: {
        description: 'Região removida com sucesso',
      },
      404: {
        description: 'Região não encontrada',
      },
    },
  });
}
