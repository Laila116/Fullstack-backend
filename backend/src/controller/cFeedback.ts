import { Request, Response, NextFunction } from "express";
import Feedback from "../databaseSchema/mongoModels/mFeedback";
import Users from "../databaseSchema/postgresModels/mUser"; 
import Event from "../databaseSchema/mongoModels/mEvent";

export async function createFeedback(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const { eventID, userEmail, feedback, comment } = req.body;
        if (!eventID || !userEmail || !feedback || !comment) {
            res.status(400).json({ error: 'Die folgenden Felder sind erforderlich: eventID, userEmail, feedback, comment.' });
            return;
        }

        const eventExists = await Event.findOne({ _id: eventID });
        if (!eventExists) {
            res.status(404).json({ message: 'Das Event mit der angegebenen Event-ID existiert nicht.' });
            return;
        }

        const userExists = await Users.findOne({ where: { email: userEmail } });
        if (!userExists) {
            res.status(404).json({ message: 'Benutzer mit der angegebenen E-Mail-Adresse existiert nicht.' });
            return;
        }
        
        const feedbackData = await Feedback.create({
            eventID,
            userEmail,
            feedback,
            comment
        });        

        res.status(201).json({ message: 'Feedback erfolgreich erstellt.', feedback: feedbackData });
    } catch (error: any) {
        console.error('Fehler beim Erstellen des Feedbacks:', error.message);
        res.status(500).json({ message: 'Ein Fehler ist beim Erstellen des Feedbacks aufgetreten. Bitte versuchen Sie es später erneut.' });
        next(error);
    }
}

export async function getUserAllFeedback(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const userEmail = req.body.email;
        if (!userEmail) {
            res.status(400).json({ error: 'Die Benutzer-E-Mail ist erforderlich.' });
            return;
        }

        const userExists = await Users.findOne({ where: { email: userEmail } });
        if (!userExists) {
            res.status(404).json({ message: 'Benutzer mit der angegebenen E-Mail-Adresse existiert nicht.' });
            return;
        }

        const feedback = await Feedback.find({ userEmail });
        if (feedback.length === 0) {
            res.status(404).json({ message: 'Es wurden keine Feedbacks für diesen Benutzer gefunden.' });
            return;
        }

        res.status(200).json({ message: 'Alle Feedbacks erfolgreich abgerufen.', feedback });
    } catch (error: any) {
        console.error('Fehler beim Abrufen der Feedbacks:', error.message);
        res.status(500).json({ message: 'Ein Fehler ist beim Abrufen der Feedbacks aufgetreten. Bitte versuchen Sie es später erneut.' });
        next(error);
    }
}