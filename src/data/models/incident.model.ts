import mongoose from "mongoose";

const incidentSchema = new mongoose.Schema({
  title: {
    type: String,
    require: true
  },
  description: {
    type: Number,
    require: true
  },
  lat: {
    type: Number,
    require: true
  },
  lng: {
    type: Number,
    require: true
  }
});

export const IncidentModel = mongoose.model("Incident", incidentSchema);