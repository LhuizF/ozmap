import 'mocha';
import { expect } from 'chai';
import { findByAddressSchema } from '@/app/regionSearch/dtos/findByAddress.dto';

describe('findByAddressSchema', () => {
  it('deve validar com sucesso um endereço válido', () => {
    const result = findByAddressSchema.safeParse({
      address: 'Avenida Rio Branco, 12345',
    });
    expect(result.success).to.be.equal(true);
  });

  it('deve falhar se o endereço for muito curto', () => {
    const result = findByAddressSchema.safeParse({ address: 'Rua A' });

    expect(result.success).to.be.equal(false);
    const addressError = result.error.issues.find((e) =>
      e.path.includes('address'),
    );
    expect(addressError).to.not.be.equal(undefined);
    expect(addressError?.message).to.equal('Endereço muito curto');
  });
});
