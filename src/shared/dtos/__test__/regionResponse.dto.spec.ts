import 'mocha';
import { expect } from 'chai';
import { regionResponseSchema } from '@/shared/dtos/regionResponse.dto';

describe('regionResponseSchema', () => {
  it('deve validar com sucesso um objeto de resposta de região válido', () => {
    const validResponse = {
      id: '651b34e4f2095854653632f7',
      name: 'Região de Resposta',
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [-43.1, -22.9],
            [-43.2, -22.9],
            [-43.1, -22.9],
          ],
        ],
      },
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = regionResponseSchema.safeParse(validResponse);

    expect(result.success).to.equal(true);
  });

  it('deve falhar se o ID não for uma string', () => {
    const invalidResponse = { id: 12345 };
    const result = regionResponseSchema.safeParse(invalidResponse);

    expect(result.success).to.equal(false);
  });

  it('deve falhar se as datas não forem objetos Date', () => {
    const validResponse = {
      id: '651b34e4f2095854653632f7',
      name: 'Região',
      geometry: { type: 'Polygon', coordinates: [] },
      createdAt: '2023-01-01',
      updatedAt: new Date(),
    };

    const result = regionResponseSchema.safeParse(validResponse);
    expect(result.success).to.equal(false);
  });
});
