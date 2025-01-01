import { Request, Response, NextFunction } from 'express';
import { Users } from '../databaseSchema/postgresModels/mUser.js';
import { Address } from '../databaseSchema/postgresModels/mAddress.js';

async function createUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const { email, password, firstname, surname, phone, birthday, role, city, postcode, street, houseNumber } = req.body;
        console.log(email, password, firstname, surname, phone, birthday, role, city, postcode, street, houseNumber);

        // Validierung der notwendigen Felder
        if (!email || !password || !firstname || !surname || !phone || !birthday || !role || !city || !postcode || !street || ! houseNumber) {
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
            role,
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
        res.status(500).json({ message: 'Ein unerwarteter Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.' });
        next(error);
    }
}

async function getUserData(req: Request, res: Response, next: NextFunction): Promise<void> {
    const email = req.body.email as string;
    try {
        if (!email) {
            res.status(400).json({ error: 'Email is missing' });
            return;
        }

        var userSelected = await Users.getUserData(email);

        if (!userSelected){
            res.status(404).json({ message: `Nutzer mit Email ${email} nicht gefunden` });
            return;
        }

        console.log(userSelected);

        res.status(200).json({ message: `Daten des Nutzers mit Email: ${email}`, userSelected: userSelected });
    } catch (error:any) {
        console.error('User Abfrage ohne Ergebnis:', error.message);
        res.status(500).json({ message: 'Ein unerwarteter Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.' });
        next(error); // Fehler weiterleiten
    }
}

async function deleteUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    const email = req.body.email;
    try {
        if (!email) {
            res.status(400).json({ error: 'Email is missing' });
            return;
        }

        var userSelected = await Users.getUserData(email);

        if (!userSelected){
            res.status(404).json({ message: `Nutzer mit Email ${email} nicht gefunden` });
            return;
        }

        const deleted = await Users.deleteUser(email);
        console.log(deleted);

        res.status(200).json({ message: `Nutzer mit Email ${email} erfolgreich gelöscht` });
    } catch (error:any) {
        console.error('Fehler beim Löschen eines Nutzers:', error.message);
        res.status(500).json({ message: 'Ein unerwarteter Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.' });
        next(error);
    }
}

export { createUser, deleteUser, getUserData };
