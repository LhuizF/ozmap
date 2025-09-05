const translation = {
  errors: {
    routeNotFound: "Rota '{{route}}' não encontrada",
    regionNotFound: 'Região não encontrada',
    addressNotFound: 'Endereço não encontrado:',
    internalServerError: 'Erro interno do servidor',
    invalidBody: 'Corpo da requisição inválido.',
    internalGeocodingError: 'Ocorreu um erro ao tentar converter o endereço.',
  },
  validation: {
    nameRequired: 'Nome é obrigatório',
    nameMin: 'Nome deve ter pelo menos 3 caracteres',
    nameMax: 'Nome deve ter no máximo 100 caracteres',
    invalidId: 'Id inválido.',
    geometryType: 'Tipo de geometria inválido, deve ser Polygon',
    coordinates: {
      longitudeMin: 'Longitude deve ser maior ou igual a -180',
      longitudeMax: 'Longitude deve ser menor ou igual a 180',
      latitudeMin: 'Latitude deve ser maior ou igual a -90',
      latitudeMax: 'Latitude deve ser menor ou igual a 90',
    },
    addressMin: 'Endereço muito curto',
    distance: 'Distância é obrigatória.',
    distanceMin: 'A distância deve ser um número positivo',
  },
  description: {
    idRegion: 'Identificador único da região',
    nameRegion: 'Nome da região',
    geometryType: 'Tipo de geometria, sempre Polygon',
    longitude: 'Longitude da localização',
    latitude: 'Latitude da localização',
    coordinates: 'Coordenadas do polígono em GeoJSON',
    address: 'Endereço a ser pesquisado',
    distance: 'Distância em metros para busca de regiões próximas',
    createdAt: 'Data de criação',
    updatedAt: 'Data da última atualização',
  },
  success: {
    region: {
      deleteMessage: 'Região deletada com sucesso!',
    },
  },
};

export type Translation = typeof translation;

export default translation;
