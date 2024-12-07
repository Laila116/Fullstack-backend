import { Request, Response, NextFunction } from 'express';
import { users } from '../models/user.js';

// Beispiel für die createUser-Funktion
async function createUser(req: Request, res: Response, next: NextFunction) {
    try {
        // Deine Logik zum Erstellen eines Nutzers
        // Beispiel: const user = await User.create(req.body);
        res.status(201).json({ message: 'Nutzer erfolgreich erstellt' });
    } catch (error) {
        next(error); // Fehler weiterleiten
    }
}

// Beispiel für die deleteUser-Funktion
async function deleteUser(req: Request, res: Response, next: NextFunction) {
    try {
        const userId = req.params.id; // ID aus URL-Parametern holen
        // Deine Logik zum Löschen eines Nutzers
        // Beispiel: const user = await User.findByIdAndDelete(userId);
        res.status(200).json({ message: 'Nutzer erfolgreich gelöscht' });
    } catch (error) {
        next(error); // Fehler weiterleiten
    }
}

// Beispiel für die getUserData-Funktion
async function getUserData(req: Request, res: Response, next: NextFunction) {
    try {
        const customerid = req.query.customerid as string;
        // Deine Logik zum Abrufen eines Nutzers
        // Beispiel: const user = await User.findById(userId);
        console.log(customerid);
        var test = await users.getUserData(customerid);
        console.log(test);
        res.status(200).json(test);
        // res.status(200).json({ message: `Daten des Nutzers mit ID: ${userId}` });
    } catch (error) {
        next(error); // Fehler weiterleiten
    }
}

export { createUser, deleteUser, getUserData };
