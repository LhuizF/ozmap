import 'dotenv/config';
import 'express-async-errors';
import express from 'express';
import { connectMongoose } from './infra/database/mongoose';
import { errorHandler } from './core/middlewares/errorHandler';

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3333;

connectMongoose();

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
