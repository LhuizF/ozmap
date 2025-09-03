import 'dotenv/config';
import express from 'express';
import { connectMongoose } from './infra/database/mongoose';

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3333;

connectMongoose();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
