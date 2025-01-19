import { Request, Response, NextFunction } from "express";
import bcrypt from 'bcryptjs';
import Users from "../databaseSchema/postgresModels/mUser";
import Address from "../databaseSchema/postgresModels/mAddress";
import Feedback from "../databaseSchema/mongoModels/mFeedback";
import ErrorMessages from "./fehlerMeldung";

export async function createUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const { email, password, firstname, surname, phone, birthday, role, companyName, city, postcode, street, houseNumber } = req.body;
        if (!email || !password || !firstname || !surname || !phone || !birthday || !role || !city || !postcode || !street || !houseNumber) {
            return next(ErrorMessages.MissingFields);
        }

        const user = await Users.findOne({ where: { email: email } });
        if (user) {
            return next(ErrorMessages.UserExists);
        }

        const hashedPassword = await bcrypt.hash(password, 10); 
        const newUser = await Users.create({
            email,
            password:hashedPassword,
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
    } catch (error) {
        next(ErrorMessages.InternalServerError);
    }
}

export async function getUserData(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const email = req.body.email;
        if (!email) {
            return next(ErrorMessages.MissingFields);
        }

        const user = await Users.findOne({ where: { email: email },attributes: { exclude: ['password'] } });
        if (!user) {
            return next(ErrorMessages.UserNotFound);
        }

        const address = await Address.findOne({ where: { useremail: email } });
        if (!address) {
            return next(ErrorMessages.AddressNotFound);
        }

        res.status(200).json({ message: `Daten des Nutzers mit Email: ${email}`, user: user, address: address });
    } catch (error) {
        next(ErrorMessages.InternalServerError);
    }
}

export async function updateUserData(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const { email, password, firstname, surname, phone, birthday, companyName, city, postcode, street, houseNumber } = req.body;
        if (!email || !password || !firstname || !surname || !phone || !birthday || !city || !postcode || !street || !houseNumber) {
            return next(ErrorMessages.MissingFields);
        }

        const user = await Users.findOne({ where: { email: email } });
        if (!user) {
            return next(ErrorMessages.UserNotFound);
        }

        const address = await Address.findOne({ where: { useremail: email } });
        if (!address) {
            return next(ErrorMessages.AddressNotFound);
        }

        const hashedPassword = await bcrypt.hash(password, 10); 
        user.password = hashedPassword;
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
    } catch (error) {
        next(ErrorMessages.InternalServerError);
    }
}

export async function deleteUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const email = req.body.email;
        if (!email) {
            return next(ErrorMessages.MissingFields);
        }

        const user = await Users.findOne({ where: { email: email } });
        if (!user) {
            return next(ErrorMessages.UserNotFound);
        }

        await Feedback.deleteMany({ userEmail: email });

        await user.destroy();
        const deletedUser = await Users.findOne({ where: { email: email } });
        if (!deletedUser) {
            res.status(200).json({ message: `Nutzer mit Email ${email} erfolgreich gelöscht` });
            return;
        } else {
            return next(ErrorMessages.UserDeletFailed);
        }
    } catch (error) {
        next(ErrorMessages.InternalServerError);
    }
}

export async function getUserGuthaben(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const email = req.body.email;
        if (!email) {
            return next(ErrorMessages.MissingFields);
        }

        const user = await Users.findOne({ where: { email: email } });
        if (!user) {
            return next(ErrorMessages.UserNotFound);
        }

        res.status(200).json({ message: 'Aktuelles Guthaben abgerufen', balance: user.balance });
    } catch (error) {
        next(ErrorMessages.InternalServerError);
    }
}

export async function putUserGuthaben(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const { email, amount } = req.body;
        if (!email || !amount) {
            return next(ErrorMessages.MissingFields);
        }

        if (amount <= 0) {
            return next(ErrorMessages.AmountGreaterThanZero);
        }

        const user = await Users.findOne({ where: { email: email } });
        if (!user) {
            return next(ErrorMessages.UserNotFound);
        }

        const currentBalance = parseFloat(user.balance.toString());
        const newBalance = currentBalance + amount;
        user.balance = parseFloat(newBalance.toFixed(2));
        await user.save();
        
        res.status(200).json({ message: 'Guthaben erfolgreich aufgeladen', newBalance: user.balance });
    } catch (error) {
        next(ErrorMessages.InternalServerError);
    }
}

export async function loginUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const { email, password } = req.body;
     
        if (!email || !password) {
            return next(ErrorMessages.MissingFields);
        }
    
        const user = await Users.findOne({ where: { email: email } });    
        if (!user) {
            return next(ErrorMessages.UserNotFound);
        }
    
        
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return next(ErrorMessages.WrongPassword);
        }
    
        res.status(200).json({ message: 'Login erfolgreich', user: { email: user.email, firstname: user.firstname, surname: user.surname, role: user.role, balance: user.balance } });
    } catch (error) {
        next(ErrorMessages.InternalServerError);
    }
}