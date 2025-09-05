import 'mocha';
import { expect } from 'chai';
import { pointSchema } from '@/app/regionSearch/dtos/point.dto';

describe('pointSchema', () => {
  it('deve validar com sucesso coordenadas válidas', () => {
    const result = pointSchema.safeParse({ longitude: 40, latitude: 20 });
    expect(result.success).to.be.equal(true);
  });

  it('deve converter strings para números', () => {
    const result = pointSchema.safeParse({
      longitude: '45',
      latitude: '20',
    });

    expect(result.success).to.be.equal(true);
    expect(result.success).to.deep.equal(true);

    expect(result.data.longitude).to.be.equal(45);
    expect(result.data.latitude).to.be.equal(20);
  });

  it('deve falhar se a longitude for maior que 180', () => {
    const result = pointSchema.safeParse({ longitude: 190, latitude: 0 });

    expect(result.success).to.be.equal(false);
    expect(result.success).to.deep.equal(false);
    const error = result.error.issues.find((e) => e.path.includes('longitude'));

    expect(error).to.not.be.equal(undefined);
    expect(error?.message).to.contain('validation.coordinates.longitudeMax');
  });

  it('deve falhar se a longitude for menor que -180', () => {
    const result = pointSchema.safeParse({ longitude: -190, latitude: 0 });

    expect(result.success).to.be.equal(false);
    expect(result.success).to.deep.equal(false);
    const error = result.error.issues.find((e) => e.path.includes('longitude'));
    expect(error).to.not.be.equal(undefined);
    expect(error?.message).to.contain('validation.coordinates.longitudeMin');
  });

  it('deve falhar se a latitude for maior que 90', () => {
    const result = pointSchema.safeParse({ longitude: 0, latitude: 100 });

    expect(result.success).to.be.equal(false);
    expect(result.success).to.deep.equal(false);
    const error = result.error.issues.find((e) => e.path.includes('latitude'));
    expect(error).to.not.be.equal(undefined);
    expect(error?.message).to.contain('validation.coordinates.latitudeMax');
  });

  it('deve falhar se a latitude for menor que -90', () => {
    const result = pointSchema.safeParse({ longitude: 0, latitude: -100 });

    expect(result.success).to.be.equal(false);
    expect(result.success).to.deep.equal(false);
    const error = result.error.issues.find((e) => e.path.includes('latitude'));
    expect(error).to.not.be.equal(undefined);
    expect(error?.message).to.contain('validation.coordinates.latitudeMin');
  });
});
