import express from 'express';
import {createUser, getUserData, updateUserData, deleteUser, getUserGuthaben, putUserGuthaben, loginUser } from '../controller/cUser.js';
import { createFeedback, getUserAllFeedback } from '../controller/cFeedback.js';
//import { createEventCost, getEventCost, updateEventCost, deleteEventCost } from '../controller/cEventCosts.js';
//import { createTransaction, getTransaction, updateTransaction, deleteTransaction } from '../controller/cTransactions.js';
import { createBooking, /*getBooking, getAllBookings, updateBooking, deleteBooking,*/ getUserAllBooking } from '../controller/cBookings.js';
import { createEvent, getAllEvents, /*getEventByName,*/ updateEvent, deleteEvent, getSelectedEventData, getAllEventsByKategorieUndOrt, getKategorieUndOrt} from "../controller/cEvent.js";

const router = express.Router();
// Frontend Wichtige EndPunkte

// Home Seite
router.get('/event/getAllEvents',           getAllEvents);              // Events in Slinder und unten Anzeigen (Bild, Name, Ort)
//router.post('/event/getAllEventKategorie',  getAllEventsByKategorie);   // Filter von Events in dem Kategorie erstellen
//router.post('/event/getAllEventOrt',        getAllEventsByOrt);         // Filter von Events in dem Ort erstellen
//router.get('/event/getAllKategorien',       getAllKategorien);          // Filter von Ort erstellen
//router.get('/event/getAllOrte',             getAllOrte);                // Filter von Ort erstellen
router.post('/event/getAllEventsByKategorieUndOrt', getAllEventsByKategorieUndOrt); // Filter von Events in dem Kategorie und Ort erstellen
router.get('/event/getKategorieUndOrt',     getKategorieUndOrt);        // Filter von Kategorie und Ort erstellen
router.post('/event/getSelectedEventData',  getSelectedEventData);      // Ausgewählte Event Daten anzeigen (Alle daten von event und ticket und Feedbacks (''jedes feedback in dem event gegeben wurde'' ))
router.post('/event/createBooking',         createBooking);             // Ticket kaufen (Userguthaben verringern Anzahl von tickets verringern, Buchung für User erstellen )

// Login/ Register
router.post('/user/login',                  loginUser);     // PostUserdata(mail, passwort)
router.post('/user/registrieren',           createUser);    // PostAllUserdata(Name, Nachname, Anschrift, mail, passwort)

// Account
router.post('/user/getAllUserData',         getUserData);       // User Daten Anzeigen (UserData, UserAdress)
router.put('/user/updateUserData',          updateUserData);    // Ändern von user data (UserData, UserAdress, außer Email und Rolle )
router.delete('/user/deleteUser',           deleteUser);        // User löschen (UserData, UserAdress, UserBuchung, UserTransaktion, UserFeedback)

// Guthaben
router.post('/user/getUserGuthaben',        getUserGuthaben); // User aktuelle Guthaben anzeigen (UserData tabelle Balacne)
router.put('/user/putUserGuthaben',         putUserGuthaben); // User Guthaben aufladen (UserData tabelle Balacne dazu addieren)

// Kommentare
router.post('/user/getUserAllFeedback',      getUserAllFeedback); // alle feedbacks die der user hat

// Buchungen
router.post('/user/getUserAllBooking',       getUserAllBooking); // Alle buchungen von user 

//Event
router.post('/user/createEvent',            createEvent); // veranstallung mit den tickets ertsellen nur für User Role "veranstalter"

// vergessene Schnittpunkte
router.post('/feedback/createFeedback', createFeedback);
router.put("/events/updateEvent", updateEvent);
router.delete("/events/deleteEvent", deleteEvent); // löscht auch event cost

/*-----------------------------------------*/
/*
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
router.get('/bookings', getAllBookings);
router.put('/booking/update', updateBooking);
router.delete('/booking/delete', deleteBooking);

// Event-Routen
router.post("/events/createEvent", createEvent);
router.get("/events", getAllEvents);
router.get("/events/:name", getEventByName);
router.put("/events/updateEvent", updateEvent);
router.delete("/events/deleteEvent", deleteEvent);
*/
export { router };
