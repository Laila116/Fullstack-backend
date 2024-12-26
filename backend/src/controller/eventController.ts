// ./controllers/eventController.ts

import { NextFunction, Request, Response } from "express";
import Event from "../databaseSchema/mongoModels/Eventinfo";

// CREATE: Neuer Event
export const createEvent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, date, location, description } = req.body;

  try {
    const newEvent = new Event({ name, date, location, description });
    await newEvent.save();
    res
      .status(201)
      .json({ message: "Event erfolgreich hinzugefügt 😊", event: newEvent });
  } catch (error: any) {
    console.error("Fehler beim hinfügen des Events", error.message);
    res.status(500).json({ message: "Event ist schon existiert 😞", error });
    next(error);
  }
};

// READ: Alle Events
export const getAllEvents = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const events = await Event.find(); //Events aus der Datenbank holen
    if (!events || events.length == 0) {
      res.status(404).json({ message: "kein Event wurde gefunden" });
      return;
    }
    res.status(200).json(events);
  } catch (error: any) {
    console.error("Fehler beim finden den Events:", error.message);
    res.status(500).json({ message: error });
    next(error);
  }
};

// READ: Event by Name
export const getEventByName = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { name } = req.params;
    const event = await Event.findOne({ name });
    if (!event) {
      res.status(404).json({ message: "Event not found 😟" });
      return;
    }
    res.status(200).json(event);
  } catch (error: any) {
    console.error("Fehler bei getEventByName:", error);
    res.status(500).json({ message: error.message });
    next(error);
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
    if (!updatedEvent) {
      res.status(404).json({ message: "Event nicht gefunden 😟" });
      return;
    }
    res
      .status(200)
      .json({ message: "Event erfolgreich aktualisiert! 😊 ", updatedEvent });
  } catch (error: any) {
    console.error("Fehler beim Update des Events:", error.message);
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
      return;
    }
    // Versuche, das Event zu finden und zu löschen
    const deletedEvent = await Event.findByIdAndDelete(id);
    if (!deletedEvent) {
      res.status(404).json({ message: "Event nicht gefunden" });
      return;
    }
    res
      .status(200)
      .json({ message: "Event erfolgreich gelöscht", event: deletedEvent });
  } catch (error: any) {
    console.error("Fehler beim Löschen des Events:", error.message);
    res.status(500).json({ message: error.message });
    next(error);
  }
};
