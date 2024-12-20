// ./routes/eventRoutes.ts

import { Router } from "express";
import {
  createEvent,
  getAllEvents,
  getEventByName,
  updateEvent,
  deleteEventById,
} from "../controller/eventController";

const router = Router();

// CREATE Event
router.post("/events", createEvent);

// READ All Events
router.get("/events", getAllEvents);

// READ Event by Name
router.get("/events/:name", getEventByName);

// UPDATE Event by ID
router.put("/events/:id", updateEvent);

// DELETE Event by ID
router.delete("/events/:id", deleteEventById);

export default router;
