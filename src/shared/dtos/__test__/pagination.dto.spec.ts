import 'mocha';
import { expect } from 'chai';
import { paginationSchema } from '@/shared/dtos/pagination.dto';

describe('paginationSchema', () => {
  it('deve usar valores padrão quando nenhum dado for fornecido', () => {
    const input = {};

    const result = paginationSchema.safeParse(input);

    expect(result.success).to.equal(true);
    expect(result.data.page).to.equal(1);
    expect(result.data.pageSize).to.equal(20);
  });

  it('deve converter (coerce) page e pageSize de strings para números', () => {
    const input = { page: '5', pageSize: '50' };
    const result = paginationSchema.safeParse(input);

    expect(result.success).to.be.equal(true);
    expect(result.success).to.equal(true);
    expect(result.data.page).to.equal(5);
    expect(result.data.pageSize).to.equal(50);
  });

  it('deve falhar se page não for um número positivo', () => {
    const input = { page: 0 };
    const result = paginationSchema.safeParse(input);

    expect(result.success).to.be.equal(false);
  });

  it('deve falhar se pageSize não for um número positivo', () => {
    const input = { pageSize: -10 };
    const result = paginationSchema.safeParse(input);

    expect(result.success).to.be.equal(false);
  });
});
