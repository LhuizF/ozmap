import { z } from '@/core/config/zod.config';

export const idParamsSchema = z.object({
  id: z.string().regex(/^[0-9a-fA-F]{24}$/, 'validation.invalidId'),
});
