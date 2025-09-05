import { z } from '@/core/config/zod.config';
import { pointSchema } from './point.dto';

export const findByDistanceSchema = pointSchema.extend({
  distance: z.coerce.number().min(0).describe('Distance em metros'),
});
