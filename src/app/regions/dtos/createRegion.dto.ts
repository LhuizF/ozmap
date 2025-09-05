import { z } from '@/core/config/zod.config';

export const createRegionSchema = z.object({
  name: z
    .string('Nome é obrigatório')
    .min(3, 'Nome deve ter pelo menos 3 caracteres')
    .max(100, 'Nome deve ter no máximo 100 caracteres')
    .openapi({ description: 'Nome da região' }),
  geometry: z.object({
    type: z
      .literal('Polygon', 'Tipo de geometria inválido, deve ser Polygon')
      .openapi({ description: 'Tipo de geometria, sempre Polygon' }),
    coordinates: z
      .array(
        z.array(
          z
            .tuple([
              z
                .number()
                .min(-180, 'Longitude deve ser maior ou igual a -180')
                .max(180, 'Longitude deve ser menor ou igual a 180')
                .openapi({ description: 'Longitude da localização' }),
              z
                .number()
                .min(-90, 'Latitude deve ser maior ou igual a -90')
                .max(90, 'Latitude deve ser menor ou igual a 90')
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
