import express from 'express';
import {createUser, deleteUser, getUserData} from '../controller/user.js';
import { createFeedback } from '../controller/feedback.js';
import { createEventCost, getEventCost, updateEventCost, deleteEventCost } from '../controller/eventCosts.js';
import { createTransaction, getTransaction, updateTransaction, deleteTransaction } from '../controller/transactions.js';
import { createBooking, getBooking, getAllBookings, updateBooking, deleteBooking } from '../controller/bookings.js';

const router = express.Router();

// Nutzer-Routen
router.post('/user/createUser', createUser);
router.delete('/user/deleteUser', deleteUser);
router.get('/user/getUserData', getUserData);

// Feedback-Routen
router.post('/feedback/createFeedback', createFeedback);

// EventCosts-Routen
router.post('/eventCosts/create', createEventCost);
router.get('/eventCosts', getEventCost);
router.put('/eventCosts/update', updateEventCost);
router.delete('/eventCosts/delete', deleteEventCost);

// Transaktion-Routen
router.post('/transaction/create', createTransaction);
router.post('/transaction/get', getTransaction);
router.put('/transaction/update', updateTransaction);
router.delete('/transaction/delete', deleteTransaction);

// Bookings-Routen
router.post('/booking/create', createBooking);
router.post('/booking/get', getBooking); // um eine spezifische Buchung abzurufen
router.get('/bookings', getAllBookings);
router.put('/booking/update', updateBooking);
router.delete('/booking/delete', deleteBooking);

export { router };
