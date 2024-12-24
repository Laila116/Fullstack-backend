// ./controllers/eventController.ts

import { NextFunction, Request, Response } from "express";
import Event from "../databaseSchema/mongoModels/Eventinfo";

// CREATE: Neuer Event
export const createEvent = async (req: Request, res: Response) => {
  const { name, date, location, description } = req.body;

  try {
    const newEvent = new Event({ name, date, location, description });
    await newEvent.save();
    res
      .status(201)
      .json({ message: "Event erfolgreich hinzugefügt 😊", event: newEvent });
  } catch (error) {
    res.status(500).json({ message: "Event ist schon existiert 😞", error });
  }
};

// READ: Alle Events
export const getAllEvents = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const events = await Event.find();
    res.status(200).json(events);
  } catch (error) {
    // Verwende return, um sicherzustellen, dass keine doppelte Antwort gesendet wird
    res.status(500).json({
      message: (error as Error).message || "Ein Fehler ist aufgetreten 😞",
    });
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
    if (!event) res.status(404).json({ message: "Event not found 😟" });
    res.status(200).json(event);
  } catch (error) {
    console.error("Fehler bei getEventByName:", error);
    res.status(500).json({ message: (error as Error).message });
  }
};

// UPDATE: Event
export const updateEvent = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { id, name, date, location, description } = req.body;

  if (!id) {
    res.status(400).json({ message: "Event-Id ist erforderlich!" });
    return;
  }

  try {
    const updatedEvent = await Event.findByIdAndUpdate(
      id,
      { name, date, location, description },
      { new: true, runValidators: true }
    );
    if (!updatedEvent)
      res.status(404).json({ message: "Event nicht gefunden 😟" });
    res
      .status(200)
      .json({ message: "Event erfolgreich aktualisiert! 😊 ", updatedEvent });
  } catch (error) {
    console.error("Fehler beim Update des Events:", error);
    res.status(500).json({ message: error });
    next(error);
  }
};

// DELETE: Event by ID
export const deleteEvent = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.body; // ID aus dem Body extrahieren

    // Validierung: Ist die ID im Body vorhanden?
    if (!id) {
      res.status(400).json({ message: "Event-ID ist erforderlich" });
    }
    // Versuche, das Event zu finden und zu löschen
    const deletedEvent = await Event.findByIdAndDelete(id);
    if (!deletedEvent) {
      res.status(404).json({ message: "Event nicht gefunden" });
    }
    res
      .status(200)
      .json({ message: "Event erfolgreich gelöscht", event: deletedEvent });
  } catch (error: any) {
    console.error("Fehler beim Löschen des Events:", error.message);
    res.status(500).json({ message: error });
    next(error);
  }
};
