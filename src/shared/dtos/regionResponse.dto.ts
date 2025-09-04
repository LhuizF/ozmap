import { z } from '@/core/config/zod.config';

export const regionResponseSchema = z.object({
  id: z.string().openapi({ description: 'Identificador único da região' }),
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
  createdAt: z.date().openapi({ description: 'Data de criação da região' }),
  updatedAt: z
    .date()
    .openapi({ description: 'Data da última atualização da região' }),
});

export type regionResponseDto = z.infer<typeof regionResponseSchema>;
