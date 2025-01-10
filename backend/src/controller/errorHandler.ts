import { CustomError } from './fehlerMeldung';
import { Response } from 'express';

function handleError(error: any, res: Response) {
    if (error instanceof CustomError) {
        res.status(error.statusCode).json({ error: error.message });
    } else {
        res.status(500).json({ error: 'Ein unerwarteter Fehler ist aufgetreten' });
    }
}

function sendResponse(res: Response, statusCode: number, message: string) {
    return res.status(statusCode).json({ message });
}

export {handleError, sendResponse}