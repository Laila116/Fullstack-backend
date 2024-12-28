// ./routes/eventRoutes.ts

import { Router } from "express";
import {
  createEvent,
  getAllEvents,
  getEventByName,
  updateEvent,
  deleteEvent,
} from "../controller/eventController";

const router = Router();

// CREATE Event
router.post("/events/createEvent", createEvent);

// READ All Events
router.get("/events", getAllEvents);

// READ Event by Name
router.get("/events/:name", getEventByName);

// UPDATE Event by ID
router.put("/events/updateEvent", updateEvent);

// DELETE Event by ID
router.delete("/events/deleteEvent", deleteEvent);

export default router;
