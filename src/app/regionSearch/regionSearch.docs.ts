import { registry } from '@/core/config/openapi.config';
import { pointSchema } from './dtos/point.dto';
import { findByDistanceSchema } from './dtos/findByDistance.dto';
import { regionResponseSchema } from '@/shared/dtos/regionResponse.dto';
import { findByAddressSchema } from './dtos/findByAddress.dto';
import { paginatedResponseSchema } from '@/shared/dtos/pagination.dto';

export function registerRegionSearchDocs() {
  registry.registerPath({
    method: 'get',
    path: '/regions/search/by-point',
    summary: 'Busca regiões por um ponto específico',
    request: {
      query: pointSchema,
    },
    tags: ['Region Search'],
    responses: {
      200: {
        description: 'Regiões encontradas',
        content: {
          'application/json': {
            schema: paginatedResponseSchema(regionResponseSchema),
          },
        },
      },
    },
  });

  registry.registerPath({
    method: 'get',
    path: '/regions/search/by-distance',
    summary: 'Busca regiões por distância a partir de um ponto específico',
    request: {
      query: findByDistanceSchema,
    },
    tags: ['Region Search'],
    responses: {
      200: {
        description: 'Regiões encontradas',
        content: {
          'application/json': {
            schema: paginatedResponseSchema(regionResponseSchema),
          },
        },
      },
    },
  });

  registry.registerPath({
    method: 'get',
    path: '/regions/search/by-address',
    summary: 'Busca regiões por um endereço específico',
    request: {
      query: findByAddressSchema,
    },
    tags: ['Region Search'],
    responses: {
      200: {
        description: 'Regiões encontradas',
        content: {
          'application/json': {
            schema: paginatedResponseSchema(regionResponseSchema),
          },
        },
      },
    },
  });
}
