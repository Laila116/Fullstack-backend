import { ObjectId } from "mongoose";

export interface iEventCosts {
    eventID: ObjectId;
    ticketCost: number;
    ticketBeschreibung: string;
    maxTickets: number;
    verfuegbarTickets: number;
}