import { Translation } from '../pt-BR/translation';

const translation: Translation = {
  errors: {
    routeNotFound: "Route '{{route}}' not found",
    regionNotFound: 'Region not found',
    addressNotFound: 'Address not found:',
    internalServerError: 'Internal server error',
    invalidBody: 'Invalid request body.',
    internalGeocodingError:
      'An error occurred while trying to convert the address.',
    badRequest: 'Bad request',
    resourceNotFound: 'Resource not found',
  },
  validation: {
    nameRequired: 'Name is required',
    nameMin: 'Name must be at least 3 characters long',
    nameMax: 'Name must be at most 100 characters long',
    invalidId: 'Invalid ID.',
    geometryType: 'Invalid geometry type, must be Polygon',
    coordinates: {
      longitudeMin: 'Longitude must be greater than or equal to -180',
      longitudeMax: 'Longitude must be less than or equal to 180',
      latitudeMin: 'Latitude must be greater than or equal to -90',
      latitudeMax: 'Latitude must be less than or equal to 90',
    },
    addressMin: 'Address too short',
    distance: 'Distance is required.',
    distanceMin: 'The distance must be a positive number',
  },
  description: {
    idRegion: 'Unique identifier for the region',
    nameRegion: 'Name of the region',
    geometryType: 'Geometry type, always Polygon',
    longitude: 'Longitude of the location',
    latitude: 'Latitude of the location',
    coordinates: 'Coordinates of the polygon in GeoJSON',
    address: 'Address to be searched',
    distance: 'Distance in meters to search for nearby regions',
    createdAt: 'Creation date',
    updatedAt: 'Last update date',
  },
  success: {
    region: {
      deleteMessage: 'Region deleted successfully!',
    },
  },
};

export default translation;
