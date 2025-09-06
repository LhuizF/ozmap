import 'mocha';
import { expect } from 'chai';
import { createRegionSchema } from '@/app/regions/dtos/createRegion.dto';

describe('CreateRegionDTO Schema', () => {
  const validRegionData = {
    name: 'Região Válida',
    geometry: {
      type: 'Polygon',
      coordinates: [
        [
          [-43.1, -22.9],
          [-43.2, -22.9],
          [-43.2, -23.0],
          [-43.1, -22.9],
        ],
      ],
    },
  };

  it('deve validar com sucesso um objeto de região correto', () => {
    const result = createRegionSchema.safeParse(validRegionData);
    expect(result.success).to.be.equal(true);
  });

  describe('Validação do campo "name"', () => {
    it('deve falhar se o nome for muito curto', () => {
      const invalidData = { ...validRegionData, name: 'ab' };
      const result = createRegionSchema.safeParse(invalidData);

      expect(result.success).to.be.equal(false);

      expect(result.success).to.be.equal(false);

      const nameError = result.error.issues.find((e) =>
        e.path.includes('name'),
      );
      expect(nameError).to.not.be.equal(undefined);
      expect(nameError?.message).to.contain('validation.nameMin');
    });
  });

  it('deve falhar se o nome for muito longo', () => {
    const longName = 'a'.repeat(101);
    const invalidData = { ...validRegionData, name: longName };
    const result = createRegionSchema.safeParse(invalidData);

    expect(result.success).to.be.equal(false);

    expect(result.success).to.be.equal(false);
    const nameError = result.error.issues.find((e) => e.path.includes('name'));
    expect(nameError).to.not.be.equal(undefined);
    expect(nameError?.message).to.contain('validation.nameMax');

    it('deve falhar se o nome estiver vazio', () => {
      const invalidData = { ...validRegionData, name: '' };
      const result = createRegionSchema.safeParse(invalidData);

      expect(result.success).to.be.equal(false);

      expect(result.success).to.be.equal(false);
      const nameError = result.error.issues.find((e) =>
        e.path.includes('name'),
      );
      expect(nameError).to.not.be.equal(undefined);
      expect(nameError?.message).to.contain('Nome é obrigatório');
    });
  });

  describe('Validação do campo "geometry"', () => {
    it('deve falhar se o tipo da geometria não for "Polygon"', () => {
      const invalidData = {
        ...validRegionData,
        geometry: { ...validRegionData.geometry, type: 'Point' },
      };
      const result = createRegionSchema.safeParse(invalidData);

      expect(result.success).to.be.equal(false);
      const geometryError = result.error.issues.find((e) =>
        e.path.includes('type'),
      );
      expect(geometryError).to.not.be.equal(undefined);
    });

    it('deve falhar se as coordenadas estiverem vazias', () => {
      const invalidData = {
        ...validRegionData,
        geometry: { ...validRegionData.geometry, coordinates: [] },
      };
      const result = createRegionSchema.safeParse(invalidData);

      expect(result.success).to.be.equal(false);
      const coordsError = result.error.issues.find((e) =>
        e.path.includes('coordinates'),
      );
      expect(coordsError).to.not.be.equal(undefined);
    });

    it('deve falhar se a longitude for menor que -180', () => {
      const invalidCoordinates = [[[-181, -22.9]]];
      const invalidData = {
        ...validRegionData,
        geometry: {
          ...validRegionData.geometry,
          coordinates: invalidCoordinates,
        },
      };
      const result = createRegionSchema.safeParse(invalidData);

      expect(result.success).to.be.equal(false);

      const lonError = result.error.issues.find((e) =>
        e.path.includes('coordinates'),
      );

      expect(lonError?.message).to.contain(
        'validation.coordinates.longitudeMin',
      );
    });

    it('deve falhar se a longitude for maior que 180', () => {
      const invalidCoordinates = [[[181, -22.9]]];
      const invalidData = {
        ...validRegionData,
        geometry: {
          ...validRegionData.geometry,
          coordinates: invalidCoordinates,
        },
      };
      const result = createRegionSchema.safeParse(invalidData);

      expect(result.success).to.be.equal(false);

      const lonError = result.error.issues.find((e) =>
        e.path.includes('coordinates'),
      );

      expect(lonError?.message).to.contain(
        'validation.coordinates.longitudeMax',
      );
    });

    it('deve falhar se a latitude for menor que -90', () => {
      const invalidCoordinates = [[[-43.1, -91]]];
      const invalidData = {
        ...validRegionData,
        geometry: {
          ...validRegionData.geometry,
          coordinates: invalidCoordinates,
        },
      };
      const result = createRegionSchema.safeParse(invalidData);

      expect(result.success).to.be.equal(false);

      const latError = result.error.issues.find((e) =>
        e.path.includes('coordinates'),
      );
      expect(latError?.message).to.contain(
        'validation.coordinates.latitudeMin',
      );
    });

    it('deve falhar se a latitude for maior que 90', () => {
      const invalidCoordinates = [[[-43.1, 91]]];
      const invalidData = {
        ...validRegionData,
        geometry: {
          ...validRegionData.geometry,
          coordinates: invalidCoordinates,
        },
      };
      const result = createRegionSchema.safeParse(invalidData);

      expect(result.success).to.be.equal(false);

      const latError = result.error.issues.find((e) =>
        e.path.includes('coordinates'),
      );
      expect(latError?.message).to.contain(
        'validation.coordinates.latitudeMax',
      );
    });
  });
});
