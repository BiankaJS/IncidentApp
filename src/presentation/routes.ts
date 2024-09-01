import { Router } from "express";
import { incidentsRoutes } from "./controllers/incidents/routes";

export class AppRoutes {
  static get routes() : Router{
    const router = Router();
    router.use("/api/incidents", incidentsRoutes.routes);
    return router;
  }
}