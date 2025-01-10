import { Request, Response, NextFunction } from "express";
import { sequelize } from "../databaseConnection/postgres";
import EventCosts from "../databaseSchema/postgresModels/mEventCosts";
import Bookings from "../databaseSchema/postgresModels/mBookings";
import Users from "../databaseSchema/postgresModels/mUser";
import Event from "../databaseSchema/mongoModels/mEvent";

export async function createBooking (req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const { userEmail, eventID, ticketBeschreibung, numberOfTickets } = req.body;
        if (!userEmail || !eventID || !ticketBeschreibung || !numberOfTickets) {
            res.status(400).json({ error: 'Missing required fields' });
            return;
        }

        const user = await Users.findOne({ where: { email: userEmail } });
        if (!user) {
            res.status(404).json({ message: "Benutzer nicht gefunden" });
            return;
        }

        const event = await Event.findById(eventID);
        if (!event) {
            res.status(404).json({ message: "Event nicht gefunden" });
            return;
        }

        const eventCost = await EventCosts.findOne({where: { eventID, ticketBeschreibung }});
        if (!eventCost) {
            res.status(404).json({ message: "Ticket-Typ nicht gefunden" });
            return;
        }

        if (eventCost.verfuegbarTickets < numberOfTickets) {
            res.status(400).json({ message: "Nicht genügend verfügbare Tickets" });
            return;
        }

        const totalPrice = eventCost.ticketCost * numberOfTickets;
        if (user.balance < totalPrice) {
            res.status(400).json({ message: "Nicht genügend Guthaben" });
            return;
        }

        await sequelize.transaction(async (t) => {
            user.balance -= totalPrice;
            await user.save({ transaction: t });

            eventCost.verfuegbarTickets -= numberOfTickets;
            await eventCost.save({ transaction: t });

            const booking = await Bookings.create(
                {
                useremail: userEmail,
                eventID,
                numberOfTickets,
                totalPrice,
                bookingDate: new Date(),
                },
                { transaction: t }
            );

            res.status(201).json({message: "Buchung erfolgreich erstellt", booking});
        });
    } catch (error: any) {
        console.error("Fehler beim Erstellen der Buchung:", error.message);
        res.status(500).json({ message: "Ein Fehler ist aufgetreten", error });
        next(error);
    }
}

export async function getUserAllBooking(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const userEmail = req.body.email;
        if (!userEmail) {
            res.status(400).json({ error: 'Email is missing' });
            return;
        }

        const user = await Users.findOne({ where: { email: userEmail } });
        if (!user) {
            res.status(404).json({ message: "Benutzer nicht gefunden" });
            return;
        }

        const bookings = await Bookings.findAll({ where: { useremail: userEmail } });
        if (!bookings || bookings.length === 0) {
            res.status(404).json({ message: 'Keine Buchungen für diesen Benutzer gefunden' });
            return;
        }

        res.status(200).json({ message: 'Alle Buchungen erfolgreich abgerufen', bookings });
    } catch (error: any) {
        console.error('Fehler beim Abrufen der Buchungen:', error.message);
        res.status(500).json({ message: 'Ein unerwarteter Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.' });
        next(error);
    }
}
