import { Request, Response, NextFunction } from 'express';
import EventCosts from '../databaseSchema/postgresModels/mEventCosts';
/*
// Funktion zum Erstellen eines neuen EventCosts
export async function createEventCost(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const { eventID, ticketCost } = req.body; 

        const eventCostData = {
            eventID,
            ticketCost,
            eventName: req.body.eventName || null,
        };

        const newEventCost = await EventCosts.create(eventCostData); // Erstellen in der PostgreSQL-Datenbank

        res.status(201).json({
            message: 'EventCost erfolgreich erstellt',
            eventCost: newEventCost
        });

    } catch (error: any) {
        console.error('Fehler beim Erstellen von EventCosts:', error.message);
        next(error);
    }
}

// Funktion zum Abrufen eines EventCosts
export async function getEventCost(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const id = req.query.id as string; // ID aus Query-Parameter

        if (!id) {
            res.status(400).json({ message: 'ID wird benötigt' });
            return;
        }

        const eventCost = await EventCosts.findByPk(id);

        if (!eventCost) {
            res.status(404).json({ message: 'EventCost nicht gefunden' });
            return;
        }

        res.status(200).json(eventCost);
    } catch (error: any) {
        console.error('Fehler beim Abrufen von EventCosts:', error.message);
        next(error);
    }
}

// Funktion zum Aktualisieren eines EventCosts
export async function updateEventCost(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const { id, eventID, ticketCost } = req.body; // ID aus dem Body

        if (!id) {
            res.status(400).json({ message: 'ID wird benötigt' });
            return;
        }

        const eventCost = await EventCosts.findByPk(id);

        if (!eventCost) {
            res.status(404).json({ message: 'EventCost nicht gefunden' });
            return;
        }

        eventCost.eventID = eventID;
        eventCost.ticketCost = ticketCost;

        await eventCost.save();

        res.status(200).json(eventCost);
    } catch (error: any) {
        console.error('Fehler beim Aktualisieren von EventCosts:', error.message);
        next(error);
    }
}

// Funktion zum Löschen eines EventCosts
export async function deleteEventCost(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const { id } = req.body; // ID aus dem Body

        if (!id) {
            res.status(400).json({ message: 'ID wird benötigt' });
            return;
        }

        const eventCost = await EventCosts.findByPk(id);

        if (!eventCost) {
            res.status(404).json({ message: 'EventCost nicht gefunden' });
            return;
        }

        await eventCost.destroy();

        res.status(200).json({ message: 'EventCost erfolgreich gelöscht' });
    } catch (error: any) {
        console.error('Fehler beim Löschen von EventCosts:', error.message);
        next(error);
    }
}
    */