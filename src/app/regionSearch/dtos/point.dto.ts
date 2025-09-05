import { z } from '@/core/config/zod.config';

export const pointSchema = z.object({
  longitude: z.coerce
    .number()
    .min(-180, 'validation.coordinates.longitudeMin')
    .max(180, 'validation.coordinates.longitudeMax')
    .describe('description.longitude'),
  latitude: z.coerce
    .number()
    .min(-90, 'validation.coordinates.latitudeMin')
    .max(90, 'validation.coordinates.latitudeMax')
    .describe('description.latitude'),
});

export type PointDto = z.infer<typeof pointSchema>;
