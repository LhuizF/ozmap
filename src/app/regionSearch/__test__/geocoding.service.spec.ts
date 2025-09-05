import 'mocha';
import { expect } from 'chai';
import sinon from 'sinon';
import { Client } from '@googlemaps/google-maps-services-js';
import { GeocodingService } from '@/app/regionSearch/geocoding.service';
import {
  BadRequestError,
  InternalServerError,
} from '@/core/errors/http.errors';

describe('GeocodingService', () => {
  let geocodingService: GeocodingService;
  let googleMapsClientStub: sinon.SinonStub;

  beforeEach(() => {
    googleMapsClientStub = sinon.stub(Client.prototype, 'geocode');

    geocodingService = new GeocodingService('fake-api-key');
  });

  afterEach(() => {
    sinon.restore();
  });

  it('deve retornar as coordenadas quando o endereço for encontrado', async () => {
    const address = 'Avenida das Rio Branco - Rio de Janeiro';
    const mockResponse = {
      data: {
        results: [
          {
            geometry: {
              location: { lat: 10, lng: -20 },
            },
          },
        ],
        status: 'OK',
      },
    };
    googleMapsClientStub.resolves(mockResponse);

    const coordinates = await geocodingService.getCoordinates(address);

    expect(coordinates).to.deep.equal({
      latitude: 10,
      longitude: -20,
    });
  });

  it('deve lançar BadRequestError quando o endereço não for encontrado (zero resultados)', async () => {
    const address = 'Endereço inválido';
    const mockResponse = {
      data: {
        results: [],
        status: 'ZERO_RESULTS',
      },
    };
    googleMapsClientStub.resolves(mockResponse);

    try {
      await geocodingService.getCoordinates(address);
      expect.fail('Deveria ter lançado BadRequestError');
    } catch (error) {
      expect(error).to.be.instanceOf(BadRequestError);
      expect(error.message).to.equal(`Endereço não encontrado: ${address}`);
    }
  });

  it('deve lançar InternalServerError quando a API do Google falhar', async () => {
    const address = 'Qualquer Endereço';
    const apiError = new Error('Erro na API do Google');
    googleMapsClientStub.rejects(apiError);

    try {
      await geocodingService.getCoordinates(address);
      expect.fail('Deveria ter lançado InternalServerError');
    } catch (error) {
      expect(error).to.be.instanceOf(InternalServerError);
      expect(error.message).to.equal(
        'Ocorreu um erro ao tentar converter o endereço.',
      );
    }
  });

  it('não deve lançar um InternalServerError se o erro já for um BadRequestError', async () => {
    const address = 'Endereço que causa erro específico';
    const specificError = new BadRequestError('Erro específico já tratado');
    googleMapsClientStub.rejects(specificError);

    try {
      await geocodingService.getCoordinates(address);
      expect.fail('Deveria ter lançado BadRequestError');
    } catch (error) {
      expect(error).to.be.instanceOf(BadRequestError);
      expect(error.message).to.equal('Erro específico já tratado');
    }
  });
});
