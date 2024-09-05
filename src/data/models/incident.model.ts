import mongoose from "mongoose";

const incidentSchema = new mongoose.Schema({
  title: {
    type: String,
    require: true
  },
  description: {
    type: String,
    require: true
  },
  lat: {
    type: Number,
    require: true
  },
  lng: {
    type: Number,
    require: true
  },
  isEmailSent: {
    type: Boolean,
    default: false
  }
});

export const IncidentModel = mongoose.model("Incident", incidentSchema);