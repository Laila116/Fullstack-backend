import { Document } from "mongoose";

export interface IEvent extends Document {
  name: string;
  category: string;
  date: Date;
  location: string;
  description?: string; // Optional
  imageUrl:string;
  VeranstalterEmail:string;
}