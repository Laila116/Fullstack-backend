// ./controllers/eventController.ts

import { Request, Response } from "express";
import Event from "../databaseSchema/mongoModels/Eventinfo";

// CREATE: Neuer Event
export const createEvent = async (req: Request, res: Response) => {
  const { name, date, location, description } = req.body;

  try {
    const newEvent = new Event({ name, date, location, description });
    await newEvent.save();
    res.status(201).json(newEvent);
  } catch (error) {
    res.status(500).json({ message: "Event ist schon existiert 😞", error });
  }
};

// READ: Alle Events
export const getAllEvents = async (req: Request, res: Response) => {
  try {
    const events = await Event.find();
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

// READ: Event by Name
export const getEventByName = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { name } = req.params;
    const event = await Event.findOne({ name });
    if (!event) res.status(404).json({ message: "Event not found" });
    res.status(200).json(event);
  } catch (error) {
    console.error("Fehler bei getEventByName:", error);
    res.status(500).json({ message: error });
  }
};

// UPDATE: Event
export const updateEvent = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { name, date, location, description } = req.body;

  try {
    const updatedEvent = await Event.findByIdAndUpdate(
      req.params.id,
      { name, date, location, description },
      { new: true }
    );
    if (!updatedEvent) res.status(404).json({ message: "Event not found" });
    res.status(200).json(updatedEvent);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

// DELETE: Event by ID
export const deleteEventById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const deletedEvent = await Event.findByIdAndDelete(req.params.id);
    if (!deletedEvent) res.status(404).json({ message: "Event not found" });
    res.status(200).json({ message: "Event successfully deleted" });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
