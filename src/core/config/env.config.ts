import 'dotenv/config';
import { z } from 'zod';

const envSchema = z.object({
  PORT: z.coerce.number().default(3333),
  MONGO_URI: z.string().min(1, 'MONGO_URI é obrigatória'),
  GOOGLE_GEOCODING_API_KEY: z
    .string()
    .min(1, 'GOOGLE_GEOCODING_API_KEY é obrigatória'),
});

const _env = envSchema.safeParse(process.env);

if (!_env.success) {
  console.error('❌ Variáveis de ambiente inválidas:', _env.error.issues);
  throw new Error('Variáveis de ambiente inválidas.');
}

export const env = _env.data;
