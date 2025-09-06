import { z } from 'zod';

export const paginationSchema = z.object({
  page: z.coerce.number().positive().optional().default(1),
  pageSize: z.coerce.number().positive().optional().default(20),
});

export type PaginationDto = z.infer<typeof paginationSchema>;

export const paginatedResponseSchema = <T>(itemSchema: z.ZodType<T>) =>
  z.object({
    data: z.array(itemSchema),
    total: z.number().nonnegative(),
    page: z.number().positive(),
    pageSize: z.number().positive(),
    totalPages: z.number().nonnegative(),
  });

export type PaginatedResponseDto<T> = z.infer<
  ReturnType<typeof paginatedResponseSchema<T>>
>;
