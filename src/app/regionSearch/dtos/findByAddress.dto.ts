import { z } from '@/core/config/zod.config';

export const findByAddressSchema = z.object({
  address: z
    .string()
    .min(10, 'Endereço muito curto')
    .describe('Endereço a ser pesquisado'),
});
