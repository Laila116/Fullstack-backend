import { Request, Response, NextFunction } from 'express';
import Users from '../databaseSchema/postgresModels/mUser.js';
import Address from '../databaseSchema/postgresModels/mAddress.js';
import Feedback from '../databaseSchema/mongoModels/mFeedback';

export async function createUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const { email, password, firstname, surname, phone, birthday, role, companyName, city, postcode, street, houseNumber } = req.body;
        console.log(email, password, firstname, surname, phone, birthday, role, companyName, city, postcode, street, houseNumber);

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
            companyName,
        });

        const newUserAddress = await Address.create({
            useremail: email,
            city,
            postcode,
            street,
            houseNumber,
        });
        //const newAddress = await Address.createAddress(newUserAddress);

        res.status(201).json({ message: 'Nutzer erfolgreich erstellt', newUser, newUserAddress });

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
        // Adresse des Benutzers abrufen
        const address = await Address.findOne({ where: { useremail: email } });

        if (!address) {
            res.status(404).json({ message: `Adresse für den Nutzer mit Email ${email} nicht gefunden` });
            return;
        }

        console.log(user, address);

        // Benutzer- und Adressdaten zurückgeben
        res.status(200).json({
            message: `Daten des Nutzers mit Email: ${email}`,
            user: user,
            address: address,
        });
    } catch (error:any) {
        console.error('User Abfrage ohne Ergebnis:', error.message);
        res.status(500).json({ message: 'Ein unerwarteter Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.' });
        next(error); // Fehler weiterleiten
    }
}

export async function updateUserData(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const { email, password, firstname, surname, phone, birthday, companyName, city, postcode, street, houseNumber } = req.body;
        console.log(email, password, firstname, surname, phone, birthday, city, companyName, postcode, street, houseNumber);

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
        user.companyName = companyName;

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

export async function getUserGuthaben(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const email = req.body.email as string;

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
        const email = req.body.email as string;
        const amount = req.body.amount as number;

        if (!email || amount == null || isNaN(amount)) {
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


        // Konvertiere balance in eine Zahl
        const currentBalance = parseFloat(user.balance.toString());

        // Addiere den Betrag
        const newBalance = currentBalance + amount;

        // Weise den neuen Wert zu (als String, um Sequelize zu entsprechen)
        user.balance = parseFloat(newBalance.toFixed(2));

        // Speichern
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
  
      // Validierung der erforderlichen Felder
      if (!email || !password) {
        res.status(400).json({ error: "E-Mail oder Passwort fehlt" });
        return;
      }
  
      // Überprüfen, ob der Nutzer existiert
      const user = await Users.findOne({ where: { email: email } });
  
      if (!user) {
        res.status(404).json({ message: "Nutzer nicht gefunden" });
        return;
      }
  
      // Überprüfung des Passworts
      if (user.password !== password) {
        res.status(401).json({ message: "Falsches Passwort" });
        return;
      }
  
      // Erfolg: Nutzer ist authentifiziert
      res.status(200).json({
        message: "Login erfolgreich",
        user: {
          email: user.email,
          firstname: user.firstname,
          surname: user.surname,
          role: user.role,
          balance: user.balance,
        },
      });
    } catch (error: any) {
      console.error("Fehler beim Login:", error.message);
      res.status(500).json({
        message: "Ein unerwarteter Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.",
      });
      next(error);
    }
}