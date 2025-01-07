import { ObjectId } from "mongoose";

export interface iBookings {
    bookingID?: number; 
    useremail: string; 
    eventID: ObjectId;
    numberOfTickets: number; 
    totalPrice: number; 
    bookingDate?: Date;
}