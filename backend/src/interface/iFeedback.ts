import { Document, ObjectId } from "mongoose";

export interface IFeedback extends Document {
    eventID: ObjectId;
    userEmail: string;
    feedback: number;
    comment: string;
}