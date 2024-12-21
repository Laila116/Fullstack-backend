import { Request, Response, NextFunction } from 'express';
import Transaction from '../databaseSchema/postgresModels/transactions';

// Funktion zum Erstellen einer neuen Transaktion
async function createTransaction(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const { userEmail, amount, transactionType } = req.body;

        const transactionData = {
            userEmail,
            amount,
            transactionType,
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
async function getTransaction(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const { id } = req.params;

        const transaction = await Transaction.findByPk(id);

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
async function updateTransaction(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const { id } = req.params;
        const { userEmail, amount, transactionType } = req.body;

        const transaction = await Transaction.findByPk(id);

        if (!transaction) {
            res.status(404).json({ message: 'Transaktion nicht gefunden' });
            return;
        }

        transaction.useremail = userEmail;
        transaction.amount = amount;
        transaction.transactionID = transactionType;

        await transaction.save();

        res.status(200).json(transaction);
    } catch (error: any) {
        console.error('Fehler beim Aktualisieren der Transaktion:', error.message);
        next(error);
    }
}

// Funktion zum Löschen einer Transaktion
async function deleteTransaction(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const { id } = req.params;

        const transaction = await Transaction.findByPk(id);

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
}

export { createTransaction, getTransaction, updateTransaction, deleteTransaction };
