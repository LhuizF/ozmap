export interface Coordinates {
  longitude: number;
  latitude: number;
}

export interface IGeocodingService {
  getCoordinates(address: string): Promise<Coordinates | null>;
}
