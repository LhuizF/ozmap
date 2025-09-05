import { z } from '@/core/config/zod.config';
import { pointSchema } from './point.dto';

export const findByDistanceSchema = pointSchema.extend({
  distance: z.coerce
    .number('validation.distance')
    .min(0, 'validation.distanceMin')
    .describe('description.distance'),
});
