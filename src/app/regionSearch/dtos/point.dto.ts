import { z } from '@/core/config/zod.config';

export const pointSchema = z.object({
  longitude: z.coerce.number().min(-180).max(180).describe('Longitude'),
  latitude: z.coerce.number().min(-90).max(90).describe('Latitude'),
});

export type PointDto = z.infer<typeof pointSchema>;
