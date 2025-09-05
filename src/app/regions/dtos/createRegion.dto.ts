import { z } from '@/core/config/zod.config';

export const createRegionSchema = z.object({
  name: z
    .string('validation.nameRequired')
    .min(3, 'validation.nameMin')
    .max(100, 'validation.nameMax')
    .openapi({ description: 'description.nameRegion' }),
  geometry: z.object({
    type: z
      .literal('Polygon', 'validation.geometryType')
      .openapi({ description: 'description.geometryType' }),
    coordinates: z
      .array(
        z.array(
          z
            .tuple([
              z
                .number()
                .min(-180, 'validation.coordinates.longitudeMin')
                .max(180, 'validation.coordinates.longitudeMax')
                .openapi({ description: 'description.longitude' }),
              z
                .number()
                .min(-90, 'validation.coordinates.latitudeMin')
                .max(90, 'validation.coordinates.latitudeMax')
                .openapi({ description: 'description.latitude' }),
            ])
            .transform((arr) => arr as [number, number]),
        ),
      )
      .nonempty()
      .openapi({
        description: 'description.coordinates',
      }),
  }),
});

export type CreateRegionDto = z.infer<typeof createRegionSchema>;
