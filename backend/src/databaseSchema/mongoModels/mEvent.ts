import mongoose, { Schema, Document, Model } from "mongoose";

// Definiere das Event-Interface für Typsicherheit
export interface IEvent extends Document {
  name: string;
  date: Date;
  location: string;
  description?: string; // Description ist optional
}

// Definiere das Event-Schema
const eventSchema: Schema<IEvent> = new Schema(
  {
    name: {
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
      required: false, // Optional
    },
  },
  {
    timestamps: true, // Fügt automatisch createdAt und updatedAt hinzu
  }
);

// Optional: Duplikate durch Index verhindern (z. B. Kombination aus Name und Datum)
eventSchema.index({ name: 1, date: 1 }, { unique: true });

// Erstelle das Event-Modell
const Event: Model<IEvent> = mongoose.model<IEvent>("Event", eventSchema);

// Exportiere das Modell
export default Event;
