import { Request, Response, NextFunction } from 'express';
import { users } from '../models/user.js';

async function createUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const { firstname, surname, phone, birthday, email, password, balance } = req.body;

        console.log(firstname, surname, phone, birthday, email, password, balance);

        // Validierung der notwendigen Felder
        if (!firstname || !surname || !password || !balance == null) {
            //return res.status(400).json({ error: 'Missing required fields' });
        }

        // Nutzer erstellen
        const newUser = await users.create({
            firstname,
            surname,
            phone: phone || null,
            birthday,
            email: email || null,
            password,
            balance,
        });

        res.status(201).json({ message: 'Nutzer erfolgreich erstellt', user: newUser });
    } catch (error) {
        //console.error('Fehler beim Erstellen eines Nutzers:', error.message);
        next(error);
    }
}

async function deleteUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const customerid = req.query.customerid as string;

        // Validierung, ob customerid angegeben wurde
        if (!customerid) {
            //return res.status(400).json({ error: 'customerid is required' });
        }

        // Nutzer löschen
        const deleted = await users.destroy({
            where: { customerid },
        });

        if (deleted === 0) {
            //return res.status(404).json({ message: `Nutzer mit customerid ${customerid} nicht gefunden` });
        }

        res.status(200).json({ message: `Nutzer mit customerid ${customerid} erfolgreich gelöscht` });
    } catch (error) {
        //console.error('Fehler beim Löschen eines Nutzers:', error.message);
        next(error);
    }
}

// Beispiel für die getUserData-Funktion
async function getUserData(req: Request, res: Response, next: NextFunction): Promise<void> {
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
