import { z } from '@/core/config/zod.config';

export const createRegionSchema = z.object({
  name: z.string().min(3).max(100).openapi({ description: 'Nome da região' }),
  geometry: z.object({
    type: z
      .literal('Polygon')
      .openapi({ description: 'Tipo de geometria, sempre Polygon' }),
    coordinates: z
      .array(
        z.array(
          z
            .tuple([
              z
                .number()
                .min(-180)
                .max(180)
                .openapi({ description: 'Longitude da localização' }),
              z
                .number()
                .min(-90)
                .max(90)
                .openapi({ description: 'Latitude da localização' }),
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
