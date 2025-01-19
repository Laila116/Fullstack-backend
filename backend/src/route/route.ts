import express from 'express';
import {createUser, getUserData, updateUserData, deleteUser, getUserGuthaben, putUserGuthaben, loginUser } from '../controller/cUser';
import { createFeedback, getUserAllFeedback } from '../controller/cFeedback';
import { createBooking, getUserAllBooking } from '../controller/cBookings';
import { createEvent, getAllEvents, updateEvent, deleteEvent, getSelectedEventData, getAllEventsByKategorieUndOrt, getKategorieUndOrt, getEventsByVeranstalter} from "../controller/cEvent";

const router = express.Router();


router.get('/event/getAllEvents',           getAllEvents);              
router.post('/event/getAllEventsByKategorieUndOrt', getAllEventsByKategorieUndOrt); 
router.get('/event/getKategorieUndOrt',     getKategorieUndOrt);        
router.post('/event/getSelectedEventData',   getSelectedEventData);      
router.post('/event/createBooking',         createBooking);             


router.post('/user/login',                  loginUser);     
router.post('/user/registrieren',           createUser);    


router.post('/user/getAllUserData',          getUserData);       
router.put('/user/updateUserData',          updateUserData);    
router.delete('/user/deleteUser',           deleteUser);        


router.post('/user/getUserGuthaben',         getUserGuthaben); 
router.put('/user/putUserGuthaben',         putUserGuthaben); 


router.post('/user/getUserAllFeedback',      getUserAllFeedback); 


router.post('/user/getUserAllBooking',       getUserAllBooking); 


router.post('/user/createEvent',            createEvent); 


router.post('/feedback/createFeedback',     createFeedback);
router.put("/events/updateEvent",           updateEvent);
router.delete("/events/deleteEvent",        deleteEvent); 
router.post("/user/getEventsByVeranstalter", getEventsByVeranstalter); 

export { router };
