import 'dotenv/config';
import 'express-async-errors';
import express, { RequestHandler } from 'express';
import { connectMongoose } from './core/database/mongoose';
import { errorHandler } from './core/middlewares/errorHandler';
import { setupRegionRoutes } from '@/app/regions/region.module';
import { generateOpenAPIDocument } from './core/config/openapi.config';
import swaggerUi from 'swagger-ui-express';
import { notFoundHandler } from './core/middlewares/notFoundHandler';
import { setupRegionSearchRoutes } from './app/regionSearch/regionSearch.module';

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3333;

setupRegionRoutes(app);
setupRegionSearchRoutes(app);

const openApiDocument = generateOpenAPIDocument();
app.use(
  '/api-docs',
  swaggerUi.serve as unknown as RequestHandler,
  swaggerUi.setup(openApiDocument) as unknown as RequestHandler,
);

connectMongoose();

app.use(notFoundHandler);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
