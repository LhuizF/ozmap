import type { Express } from 'express';
import { RegionRepository } from '@/infra/repositories/region.repository';
import { RegionSearchController } from './regionSearch.controller';
import { RegionSearchService } from './regionSearch.service';
import { validateQuery } from '@/core/middlewares/validateQuery';
import { pointSchema } from './dtos/point.dto';
import { registerRegionSearchDocs } from './regionSearch.docs';
import { paginationSchema } from '@/shared/dtos/pagination.dto';
import { findByDistanceSchema } from './dtos/findByDistance.dto';
import { findByAddressSchema } from './dtos/findByAddress.dto';
import { GeocodingService } from './geocoding.service';

function buildRegionSearchModule() {
  const googleGeocodingApiKey = process.env.GOOGLE_GEOCODING_API_KEY;

  if (!googleGeocodingApiKey) {
    console.error('GOOGLE_GEOCODING_API_KEY not defined in environment');
    process.exit(1);
  }

  const regionRepository = new RegionRepository();
  const geocodingService = new GeocodingService(googleGeocodingApiKey);
  const regionSearchService = new RegionSearchService(
    regionRepository,
    geocodingService,
  );
  const regionSearchController = new RegionSearchController(
    regionSearchService,
  );

  registerRegionSearchDocs();

  return regionSearchController;
}

export function setupRegionSearchRoutes(app: Express) {
  const controller = buildRegionSearchModule();

  app.get(
    '/regions/search/by-point',
    validateQuery(paginationSchema, pointSchema),
    controller.listRegionsByPoint.bind(controller),
  );

  app.get(
    '/regions/search/by-distance',
    validateQuery(paginationSchema, findByDistanceSchema),
    controller.listRegionsByDistance.bind(controller),
  );

  app.get(
    '/regions/search/by-address',
    validateQuery(paginationSchema, findByAddressSchema),
    controller.listRegionsByAddress.bind(controller),
  );
}
