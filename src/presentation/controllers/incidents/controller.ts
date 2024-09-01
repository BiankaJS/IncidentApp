import { Request, Response } from "express"
import { IncidentModel } from "../../../data/models/incident.model";

export class IncidentController {
  public getIncident = async (req: Request, res: Response) => {
    try {
      const incidents = await IncidentModel.find();
      return res.json(incidents);
    } catch (error) {
      return res.json([]);
    }
  }

  public createIncident = async (req: Request, res: Response) => {
    try {
      const {title, description, lat, lng} = req.body;

      const newIncident = await IncidentModel.create({
        title,
        description,
        lat,
        lng
      })

      res.json(newIncident);
    } catch (error) {
      res.json({message: "Error creando registro"})
    }
  }

  public getIncidentById = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const incident = await IncidentModel.findById(id);
      return res.json(incident);
    } catch (error) {
      return res.json({ message: "Ocurrio un error." });
    }
  }

  public updateIncident = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const {title, description, lat, lng} = req.body;

      await IncidentModel.findByIdAndUpdate(id, {
        title, description, lat, lng
      });

      const updateIncident = await IncidentModel.findById(id);

      return res.json(updateIncident);
    } catch (error) {
      return res.json({ message: "Ocurrio un error."})
    }
  }

  public deleteIncident = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      await IncidentModel.findByIdAndDelete(id);
      res.json({ message: "Todo bien" })
    } catch (error) {
      return res.json({ message: "Ocurrio un error."}) 
    }
  }
}