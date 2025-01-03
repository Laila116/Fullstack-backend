import express from 'express';
import {createUser, getUserData, updateUserData, deleteUser } from '../controller/cUser.js';
import { createFeedback } from '../controller/cFeedback.js';
import { createEventCost, getEventCost, updateEventCost, deleteEventCost } from '../controller/cEventCosts.js';
import { createTransaction, getTransaction, updateTransaction, deleteTransaction } from '../controller/cTransactions.js';
import { createBooking, getBooking, getAllBookings, updateBooking, deleteBooking } from '../controller/cBookings.js';
import { createEvent, getAllEvents, getEventByName, updateEvent, deleteEvent} from "../controller/cEvent.js";

const router = express.Router();

// Nutzer-Routen
router.post('/user/createUser', createUser);
router.post('/user/getUserData', getUserData);
router.put('/user/updateUserData', updateUserData);
router.delete('/user/deleteUser', deleteUser);

// Feedback-Routen
router.post('/feedback/createFeedback', createFeedback);

// EventCosts-Routen
router.post('/eventCosts/create', createEventCost);
router.get('/eventCosts', getEventCost); // als Params 
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
//router.get('/bookings', getAllBookings);
//router.put('/booking/update', updateBooking);
router.delete('/booking/delete', deleteBooking);

// Event-Routen
router.post("/events/createEvent", createEvent);
router.get("/events", getAllEvents);
router.get("/events/:name", getEventByName);
router.put("/events/updateEvent", updateEvent);
router.delete("/events/deleteEvent", deleteEvent);

export { router };
