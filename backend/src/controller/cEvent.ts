import { NextFunction, Request, Response } from "express";
import Event from "../databaseSchema/mongoModels/mEvent";
import Users from "../databaseSchema/postgresModels/mUser";
import Feedback from "../databaseSchema/mongoModels/mFeedback";  
import EventCosts from "../databaseSchema/postgresModels/mEventCosts";

export async function createEvent ( req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const { name, category, date, location, description, imageUrl, ticketDetails, userEmail } = req.body;
        if (!name || !category || !date || !location || !description || !imageUrl || !ticketDetails || !userEmail) {
            res.status(400).json({ error: 'Missing required fields' });
            return;
        }
        
        const user = await Users.findOne({ where: { email: userEmail } });
        if (!user) {
            res.status(404).json({ message: "Benutzer nicht gefunden" });
            return;
        }

        if (user.role !== "Veranstalter") {
            res.status(403).json({ message: "Nur Veranstalter können Events erstellen" });
            return;
        }

        const newEvent = await Event.create({ name, category, date, location, description, imageUrl, VeranstalterEmail:userEmail });
        if (!ticketDetails || !Array.isArray(ticketDetails) || ticketDetails.length !== 3) {
            res.status(400).json({message:"Bitte geben Sie genau drei Ticketarten an."});
            return;
        }

        const eventCosts = ticketDetails.map((ticket: any) => ({
            eventID: newEvent.id,
            ticketBeschreibung: ticket.ticketBeschreibung,
            ticketCost: ticket.ticketCost,
            maxTickets: ticket.maxTickets,
            verfuegbarTickets: ticket.maxTickets,
        }));

        await EventCosts.bulkCreate(eventCosts);

        res.status(201).json({ message: "Event erfolgreich hinzugefügt 😊", event: newEvent });
    } catch (error: any) {
        console.error("Fehler beim Hinzufügen des Events", error.message);
        res.status(500).json({ message: 'Ein unerwarteter Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.' });
        next(error);
    }
}

export async function getAllEvents ( req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const events = await Event.find();

        if (!events || events.length === 0) {
            res.status(404).json({ message: "Kein Event wurde gefunden" });
            return;
        }

        const eventsWithDetails = events.map(event => ({
            name: event.name,
            location: event.location,
            imageUrl: event.imageUrl || null  // Das Bild-URL (falls vorhanden)
        }));

        res.status(200).json(eventsWithDetails);
    } catch (error: any) {
        console.error("Fehler beim Abrufen der Events:", error.message);
        res.status(500).json({ message: 'Ein unerwarteter Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.' });
        next(error);
    }
}

export async function updateEvent ( req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const { id, name, category, date, location, description, imageUrl, userEmail } = req.body;
        if (!id || !name || !category || !date || !location || !description || !imageUrl || !userEmail) {
            res.status(400).json({ error: 'Missing required fields' });
            return;
        }

        const user = await Users.findOne({ where: { email: userEmail } });
        if (!user) {
            res.status(404).json({ message: "Benutzer nicht gefunden" });
            return;
        }

        if (user.role !== "Veranstalter") {
            res.status(403).json({ message: "Nur Veranstalter können Events updaten" });
            return;
        }

        const event = await Event.findById(id);
        if (!event) {
            res.status(404).json({ message: "Event nicht gefunden" });
            return;
        }

        if (event.VeranstalterEmail !== userEmail) {
            res.status(403).json({ message: "Sie sind nicht der Veranstalter dieses Events!" });
            return;
        }

        const updatedEvent = await Event.findByIdAndUpdate( id, { name, category, date, location, description, imageUrl }, { new: true, runValidators: true });
        if (!updatedEvent) {
            res.status(404).json({ message: "Event nicht gefunden" });
            return;
        }

        res.status(200).json({ message: "Event erfolgreich aktualisiert!", updatedEvent });
    } catch (error: any) {
        console.error("Fehler beim Update des Events:", error.message);
        res.status(500).json({ message: 'Ein unerwarteter Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.' });
        next(error);
    }
}

export async function deleteEvent ( req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const { id, userEmail  } = req.body; 
        if (!id || !userEmail) {
            res.status(400).json({ error: 'Missing required fields' });
            return;
        }

        const user = await Users.findOne({ where: { email: userEmail } });
        if (!user) {
            res.status(404).json({ message: "Benutzer nicht gefunden" });
            return;
        }
    
        if (user.role !== "Veranstalter") {
            res.status(403).json({ message: "Nur Veranstalter können Events löschen" });
            return;
        }

        const event = await Event.findById(id);
        if (!event) {
            res.status(404).json({ message: "Event nicht gefunden" });
            return;
        }

        if (event.VeranstalterEmail !== userEmail) {
            res.status(403).json({ message: "Sie sind nicht der Veranstalter dieses Events!" });
            return;
        }

        const deletedEvent = await Event.findByIdAndDelete(id);
        if (!deletedEvent) {
            res.status(404).json({ message: "Event nicht gefunden" });
            return;
        }
        
        const deletedEventCosts = await EventCosts.destroy({where: { eventID: id }});
        if (deletedEventCosts === 0) {
            res.status(404).json({ message: 'Event costs not found' });
            return;
        }

        res.status(200).json({message: "Event und zugehörige Kosten erfolgreich gelöscht",event: deletedEvent, deletedCostsCount: deletedEventCosts});
    } catch (error: any) {
        console.error("Fehler beim Löschen des Events:", error.message);
        res.status(500).json({ message: 'Ein unerwarteter Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.' });
        next(error);
    }
}

export async function getSelectedEventData ( req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const eventID = req.body.eventID;
        if (!eventID) {
            res.status(400).json({ error: 'EventID is missing' });
            return;
        }

        const event = await Event.findById(eventID);
        if (!event) {
            res.status(404).json({ message: "Event nicht gefunden" });
            return;
        }

        const feedback = await Feedback.find({ eventID });
        if (!feedback || feedback.length === 0) {
            res.status(404).json({ message: "Keine Feedbacks für dieses Event gefunden" });
            return;
        }
        
        const totalFeedback = feedback.reduce((sum, feedback) => sum + feedback.feedback, 0);
        const averageFeedback = feedback.length > 0 ? totalFeedback / feedback.length : 0;

        const eventCosts = await EventCosts.findAll({where: { eventID }});
        if (!eventCosts || eventCosts.length === 0) {
            res.status(404).json({ message: "Keine Event-Kosten für dieses Event gefunden" });
            return;
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
        console.error("Fehler beim Abrufen der Event-Daten:", error.message);
        res.status(500).json({ message: 'Ein unerwarteter Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.' });
        next(error);
    }
}

export async function getAllEventsByKategorieUndOrt ( req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const { category, ort } = req.body; 
        if (!category && !ort) {
            res.status(400).json({ message: "Kategorie oder Ort sind erforderlich" });
            return;
        }

        let filter: any = {};
        if (category) filter.category = category;
        if (ort) filter.ort = ort;
        
        const events = await Event.find(filter);
        
        if (!events || events.length === 0) {
            res.status(404).json({ message: "Keine Events gefunden." });
            return;
        }

        res.status(200).json(events);
    } catch (error: any) {
        console.error("Fehler beim Filtern der Events:", error.message);
        res.status(500).json({ message: 'Ein unerwarteter Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.' });
        next(error);
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
            res.status(404).json({ message: "Keine Events gefunden." });
            return;
        }

        const uniqueOrte = [...new Set(events.map((event) => event.location))];
        const uniqueKategorien = [...new Set(events.map((event) => event.category))];

        res.status(200).json({orte: uniqueOrte, kategorien: uniqueKategorien});
    } catch (error: any) {
        console.error("Fehler beim Abrufen der gefilterten Orte und Kategorien:", error.message);
        res.status(500).json({ message: 'Ein unerwarteter Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.' });
        next(error);
    }
}

export async function getEventsByVeranstalter ( req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const email = req.body.email;
        if (!email) {
            res.status(400).json({ error: 'Email is missing' });
            return;
        }

        const events = await Event.find({ VeranstalterEmail: email });
        if (events.length === 0) {
            res.status(404).json({ message: "Keine Events für diesen Veranstalter gefunden!" });
            return;
        }

        res.status(200).json({ message: "Events erfolgreich abgerufen!", events });
    } catch (error: any) {
        console.error("Fehler beim Abrufen der Events:", error.message);
        res.status(500).json({ message: 'Ein unerwarteter Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.' });
        next(error);
    }
}