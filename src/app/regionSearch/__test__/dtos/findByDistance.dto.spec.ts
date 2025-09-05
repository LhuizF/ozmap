import 'mocha';
import { expect } from 'chai';
import { findByDistanceSchema } from '@/app/regionSearch/dtos/findByDistance.dto';

describe('findByDistanceSchema', () => {
  it('deve validar com sucesso dados válidos', () => {
    const result = findByDistanceSchema.safeParse({
      longitude: 40,
      latitude: 80,
      distance: 1000,
    });

    expect(result.success).to.be.equal(true);
  });

  it('deve converter a distância de string para número', () => {
    const result = findByDistanceSchema.safeParse({
      longitude: '40',
      latitude: '80',
      distance: '1000',
    });

    expect(result.success).to.be.equal(true);
    expect(result.data.longitude).to.be.equal(40);
    expect(result.data.latitude).to.be.equal(80);
    expect(result.data.distance).to.be.equal(1000);
  });

  it('deve falhar se a distância for negativa', () => {
    const result = findByDistanceSchema.safeParse({
      longitude: 40,
      latitude: 80,
      distance: -10,
    });
    expect(result.success).to.be.equal(false);

    const error = result.error.issues.find((e) => e.path.includes('distance'));
    expect(error.message).to.contain('A distância deve ser um número positivo');
  });

  it('deve herdar as validações de pointSchema', () => {
    const result = findByDistanceSchema.safeParse({
      longitude: -181,
      latitude: 0,
      distance: 1000,
    });

    expect(result.success).to.be.equal(false);
  });
});
