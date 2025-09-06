import 'mocha';
import { expect } from 'chai';
import { idParamsSchema } from '@/shared/dtos/idParams.dto';

describe('idParamsSchema', () => {
  it('deve validar com sucesso um ObjectId válido', () => {
    const validInput = { id: '507f191e810c19729de860ea' };

    const result = idParamsSchema.safeParse(validInput);

    expect(result.success).to.be.equal(true);
  });

  it('deve falhar se o id não tiver 24 caracteres hexadecimais', () => {
    const invalidInput = { id: 'id' };
    const result = idParamsSchema.safeParse(invalidInput);
    expect(result.success).to.be.equal(false);
  });

  it('deve falhar se o Id contiver caracteres não-hexadecimais', () => {
    const invalidInput = { id: '507f191e810c19729de860egaa' };
    const result = idParamsSchema.safeParse(invalidInput);

    expect(result.success).to.be.equal(false);
    if (!result.success) {
      const idError = result.error.issues.find((e) => e.path.includes('id'));
      expect(idError?.message).to.equal('validation.invalidId');
    }
  });

  it('deve falhar se o id não for uma string', () => {
    const invalidInput = { id: 123456789012 };
    const result = idParamsSchema.safeParse(invalidInput);
    expect(result.success).to.be.equal(false);
  });
});
