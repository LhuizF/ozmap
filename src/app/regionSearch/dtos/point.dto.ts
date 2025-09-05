import { z } from '@/core/config/zod.config';

export const pointSchema = z.object({
  longitude: z.coerce
    .number()
    .min(-180, 'Longitude deve ser maior ou igual a -180')
    .max(180, 'Longitude deve ser menor ou igual a 180')
    .describe('Longitude'),
  latitude: z.coerce
    .number()
    .min(-90, 'Latitude deve ser maior ou igual a -90')
    .max(90, 'Latitude deve ser menor ou igual a 90')
    .describe('Latitude'),
});

export type PointDto = z.infer<typeof pointSchema>;
