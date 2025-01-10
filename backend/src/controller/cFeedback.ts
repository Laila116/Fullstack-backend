import { Request, Response, NextFunction } from "express";
import Feedback from "../databaseSchema/mongoModels/mFeedback";
import Users from "../databaseSchema/postgresModels/mUser"; 
import Event  from "../databaseSchema/mongoModels/mEvent";

export async function createFeedback(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const { eventID, userEmail, feedback, comment } = req.body;
        if (!eventID || !userEmail || !feedback || !comment) {
            res.status(400).json({ error: 'Missing required fields' });
            return;
        }

        const eventExists = await Event.findOne({ _id: eventID });
        if (!eventExists) {
            res.status(400).json({ message: 'Event-ID existiert nicht' });
            return;
        }

        const userExists = await Users.findOne({ where: { email: userEmail } });
        if (!userExists) {
            res.status(400).json({ message: 'Benutzer-E-Mail existiert nicht' });
            return;
        }
        
        const feedbackData = await Feedback.create({
            eventID,
            userEmail,
            feedback,
            comment
        });        

        res.status(201).json({ message: 'Feedback erfolgreich erstellt', feedback: feedbackData });
    } catch (error:any) {
        console.error('Fehler beim Erstellen eines Nutzers:', error.message);
        res.status(500).json({ message: 'Ein unerwarteter Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.' });
        next(error);
    }
}

export async function getUserAllFeedback(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const userEmail = req.body.email;
        if (!userEmail) {
            res.status(400).json({ error: 'Email is missing' });
            return;
        }

        const userExists = await Users.findOne({ where: { email: userEmail } });
        if (!userExists) {
            res.status(400).json({ message: 'Benutzer-E-Mail existiert nicht' });
            return;
        }

        const feedback = await Feedback.find({ userEmail });

        res.status(200).json({ message: 'Alle Feedbacks erfolgreich abgerufen', feedback });
    } catch (error: any) {
        console.error('Fehler beim Abrufen der Feedbacks:', error.message);
        res.status(500).json({ message: 'Ein unerwarteter Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.' });
        next(error);
    }
}