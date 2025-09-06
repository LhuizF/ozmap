import {
  OpenAPIRegistry,
  OpenApiGeneratorV3,
} from '@asteasolutions/zod-to-openapi';

export const registry = new OpenAPIRegistry();

export function generateOpenAPIDocument() {
  const generator = new OpenApiGeneratorV3(registry.definitions);

  const document = generator.generateDocument({
    openapi: '3.0.0',
    info: {
      version: '1.0.0',
      title: 'Ozmap API',
      description: 'API para o teste técnico da Ozmap',
    },
  });

  document.components = {
    ...document.components,
    parameters: {
      languageHeader: {
        in: 'header',
        name: 'Accept-Language',
        schema: {
          type: 'string',
          enum: ['pt-BR', 'en'],
          default: 'pt-BR',
        },
        description: 'Define o idioma para as mensagens de resposta.',
        required: false,
      },
    },
  };

  for (const path in document.paths) {
    const pathItem = document.paths[path];
    if (pathItem) {
      Object.values(pathItem).forEach((operation: any) => {
        if (typeof operation === 'object' && operation !== null) {
          operation.parameters = [
            ...(operation.parameters || []),
            { $ref: '#/components/parameters/languageHeader' },
          ];
        }
      });
    }
  }

  return document;
}
