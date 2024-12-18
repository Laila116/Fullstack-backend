import { Request, Response, NextFunction } from 'express';
import { Users } from '../databaseSchema/postgresModels/user.js';
import { Address } from '../databaseSchema/postgresModels/address.js';

async function createUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const { email, password, firstname, surname, phone, birthday, city, postcode, street, houseNumber } = req.body;
        console.log(email, password, firstname, surname, phone, birthday, city, postcode, street, houseNumber);

        // Validierung der notwendigen Felder
        if (!email || !password || !firstname || !surname || !phone || !birthday || !city || !postcode || !street || ! houseNumber) {
            res.status(400).json({ error: 'Missing required fields' });
            return;
        }

        // Prüfen, ob die E-Mail bereits existiert
        const existingUser = await Users.getUserData(email);
        if (existingUser) {
            res.status(409).json({ error: 'User already exists' });
            return;
        }

        const newUserData = {
            email,
            password,
            firstname,
            surname,
            phone,
            birthday,
            balance: 0.0, // Balance explizit setzen
        }
        const newUser = await Users.createUser(newUserData);

        const newUserAddress = {
            useremail: email,
            city,
            postcode,
            street,
            houseNumber,
        }
        const newAddress = await Address.createAddress(newUserAddress);

        res.status(201).json({ message: 'Nutzer erfolgreich erstellt', newUser, newAddress });

    } catch (error:any) {
        console.error('Fehler beim Erstellen eines Nutzers:', error.message);
        res.status(404).json({ message: `Nutzer konnte nicht erstellt werden` });
        next(error);
    }
}

async function deleteUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    const email = req.query.email as string;
    try {
        if (!email) {
            res.status(400).json({ error: 'Email is missing' });
            return;
        }
        
        const deleted = await Users.deleteUser(email);
        console.log(deleted);

        res.status(200).json({ message: `Nutzer mit Email ${email} erfolgreich gelöscht` });
    } catch (error:any) {
        console.error('Fehler beim Löschen eines Nutzers:', error.message);
        res.status(404).json({ message: `Nutzer mit Email ${email} nicht gefunden` });
        next(error);
    }
}

async function getUserData(req: Request, res: Response, next: NextFunction): Promise<void> {
    const email = req.query.email as string;
    try {
        console.log(email);

        var Userselceted = await Users.getUserData(email);
        console.log(Userselceted);

        res.status(200).json({ message: `Daten des Nutzers mit Email: ${email}`, Userselceted });
    } catch (error:any) {
        console.error('Fehler beim lesen eines Nutzers:', error.message);
        res.status(404).json({ message: `Nutzer mit Email ${email} nicht gefunden` });
        next(error); // Fehler weiterleiten
    }
}

export { createUser, deleteUser, getUserData };
