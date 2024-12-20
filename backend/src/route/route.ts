import express from 'express';
import {createUser, deleteUser, getUserData} from '../controller/user.js';
import { createFeedback } from '../controller/feedback.js';
import { createEventCost, getEventCost, updateEventCost, deleteEventCost } from '../controller/eventCosts.js';

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

export { router };
