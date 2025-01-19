import express from 'express';
import {createUser, getUserData, updateUserData, deleteUser, getUserGuthaben, putUserGuthaben, loginUser } from '../controller/cUser';
import { createFeedback, getUserAllFeedback } from '../controller/cFeedback';
import { createBooking, getUserAllBooking } from '../controller/cBookings';
import { createEvent, getAllEvents, updateEvent, deleteEvent, getSelectedEventData, getAllEventsByKategorieUndOrt, getKategorieUndOrt, getEventsByVeranstalter} from "../controller/cEvent";

const router = express.Router();

// Home Seite
router.get('/event/getAllEvents',           getAllEvents);              // Events in Slinder und unten Anzeigen (Bild, Name, Ort)
router.post('/event/getAllEventsByKategorieUndOrt', getAllEventsByKategorieUndOrt); // Filter von Events in dem Kategorie und Ort erstellen
router.get('/event/getKategorieUndOrt',     getKategorieUndOrt);        // Filter von Kategorie und Ort erstellen
router.post('/event/getSelectedEventData',   getSelectedEventData);      // Ausgewählte Event Daten anzeigen (Alle daten von event und ticket und Feedbacks (''jedes feedback in dem event gegeben wurde'' ))
router.post('/event/createBooking',         createBooking);             // Ticket kaufen (Userguthaben verringern Anzahl von tickets verringern, Buchung für User erstellen )

// Login/ Register
router.post('/user/login',                  loginUser);     // PostUserdata(mail, passwort)
router.post('/user/registrieren',           createUser);    // PostAllUserdata(Name, Nachname, Anschrift, mail, passwort)

// Account
router.post('/user/getAllUserData',          getUserData);       // User Daten Anzeigen (UserData, UserAdress)
router.put('/user/updateUserData',          updateUserData);    // Ändern von user data (UserData, UserAdress, außer Email und Rolle )
router.delete('/user/deleteUser',           deleteUser);        // User löschen (UserData, UserAdress, UserBuchung, UserTransaktion, UserFeedback)

// Guthaben
router.post('/user/getUserGuthaben',         getUserGuthaben); // User aktuelle Guthaben anzeigen (UserData tabelle Balacne)
router.put('/user/putUserGuthaben',         putUserGuthaben); // User Guthaben aufladen (UserData tabelle Balacne dazu addieren)

// Kommentare
router.post('/user/getUserAllFeedback',      getUserAllFeedback); // alle feedbacks die der user hat

// Buchungen
router.post('/user/getUserAllBooking',       getUserAllBooking); // Alle buchungen von user 

//Event
router.post('/user/createEvent',            createEvent); // veranstallung mit den tickets ertsellen nur für User Role "veranstalter"

// vergessene Schnittpunkte
router.post('/feedback/createFeedback',     createFeedback);
router.put("/events/updateEvent",           updateEvent);
router.delete("/events/deleteEvent",        deleteEvent); // löscht auch event cost
router.post("/user/getEventsByVeranstalter", getEventsByVeranstalter); // gibt die evnts pro veranstalter

export { router };
