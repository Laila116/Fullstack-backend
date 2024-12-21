import { Request, Response, NextFunction } from 'express';
import Booking from '../databaseSchema/postgresModels/bookings';

// POST: Buchung erstellen
export async function createBooking(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const { useremail, eventID, numberOfTickets, totalPrice } = req.body;

        const newBooking = await Booking.create({
            useremail,
            eventID,
            numberOfTickets,
            totalPrice,
        });

        res.status(201).json(newBooking);
    } catch (error: any) {
        console.error('Fehler beim Erstellen der Buchung:', error.message);
        next(error);
    }
}

// GET: Buchung abrufen (mit ID)
export async function getBooking(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const { id } = req.params;

        const booking = await Booking.findByPk(id);

        if (!booking) {
            res.status(404).json({ message: 'Buchung nicht gefunden' });
            return;
        }

        res.status(200).json(booking);
    } catch (error: any) {
        console.error('Fehler beim Abrufen der Buchung:', error.message);
        next(error);
    }
}

// GET: Alle Buchungen abrufen
export async function getAllBookings(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const bookings = await Booking.findAll();

        if (!bookings || bookings.length === 0) {
            res.status(404).json({ message: 'Keine Buchungen gefunden' });
            return;
        }

        res.status(200).json(bookings);
    } catch (error: any) {
        console.error('Fehler beim Abrufen aller Buchungen:', error.message);
        next(error);
    }
}

// PUT: Buchung aktualisieren (mit ID)
export async function updateBooking(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const { id } = req.params;
        const { numberOfTickets, totalPrice } = req.body;

        const booking = await Booking.findByPk(id);

        if (!booking) {
            res.status(404).json({ message: 'Buchung nicht gefunden' });
            return;
        }

        booking.numberOfTickets = numberOfTickets;
        booking.totalPrice = totalPrice;
        await booking.save();

        res.status(200).json(booking);
    } catch (error: any) {
        console.error('Fehler beim Aktualisieren der Buchung:', error.message);
        next(error);
    }
}

// DELETE: Buchung löschen (mit ID)
export async function deleteBooking(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const { id } = req.params;

        const booking = await Booking.findByPk(id);

        if (!booking) {
            res.status(404).json({ message: 'Buchung nicht gefunden' });
            return;
        }

        await booking.destroy();

        res.status(200).json({ message: 'Buchung erfolgreich gelöscht' });
    } catch (error: any) {
        console.error('Fehler beim Löschen der Buchung:', error.message);
        next(error);
    }
}

//export { createBooking, getAllBooking, getAllBookings, updateBooking, deleteBooking };
