import { z } from '@/core/config/zod.config';
import { pointSchema } from './point.dto';

export const findByDistanceSchema = pointSchema.extend({
  distance: z.coerce
    .number()
    .min(0, 'A distância deve ser um número positivo')
    .describe('Distance em metros'),
});
