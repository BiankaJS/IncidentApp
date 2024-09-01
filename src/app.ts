import express from 'express'
import 'dotenv/config';
import { envs } from './config/envs.conections';
import { MongoDatabase } from './data/init';
import { IncidentModel } from './data/models/incident.model';
import { AppRoutes } from './presentation/routes';

const app = express();
app.use(express.json());
app.use(AppRoutes.routes);

(async () => {
  await MongoDatabase.connect({ mongoUrl: envs.MONGO_URL ?? "", dbName: "Holiwis" });
})();

app.listen(envs.PORT, () => {
  console.log("Server started")
})