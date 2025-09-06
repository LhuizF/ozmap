import { z } from '@/core/config/zod.config';

export const regionResponseSchema = z.object({
  id: z.string().openapi({ description: 'description.idRegion' }),
  name: z
    .string()
    .min(3)
    .max(100)
    .openapi({ description: 'description.nameRegion' }),
  geometry: z.object({
    type: z
      .literal('Polygon')
      .openapi({ description: 'description.geometryType' }),
    coordinates: z
      .array(
        z.array(
          z
            .tuple([
              z
                .number()
                .min(-180)
                .max(180)
                .openapi({ description: 'description.longitude' }),
              z
                .number()
                .min(-90)
                .max(90)
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
  createdAt: z.date().openapi({ description: 'description.createdAt' }),
  updatedAt: z.date().openapi({ description: 'description.updatedAt' }),
});

export type regionResponseDto = z.infer<typeof regionResponseSchema>;
