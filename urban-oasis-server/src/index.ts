import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import path from 'path';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import { errorHandler, notFound } from './middlewares/middlewares';
import apartmentRouter from './routers/apartment-routers';

const app = express();

app.use(helmet());

app.use(cors());
app.use(express.json());

app.use('/apartment-management', apartmentRouter);

// Load Swagger document
const swaggerDocument = YAML.load(path.join(__dirname, '../swagger.yaml'));

// Setup Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(notFound);
app.use(errorHandler);

export default app;
