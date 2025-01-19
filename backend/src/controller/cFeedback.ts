import { Request, Response, NextFunction } from "express";
import Feedback from "../databaseSchema/mongoModels/mFeedback";
import Users from "../databaseSchema/postgresModels/mUser"; 
import Event from "../databaseSchema/mongoModels/mEvent";
import ErrorMessages from "./fehlerMeldung";

export async function createFeedback(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const { eventID, userEmail, feedback, comment } = req.body;
        if (!eventID || !userEmail || !feedback || !comment) {
            return next(ErrorMessages.MissingFields);
        }

        const eventExists = await Event.findOne({ _id: eventID });
        if (!eventExists) {
            return next(ErrorMessages.EventNotFound);
        }

        const userExists = await Users.findOne({ where: { email: userEmail } });
        if (!userExists) {
            return next(ErrorMessages.UserNotFound);
        }
        
        const feedbackData = await Feedback.create({
            eventID,
            userEmail,
            feedback,
            comment
        });        

        res.status(201).json({ message: 'Feedback erfolgreich erstellt.', feedback: feedbackData });
    } catch (error) {
        next(ErrorMessages.InternalServerError);
    }
}

export async function getUserAllFeedback(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const userEmail = req.body.email;
        if (!userEmail) {
            return next(ErrorMessages.MissingFields);
        }

        const userExists = await Users.findOne({ where: { email: userEmail } });
        if (!userExists) {
            return next(ErrorMessages.UserNotFound);
        }

        const feedback = await Feedback.find({ userEmail });
        if (feedback.length === 0) {
            return next(ErrorMessages.NoFeedbacksForUserFound);
        }

        res.status(200).json({ message: 'Alle Feedbacks erfolgreich abgerufen.', feedback });
    } catch (error) {
        next(ErrorMessages.InternalServerError);
    }
}