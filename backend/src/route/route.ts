import express from 'express';
import {createUser, deleteUser, getUserData} from '../controller/user.js';
import { createFeedback } from '../controller/feedback.js';
import { createEventCost, getEventCost, updateEventCost, deleteEventCost } from '../controller/eventCosts.js';
import { createTransaction, getTransaction, updateTransaction, deleteTransaction } from '../controller/transactions.js';
import { createBooking, getBooking, getAllBookings, updateBooking, deleteBooking } from '../controller/bookings.js';

const router = express.Router();

// POST Route zum Erstellen eines Nutzers
router.post('/user/createUser', createUser);

// DELETE Route zum Löschen eines Nutzers (mit ID)
router.delete('/user/deleteUser', deleteUser);

// GET Route zum Abrufen von Nutzerdaten (mit ID)
router.get('/user/getUserData', getUserData);




// POST Route zum Erstellen eines komentars
router.post('/feedback/createFeedback', createFeedback);

// GET Route zum Abrufen von EventCosts (mit ID)
router.get('/eventCosts/:id', getEventCost);

// PUT Route zum Aktualisieren eines EventCosts (mit ID)
router.put('/eventCosts/:id', updateEventCost);

// DELETE Route zum Löschen eines EventCosts (mit ID)
router.delete('/eventCosts/:id', deleteEventCost);




// POST Route für Transaktion erstellen
router.post('/transaction', createTransaction);

// GET Route für eine einzelne Transaktion
router.get('/transaction/:id', getTransaction);

// PUT Route für Transaktion aktualisieren
router.put('/transaction/:id', updateTransaction);

// DELETE Route für Transaktion löschen
router.delete('/transaction/:id', deleteTransaction);





// POST Route zum Erstellen einer Buchung
router.post('/booking', createBooking);

// GET Route zum Abrufen einer Buchung (mit ID)
router.get('/booking/:id', getBooking);

// GET Route zum Abrufen aller Buchungen
router.get('/bookings', getAllBookings);

// PUT Route zum Aktualisieren einer Buchung (mit ID)
router.put('/booking/:id', updateBooking);

// DELETE Route zum Löschen einer Buchung (mit ID)
router.delete('/booking/:id', deleteBooking);

export { router };
