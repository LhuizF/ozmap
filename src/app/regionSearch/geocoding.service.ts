import { Client, GeocodeRequest } from '@googlemaps/google-maps-services-js';
import { Coordinates, IGeocodingService } from './interfaces/IGeocodingService';
import {
  BadRequestError,
  InternalServerError,
} from '@/core/errors/http.errors';

export class GeocodingService implements IGeocodingService {
  private client: Client;

  constructor(private readonly apiKey: string) {
    this.client = new Client({});
  }
  async getCoordinates(address: string): Promise<Coordinates | null> {
    const request: GeocodeRequest = {
      params: {
        address: address,
        key: this.apiKey,
        // componentRestrictions: {
        //   country: 'BR', //TODO: adicionar configuração para outros países por env
        // },
      },
    };

    try {
      const response = await this.client.geocode(request);
      const { results } = response.data;

      if (results.length === 0) {
        throw new BadRequestError(`Endereço não encontrado: ${address}`);
      }

      const location = results[0].geometry.location;

      return {
        latitude: location.lat,
        longitude: location.lng,
      };
    } catch (error) {
      if (error instanceof BadRequestError) {
        throw error;
      }

      console.error(
        'Google Geocoding service error:',
        error.response?.data || error.message,
      );

      throw new InternalServerError(
        'Ocorreu um erro ao tentar converter o endereço.',
      );
    }
  }
}
