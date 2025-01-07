import { Request, Response, NextFunction } from 'express';
import Transaction from '../databaseSchema/postgresModels/mTransactions';
import { iTransactions } from '../interface/iTransactions';
/*
// Funktion zum Erstellen einer neuen Transaktion
export async function createTransaction(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const { useremail, amount, type } = req.body;

        const transactionData: iTransactions = {
            useremail,
            amount,
            type,
            date: new Date(),
            transactionID: 0, // Sicherstellen, dass der Wert gesetzt wird (dieser wird später von der DB überschrieben)
        };

        const newTransaction = await Transaction.create(transactionData);

        res.status(201).json({
            message: 'Transaktion erfolgreich erstellt',
            transaction: newTransaction,
        });
    } catch (error: any) {
        console.error('Fehler beim Erstellen der Transaktion:', error.message);
        next(error);
    }
}

// Funktion zum Abrufen einer Transaktion
export async function getTransaction(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const { transactionID } = req.body;

        const transaction = await Transaction.findOne({ where: { transactionID } });

        if (!transaction) {
            res.status(404).json({ message: 'Transaktion nicht gefunden' });
            return;
        }

        res.status(200).json(transaction);
    } catch (error: any) {
        console.error('Fehler beim Abrufen der Transaktion:', error.message);
        next(error);
    }
}

// Funktion zum Aktualisieren einer Transaktion
export async function updateTransaction(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const { transactionID, useremail, amount, type } = req.body;

        const transaction = await Transaction.findOne({ where: { transactionID } });

        if (!transaction) {
            res.status(404).json({ message: 'Transaktion nicht gefunden' });
            return;
        }

        transaction.useremail = useremail;
        transaction.amount = amount;
        transaction.type = type;

        await transaction.save();

        res.status(200).json(transaction);
    } catch (error: any) {
        console.error('Fehler beim Aktualisieren der Transaktion:', error.message);
        next(error);
    }
}

// Funktion zum Löschen einer Transaktion
export async function deleteTransaction(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const { transactionID } = req.body;

        const transaction = await Transaction.findOne({ where: { transactionID } });

        if (!transaction) {
            res.status(404).json({ message: 'Transaktion nicht gefunden' });
            return;
        }

        await transaction.destroy();

        res.status(200).json({ message: 'Transaktion erfolgreich gelöscht' });
    } catch (error: any) {
        console.error('Fehler beim Löschen der Transaktion:', error.message);
        next(error);
    }
}*/