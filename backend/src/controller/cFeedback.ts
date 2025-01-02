import { Request, Response, NextFunction } from 'express';
import Feedback from '../databaseSchema/mongoModels/mFeedback';

async function createFeedback(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const { eventID, userEmail, feedback, comment } = req.body;
        console.log( eventID, userEmail, feedback, comment);
        
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
  
export { createFeedback };
