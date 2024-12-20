import { Request, Response, NextFunction } from 'express';
import EventCosts from '../databaseSchema/postgresModels/eventCosts';
// import eventDetails 

// Funktion zum Erstellen eines neuen EventCosts
async function createEventCost(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const { eventID, ticketCost } = req.body; 

        const eventCostData = {
            eventID,
            ticketCost
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
async function getEventCost(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const { id } = req.params; // Extrahiert id aus der URL

        const eventCost = await EventCosts.findByPk(id); // Hole das EventCost aus der PostgreSQL-Datenbank

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
async function updateEventCost(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const { id } = req.params; 
        const { eventID, ticketCost } = req.body; // Daten aus dem Body

        const eventCost = await EventCosts.findByPk(id); // Sucht den Datenbank mit der ID

        if (!eventCost) {
            res.status(404).json({ message: 'EventCost nicht gefunden' });
            return;
        }

        // Aktualisieren des EventCosts
        eventCost.eventID = eventID;
        eventCost.ticketCost = ticketCost;

        await eventCost.save(); // Speichere die Änderungen

        res.status(200).json(eventCost);

    } catch (error: any) {
        console.error('Fehler beim Aktualisieren von EventCosts:', error.message);
        next(error);
    }
}

// Funktion zum Löschen eines EventCosts
async function deleteEventCost(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const { id } = req.params; 

        const eventCost = await EventCosts.findByPk(id); 

        if (!eventCost) {
            res.status(404).json({ message: 'EventCost nicht gefunden' });
            return;
        }

        await eventCost.destroy(); // Lösche das EventCost

        res.status(200).json({ message: 'EventCost erfolgreich gelöscht' });

    } catch (error: any) {
        console.error('Fehler beim Löschen von EventCosts:', error.message);
        next(error);
    }
}

export { createEventCost, getEventCost, updateEventCost, deleteEventCost };