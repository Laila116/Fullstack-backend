import mongoose, { Schema, Model } from "mongoose";
import { IEvent } from "../../../../shared/interface/iEvent";

// Definiere das Event-Schema
const eventSchema: Schema<IEvent> = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
    imageUrl: { 
      type: String ,
      required: true,
    }, 
    VeranstalterEmail: { 
      type: String ,
      required: true,
    }, 
  },
  {
    timestamps: true,
  }
);

// Optional: Duplikate durch Index verhindern (z. B. Kombination aus Name und Datum)
eventSchema.index({ name: 1, date: 1, location: 1 }, { unique: true });

const Event: Model<IEvent> = mongoose.model<IEvent>("event", eventSchema);

export default Event;
