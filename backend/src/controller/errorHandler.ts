import { Request, Response, NextFunction } from "express";
import { CustomError } from './fehlerMeldung';

function errorHandler(error: any, req: Request, res: Response, next: NextFunction) {
    if (error instanceof CustomError) {
        res.status(error.statusCode).json({ error: error.message });
    } else {
        res.status(500).json({ error: 'Ein unerwarteter Fehler ist aufgetreten' });
    }
}
/*
function sendResponse(res: Response, statusCode: number, message: string) {
    return res.status(statusCode).json({ message });
}

export {handleError, sendResponse}
*/
export default errorHandler;