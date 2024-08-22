import express from 'express'
import 'dotenv/config';
import { envs } from './config/envs.conections';
import { MongoDatabase } from './data/init';

const app = express();

(async () => {
  await MongoDatabase.connect({ mongoUrl: envs.MONGO_URL ?? "", dbName: "Holiwis" });
})();

app.get("/", (req, res) => {
  res.send("Hello wi")
});

app.listen(envs.PORT, () => {
  console.log("Server started")
})
