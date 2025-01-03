import { Request, Response, NextFunction } from 'express';
import { Users } from '../databaseSchema/postgresModels/mUser.js';
import { Address } from '../databaseSchema/postgresModels/mAddress.js';
import Feedback from '../databaseSchema/mongoModels/mFeedback';

export async function createUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const { email, password, firstname, surname, phone, birthday, role, city, postcode, street, houseNumber } = req.body;
        console.log(email, password, firstname, surname, phone, birthday, role, city, postcode, street, houseNumber);

        // Validierung der notwendigen Felder
        if (!email || !password || !firstname || !surname || !phone || !birthday || !role || !city || !postcode || !street || ! houseNumber) {
            res.status(400).json({ error: 'Missing required fields' });
            return;
        }

        // Prüfen, ob die E-Mail bereits existiert
        const user = await Users.findOne ({ where: { email: email } });

        if (user){
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
            balance: 0.0, // Balance explizit setzen
            role,
        });

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

export async function getUserData(req: Request, res: Response, next: NextFunction): Promise<void> {
    const email = req.body.email as string;
    try {
        if (!email) {
            res.status(400).json({ error: 'Email is missing' });
            return;
        }

        const user = await Users.findOne ({ where: { email: email } });

        if (!user){
            res.status(404).json({ message: `Nutzer mit Email ${email} nicht gefunden` });
            return;
        }

        console.log(user);

        res.status(200).json({ message: `Daten des Nutzers mit Email: ${email}`, user: user });
    } catch (error:any) {
        console.error('User Abfrage ohne Ergebnis:', error.message);
        res.status(500).json({ message: 'Ein unerwarteter Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.' });
        next(error); // Fehler weiterleiten
    }
}

export async function updateUserData(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const { email, password, firstname, surname, phone, birthday, role, city, postcode, street, houseNumber } = req.body;
        console.log(email, password, firstname, surname, phone, birthday, role, city, postcode, street, houseNumber);

        // Validierung der notwendigen Felder
        if (!email || !password || !firstname || !surname || !phone || !birthday || !city || !postcode || !street || ! houseNumber) {
            res.status(400).json({ error: 'Missing required fields' });
            return;
        }

        const user = await Users.findOne({ where: { email: email } });
        const adress = await Address.findOne({ where: { useremail: email } });


        if (!user) {
            res.status(404).json({ message: 'User nicht gefunden' });
            return;
        }

        if (!adress) {
            res.status(404).json({ message: 'Adresse für diesen Benutzer nicht gefunden' });
            return;
        }

        user.password = password;
        user.firstname = firstname;
        user.surname = surname;
        user.phone = phone;
        user.birthday = birthday;

        await user.save();

        adress.city = city;
        adress.postcode = postcode;
        adress.street = street;
        adress.houseNumber = houseNumber;

        await adress.save();
        res.status(201).json({ message: 'Nutzer erfolgreich geändert', user, adress });
    } catch (error: any) {
        console.error('Fehler beim Aktualisieren der Buchung:', error.message);
        next(error);
    }
}

export async function deleteUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        /* test für delet feedback bei delet user 
        1.getUserData
        2.UserID raus schreiben in Variable 
        3.Mongo feedback tabelle. delet aufrufen mit user id

        also erst die feedbacks vom user lköschen und dann den user selbst lsöchen, das alles soll aber dann hier im deletUser passieren
        */
        const email = req.body.email;

        if (!email) {
            res.status(400).json({ error: 'Email is missing' });
            return;
        }

        const user = await Users.findOne ({ where: { email: email } });

        if (!user){
            res.status(404).json({ message: `Nutzer mit Email ${email} nicht gefunden` });
            return;
        }

        // Löschen aller zugehörigen Feedbacks in der MongoDB
        const feedbackDeletionResult = await Feedback.deleteMany({ userEmail: email });
        console.log(`Feedbacks gelöscht: ${feedbackDeletionResult.deletedCount}`);

        await user.destroy();

        res.status(200).json({ message: `Nutzer mit Email ${email} erfolgreich gelöscht` });
    } catch (error:any) {
        console.error('Fehler beim Löschen eines Nutzers:', error.message);
        res.status(500).json({ message: 'Ein unerwarteter Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.' });
        next(error);
    }
}