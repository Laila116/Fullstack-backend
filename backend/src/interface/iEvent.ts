import { Document } from "mongoose";

export interface IEvent extends Document {
  name: string;
  date: Date;
  location: string;
  description?: string; // Optional
}