import { Document } from "mongoose";

export interface IFeedback extends Document {
    eventID: number;
    userEmail: string;
    feedback: number;
    comment: string;
}