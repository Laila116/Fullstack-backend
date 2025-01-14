import { NextFunction, Request, Response } from "express";
import Event from "../databaseSchema/mongoModels/mEvent";
import Users from "../databaseSchema/postgresModels/mUser";
import Feedback from "../databaseSchema/mongoModels/mFeedback";  
import EventCosts from "../databaseSchema/postgresModels/mEventCosts";
import ErrorMessages from "./fehlerMeldung";

export async function createEvent ( req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const { name, category, date, location, description, imageUrl, ticketDetails, userEmail } = req.body;
        if (!name || !category || !date || !location || !description || !imageUrl || !ticketDetails || !userEmail) {
            return next(ErrorMessages.MissingFields);
        }
        
        const user = await Users.findOne({ where: { email: userEmail } });
        if (!user) {
            return next(ErrorMessages.UserNotFound);
        }

        if (user.role !== "Veranstalter") {
            return next(ErrorMessages.MissingOrganizerRole);
        }

        const newEvent = await Event.create({ name, category, date, location, description, imageUrl, VeranstalterEmail: userEmail });
        if (!ticketDetails || !Array.isArray(ticketDetails) || ticketDetails.length !== 3) {
            return next(ErrorMessages.InvalidNumberOfTicketTypes);
        }

        const eventCosts = ticketDetails.map((ticket: any) => ({
            eventID: newEvent.id,
            ticketBeschreibung: ticket.ticketBeschreibung,
            ticketCost: ticket.ticketCost,
            maxTickets: ticket.maxTickets,
            verfuegbarTickets: ticket.maxTickets,
        }));

        await EventCosts.bulkCreate(eventCosts);

        res.status(201).json({ message: "Event erfolgreich hinzugefügt", event: newEvent });
    } catch (error: any) {
        next(ErrorMessages.InternalServerError);
    }
}

export async function getAllEvents ( req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const events = await Event.find();

        if (!events || events.length === 0) {
            return next(ErrorMessages.EventsNotFound);
        }

        const eventsWithDetails = events.map(event => ({
            name: event.name,
            location: event.location,
            imageUrl: event.imageUrl || null  // Das Bild-URL (falls vorhanden)
        }));

        res.status(200).json(eventsWithDetails);
    } catch (error: any) {
        next(ErrorMessages.InternalServerError);
    }
}

export async function updateEvent ( req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const { id, name, category, date, location, description, imageUrl, userEmail } = req.body;
        if (!id || !name || !category || !date || !location || !description || !imageUrl || !userEmail) {
            return next(ErrorMessages.MissingFields);
        }

        const user = await Users.findOne({ where: { email: userEmail } });
        if (!user) {
            return next(ErrorMessages.UserNotFound);
        }

        if (user.role !== "Veranstalter") {
            return next(ErrorMessages.MissingOrganizerRole);
        }

        const event = await Event.findById(id);
        if (!event) {
            return next(ErrorMessages.EventNotFound);
        }

        if (event.VeranstalterEmail !== userEmail) {
            return next(ErrorMessages.NotEventOrganizer);
        }

        const updatedEvent = await Event.findByIdAndUpdate(id, { name, category, date, location, description, imageUrl }, { new: true, runValidators: true });
        if (!updatedEvent) {
            return next(ErrorMessages.EventUpdateFailed);
        }

        res.status(200).json({ message: "Event erfolgreich aktualisiert!", updatedEvent });
    } catch (error: any) {
        next(ErrorMessages.InternalServerError);
    }
}

export async function deleteEvent ( req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const { id, userEmail } = req.body;
        if (!id || !userEmail) {
            return next(ErrorMessages.MissingFields);
        }

        const user = await Users.findOne({ where: { email: userEmail } });
        if (!user) {
            return next(ErrorMessages.UserNotFound);
        }
    
        if (user.role !== "Veranstalter") {
            return next(ErrorMessages.MissingOrganizerRole);
        }

        const event = await Event.findById(id);
        if (!event) {
            return next(ErrorMessages.EventNotFound);
        }

        if (event.VeranstalterEmail !== userEmail) {
            return next(ErrorMessages.NotEventOrganizer);
        }

        const deletedEvent = await Event.findByIdAndDelete(id);
        if (!deletedEvent) {
            return next(ErrorMessages.EventDeletFailed);
        }
        
        const deletedEventCosts = await EventCosts.destroy({ where: { eventID: id } });
        if (deletedEventCosts === 0) {
            return next(ErrorMessages.EventCostsNotFound);
        }

        res.status(200).json({ message: "Event und zugehörige Kosten erfolgreich gelöscht", event: deletedEvent, deletedCostsCount: deletedEventCosts });
    } catch (error: any) {
        next(ErrorMessages.InternalServerError);
    }
}

export async function getSelectedEventData ( req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const eventID = req.body.eventID;
        if (!eventID) {
            return next(ErrorMessages.MissingFields);
        }

        const event = await Event.findById(eventID);
        if (!event) {
            return next(ErrorMessages.EventNotFound);
        }

        const feedback = await Feedback.find({ eventID });
        /*if (!feedback || feedback.length === 0) {
            return next(ErrorMessages.NoFeedbacksForEventFound);
        }*/
        
        const totalFeedback = feedback.reduce((sum, feedback) => sum + feedback.feedback, 0);
        const averageFeedback = feedback.length > 0 ? totalFeedback / feedback.length : 0;

        const eventCosts = await EventCosts.findAll({ where: { eventID } });
        if (!eventCosts || eventCosts.length === 0) {
            return next(ErrorMessages.EventCostsNotFound);
        }

        const eventData = {
            event: {
                name: event.name,
                description: event.description,
                location: event.location,
                date: event.date,
                imageUrl: event.imageUrl || null  // Bild-URL, falls vorhanden
            },
            feedback: {
                average: averageFeedback.toFixed(1), // Durchschnitt der Feedback-Bewertungen
                comments: feedback.map((feedback) => ({
                    userEmail: feedback.userEmail,
                    comment: feedback.comment,
                })),
            },
            ticketCosts: eventCosts.map((cost) => ({
                ticketCost: cost.ticketCost,
                ticketBeschreibung: cost.ticketBeschreibung,
                verfuegbarTickets: cost.verfuegbarTickets
            }))
        };

        res.status(200).json(eventData);
    } catch (error: any) {
        next(ErrorMessages.InternalServerError);
    }
}

export async function getAllEventsByKategorieUndOrt ( req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const { category, ort } = req.body; 
        if (!category && !ort) {
            return next(ErrorMessages.MissingFields);
        }

        let filter: any = {};
        if (category) filter.category = category;
        if (ort) filter.ort = ort;
        
        const events = await Event.find(filter);
        
        if (!events || events.length === 0) {
            return next(ErrorMessages.NoEventsFoundWithFilters);
        }

        res.status(200).json(events);
    } catch (error: any) {
        next(ErrorMessages.InternalServerError);
    }
}

export async function getKategorieUndOrt ( req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const { kategorie, ort } = req.query; 

        let filter: any = {};
        if (kategorie) filter.category = kategorie;
        if (ort) filter.location = ort;

        const events = await Event.find(filter);
        if (!events || events.length === 0) {
            return next(ErrorMessages.NoEventsFoundWithFilters);
        }

        const uniqueOrte = [...new Set(events.map((event) => event.location))];
        const uniqueKategorien = [...new Set(events.map((event) => event.category))];

        res.status(200).json({orte: uniqueOrte, kategorien: uniqueKategorien});
    } catch (error: any) {
        next(ErrorMessages.InternalServerError);
    }
}

export async function getEventsByVeranstalter ( req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const email = req.body.email;
        if (!email) {
            return next(ErrorMessages.MissingFields);
        }

        const events = await Event.find({ VeranstalterEmail: email });
        if (!events || events.length === 0) {
            return next(ErrorMessages.NoEventsFoundForOrganizer);
        }

        res.status(200).json({ message: "Events erfolgreich abgerufen!", events });
    } catch (error: any) {
        next(ErrorMessages.InternalServerError);
    }
}