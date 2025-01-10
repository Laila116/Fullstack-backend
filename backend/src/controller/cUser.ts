import { Request, Response, NextFunction } from "express";
import Users from "../databaseSchema/postgresModels/mUser.js";
import Address from "../databaseSchema/postgresModels/mAddress.js";
import Feedback from "../databaseSchema/mongoModels/mFeedback";

export async function createUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const { email, password, firstname, surname, phone, birthday, role, companyName, city, postcode, street, houseNumber } = req.body;
        if (!email || !password || !firstname || !surname || !phone || !birthday || !role || !city || !postcode || !street || !houseNumber) {
            res.status(400).json({ error: 'Missing required fields' });
            return;
        }

        const user = await Users.findOne({ where: { email: email } });
        if (user) {
            res.status(409).json({ error: 'User already exists' });
            return;
        }

        const newUser = await Users.create({
            email,
            password,
            firstname,
            surname,
            phone,
            birthday,
            balance: 0.0,
            role,
            companyName,
        });

        const newUserAddress = await Address.create({
            useremail: email,
            city,
            postcode,
            street,
            houseNumber,
        });

        res.status(201).json({ message: 'Nutzer erfolgreich erstellt', newUser, newUserAddress });
    } catch (error: any) {
        console.error('Fehler beim Erstellen eines Nutzers:', error.message);
        res.status(500).json({ message: 'Ein unerwarteter Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.' });
        next(error);
    }
}

export async function getUserData(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const email = req.body.email;
        if (!email) {
            res.status(400).json({ error: 'Email is missing' });
            return;
        }

        const user = await Users.findOne({ where: { email: email } });
        if (!user) {
            res.status(404).json({ message: `Nutzer mit Email ${email} nicht gefunden` });
            return;
        }

        const address = await Address.findOne({ where: { useremail: email } });
        if (!address) {
            res.status(404).json({ message: `Adresse für den Nutzer mit Email ${email} nicht gefunden` });
            return;
        }

        res.status(200).json({ message: `Daten des Nutzers mit Email: ${email}`, user: user, address: address });
    } catch (error: any) {
        console.error('User Abfrage ohne Ergebnis:', error.message);
        res.status(500).json({ message: 'Ein unerwarteter Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.' });
        next(error);
    }
}

export async function updateUserData(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const { email, password, firstname, surname, phone, birthday, companyName, city, postcode, street, houseNumber } = req.body;
        if (!email || !password || !firstname || !surname || !phone || !birthday || !city || !postcode || !street || !houseNumber) {
            res.status(400).json({ error: 'Missing required fields' });
            return;
        }

        const user = await Users.findOne({ where: { email: email } });
        if (!user) {
            res.status(404).json({ message: 'User nicht gefunden' });
            return;
        }

        const address = await Address.findOne({ where: { useremail: email } });
        if (!address) {
            res.status(404).json({ message: 'Adresse für diesen Benutzer nicht gefunden' });
            return;
        }

        user.password = password;
        user.firstname = firstname;
        user.surname = surname;
        user.phone = phone;
        user.birthday = birthday;
        user.companyName = companyName;
        await user.save();

        address.city = city;
        address.postcode = postcode;
        address.street = street;
        address.houseNumber = houseNumber;
        await address.save();

        res.status(200).json({ message: 'Nutzer erfolgreich geändert', user, address });
    } catch (error: any) {
        console.error('Fehler beim Aktualisieren der Daten:', error.message);
        res.status(500).json({ message: 'Ein unerwarteter Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.' });
        next(error);
    }
}

export async function deleteUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const email = req.body.email;
        if (!email) {
            res.status(400).json({ error: 'Email is missing' });
            return;
        }

        const user = await Users.findOne({ where: { email: email } });
        if (!user) {
            res.status(404).json({ message: `Nutzer mit Email ${email} nicht gefunden` });
            return;
        }

        await Feedback.deleteMany({ userEmail: email });

        await user.destroy();
        const deletedUser = await Users.findOne({ where: { email: email } });
        if (!deletedUser) {
            res.status(200).json({ message: `Nutzer mit Email ${email} erfolgreich gelöscht` });
            return;
        } else {
            res.status(404).json({ message: 'Benutzer konnte nicht gelöscht werden' });
            return;
        }
    } catch (error: any) {
        console.error('Fehler beim Löschen eines Nutzers:', error.message);
        res.status(500).json({ message: 'Ein unerwarteter Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.' });
        next(error);
    }
}

export async function getUserGuthaben(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const email = req.body.email;
        if (!email) {
            res.status(400).json({ error: 'Email is missing' });
            return;
        }

        const user = await Users.findOne({ where: { email: email } });
        if (!user) {
            res.status(404).json({ message: `Nutzer mit Email ${email} nicht gefunden` });
            return;
        }

        res.status(200).json({ message: 'Aktuelles Guthaben abgerufen', balance: user.balance });
    } catch (error: any) {
        console.error('Fehler beim Abrufen des Guthabens:', error.message);
        res.status(500).json({ message: 'Ein unerwarteter Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.' });
        next(error);
    }
}

export async function putUserGuthaben(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const { email, amount } = req.body;
        if (!email || !amount) {
            res.status(400).json({ error: 'Email oder Betrag fehlt oder ist ungültig' });
            return;
        }

        if (amount <= 0) {
            res.status(400).json({ error: 'Der Betrag muss größer als 0 sein' });
            return;
        }

        const user = await Users.findOne({ where: { email: email } });
        if (!user) {
            res.status(404).json({ message: `Nutzer mit Email ${email} nicht gefunden` });
            return;
        }

        const currentBalance = parseFloat(user.balance.toString());
        const newBalance = currentBalance + amount;
        user.balance = parseFloat(newBalance.toFixed(2));
        await user.save();
        
        res.status(200).json({ message: 'Guthaben erfolgreich aufgeladen', newBalance: user.balance });
    } catch (error: any) {
        console.error('Fehler beim Aufladen des Guthabens:', error.message);
        res.status(500).json({ message: 'Ein unerwarteter Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.' });
        next(error);
    }
}

export async function loginUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(400).json({ error: 'E-Mail oder Passwort fehlt' });
            return;
        }
    
        const user = await Users.findOne({ where: { email: email } });    
        if (!user) {
            res.status(404).json({ message: 'Nutzer nicht gefunden' });
            return;
        }
    
        if (user.password !== password) {
            res.status(401).json({ message: 'Falsches Passwort' });
            return;
        }
    
        res.status(200).json({ message: 'Login erfolgreich', user: { email: user.email, firstname: user.firstname, surname: user.surname, role: user.role, balance: user.balance } });
    } catch (error: any) {
        console.error('Fehler beim Login:', error.message);
        res.status(500).json({ message: 'Ein unerwarteter Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.' });
        next(error);
    }
}