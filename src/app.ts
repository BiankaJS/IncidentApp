import express from 'express'
import 'dotenv/config';
import { envs } from './config/envs.conections';
import { MongoDatabase } from './data/init';
import { AppRoutes } from './presentation/routes';
import { emailJobs } from './domain/jobs/email.job';

const app = express();
app.use(express.json());
app.use(AppRoutes.routes);

(async () => {
  await MongoDatabase.connect({ mongoUrl: envs.MONGO_URL ?? "", dbName: "Holiwis" });
})();

app.listen(envs.PORT, () => {
  console.log("Server started");
  emailJobs();
})