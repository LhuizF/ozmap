import { z } from '@/core/config/zod.config';
import { createRegionSchema } from './createRegion.dto';

export const updateRegionSchema = createRegionSchema.partial();

export type UpdateRegionDto = z.infer<typeof updateRegionSchema>;
