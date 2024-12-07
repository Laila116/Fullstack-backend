import express from 'express';
import {createUser, deleteUser, getUserData} from '../contoller/user.js'

const router = express.Router();

// POST Route zum Erstellen eines Nutzers
router.post('/user/createUser', createUser);

// DELETE Route zum Löschen eines Nutzers (mit ID)
router.delete('/user/deleteUser', deleteUser);

// GET Route zum Abrufen von Nutzerdaten (mit ID)
router.get('/user/getUserData', getUserData);

export { router };
