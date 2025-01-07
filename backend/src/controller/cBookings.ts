import { Request, Response, NextFunction } from 'express';
import { sequelize } from "../databaseConnection/postgres"; // Pfad anpassen
import EventCosts from "../databaseSchema/postgresModels/mEventCosts";
import Bookings from "../databaseSchema/postgresModels/mBookings";
import Users from "../databaseSchema/postgresModels/mUser";
import Event from "../databaseSchema/mongoModels/mEvent";

// POST: Buchung erstellen
export const createBooking = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { userEmail, eventID, ticketBeschreibung, numberOfTickets } = req.body;
  
    try {
      // 1. Überprüfen, ob der Benutzer existiert
      const user = await Users.findOne({ where: { email: userEmail } });
      if (!user) {
        res.status(404).json({ message: "Benutzer nicht gefunden" });
        return;
      }
        // 2. Überprüfen, ob der Event-Ticket-Typ existiert und ob Tickets verfügbar sind
        const event = await Event.findById(eventID);
        if (!event) {
            res.status(404).json({ message: "Event nicht gefunden" });
            return;
        }

      // 2. Überprüfen, ob der Event-Ticket-Typ existiert und ob Tickets verfügbar sind
      const eventCost = await EventCosts.findOne({
        where: { eventID:eventID, ticketBeschreibung:ticketBeschreibung },
      });
      if (!eventCost) {
        res.status(404).json({ message: "Ticket-Typ nicht gefunden" });
        return;
      }
  
      // Verfügbare Tickets prüfen
      if (eventCost.verfuegbarTickets < numberOfTickets) {
        res.status(400).json({ message: "Nicht genügend verfügbare Tickets" });
        return;
      }
  
      // 3. Gesamtpreis berechnen
      const totalPrice = eventCost.ticketCost * numberOfTickets;
  
      // 4. Überprüfen, ob der Benutzer genügend Guthaben hat
      if (user.balance < totalPrice) {
        res.status(400).json({ message: "Nicht genügend Guthaben" });
        return;
      }
  
      // 5. Transaktion starten: Guthaben reduzieren, Tickets verringern, Buchung erstellen
      await sequelize.transaction(async (t) => { // stellt sicher, dass mehrere Änderungen an der Datenbank entweder alle zusammen erfolgreich durchgeführt werden oder gar keine, falls ein Fehler auftritt.
        // Benutzer-Guthaben reduzieren
        user.balance -= totalPrice;
        await user.save({ transaction: t });
  
        // Verfügbare Tickets reduzieren
        eventCost.verfuegbarTickets -= numberOfTickets;
        await eventCost.save({ transaction: t });
  
        // Buchung erstellen
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
  
        // Erfolgreiche Antwort senden
        res.status(201).json({
          message: "Buchung erfolgreich erstellt",
          booking,
        });
      });
    } catch (error: any) {
      console.error("Fehler beim Erstellen der Buchung:", error.message);
      res.status(500).json({ message: "Ein Fehler ist aufgetreten", error });
      next(error);
    }
};

export async function getUserAllBooking(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const userEmail = req.body.email as string;

        if (!userEmail) {
            res.status(400).json({ error: 'Email is missing' });
            return;
        }

        // Abrufen aller Buchungen für die angegebene E-Mail
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
