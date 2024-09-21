import cors from "cors";
import express from "express";
import helmet from "helmet";
import apartmentRouter from "./routers/apartment.routers";
import { errorHandler, notFound } from "./middlewares/middlewares";

const app = express();

app.use(helmet());


app.use(cors());
app.use(express.json());

app.use("/apartment-management", apartmentRouter);

app.use(notFound);
app.use(errorHandler);

export default app;
