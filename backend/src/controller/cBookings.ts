import { Request, Response, NextFunction } from "express";
import { sequelize } from "../databaseConnection/postgres";
import EventCosts from "../databaseSchema/postgresModels/mEventCosts";
import Bookings from "../databaseSchema/postgresModels/mBookings";
import Users from "../databaseSchema/postgresModels/mUser";
import Event from "../databaseSchema/mongoModels/mEvent";
import ErrorMessages from "./fehlerMeldung";

export async function createBooking(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const { userEmail, eventID, ticketBeschreibung, numberOfTickets } = req.body;
        if (!userEmail || !eventID || !ticketBeschreibung || !numberOfTickets) {
            return next(ErrorMessages.MissingFields);
        }

        const user = await Users.findOne({ where: { email: userEmail } });
        if (!user) {
            return next(ErrorMessages.UserNotFound);
        }

        const event = await Event.findById(eventID);
        if (!event) {
            return next(ErrorMessages.EventNotFound);
        }

        const eventCost = await EventCosts.findOne({ where: { eventID, ticketBeschreibung } });
        if (!eventCost) {
            return next(ErrorMessages.TicketTypeNotFound);
        }

        if (eventCost.verfuegbarTickets < numberOfTickets) {
            return next(ErrorMessages.InsufficientTickets(eventCost.verfuegbarTickets));
        }

        const totalPrice = eventCost.ticketCost * numberOfTickets;
        if (user.balance < totalPrice) {
            return next(ErrorMessages.InsufficientBalance(totalPrice, user.balance));
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

            res.status(201).json({ message: "Buchung erfolgreich erstellt.", booking });
        });
    } catch (error) {
        next(ErrorMessages.InternalServerError);
    }
}

export async function getUserAllBooking(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const userEmail = req.body.email;
    
        if (!userEmail) {
            return next(ErrorMessages.MissingFields);
        }

        const user = await Users.findOne({ where: { email: userEmail } });
        if (!user) {
            return next(ErrorMessages.UserNotFound);
        }

        const bookings = await Bookings.findAll({ where: { useremail: userEmail } });
        if (!bookings || bookings.length === 0) {
            return next(ErrorMessages.NoBookingsFound);
        }

        res.status(200).json({ message: 'Alle Buchungen erfolgreich abgerufen.', bookings });
    } catch (error: any) {
        next(ErrorMessages.InternalServerError);
    }
}
