import { z } from '@/core/config/zod.config';

export const createRegionSchema = z.object({
  name: z
    .string('validation.nameRequired')
    .min(3, 'validation.nameMin')
    .max(100, 'validation.nameMax')
    .openapi({ description: 'Nome da região' }),
  geometry: z.object({
    type: z
      .literal('Polygon', 'validation.geometryType')
      .openapi({ description: 'Tipo da geometria, deve ser "Polygon"' }),
    coordinates: z
      .array(
        z.array(
          z
            .tuple([
              z
                .number()
                .min(-180, 'validation.coordinates.longitudeMin')
                .max(180, 'validation.coordinates.longitudeMax')
                .openapi({ description: 'Longitude' }),
              z
                .number()
                .min(-90, 'validation.coordinates.latitudeMin')
                .max(90, 'validation.coordinates.latitudeMax')
                .openapi({ description: 'Latitude' }),
            ])
            .transform((arr) => arr as [number, number]),
        ),
      )
      .nonempty()
      .openapi({
        description: 'Coordenadas do polígono em GeoJSON',
      }),
  }),
});

export type CreateRegionDto = z.infer<typeof createRegionSchema>;
