import { Request, Response, NextFunction } from 'express';
import Feedback from '../databaseSchema/mongoModels/mFeedback';
import { Users } from '../databaseSchema/postgresModels/mUser'; 
import Events  from '../databaseSchema/mongoModels/mEvent';
import mongoose from 'mongoose';

export async function createFeedback(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const { eventID, userEmail, feedback, comment } = req.body;
        console.log( eventID, userEmail, feedback, comment);

        // Überprüfen, ob die eventID existiert
        const eventExists = await Events.findOne({ _id: new mongoose.Types.ObjectId(eventID) });
        if (!eventExists) {
            res.status(400).json({ message: 'Event-ID existiert nicht' });
            return;
        }

        // Überprüfen, ob die userEmail existiert
        const userExists = await Users.findOne({ where: { email: userEmail } });
        if (!userExists) {
            res.status(400).json({ message: 'Benutzer-E-Mail existiert nicht' });
            return;
        }
        
        const feedbackData = {
            eventID,
            userEmail,
            feedback,
            comment
        };

        const newFeedback = new Feedback(feedbackData);
        
        await newFeedback.save();

        res.status(201).json({ message: 'Feedback erfolgreich erstellt', user: feedbackData });
        
    } catch (error:any) {
        console.error('Fehler beim Erstellen eines Nutzers:', error.message);
        next(error);
    }
}