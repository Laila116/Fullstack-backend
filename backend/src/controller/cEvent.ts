import { NextFunction, Request, Response } from "express";
import Event from "../databaseSchema/mongoModels/mEvent";
import Users from "../databaseSchema/postgresModels/mUser";
import Feedback from "../databaseSchema/mongoModels/mFeedback";  // Feedback-Datenmodell
import EventCosts from "../databaseSchema/postgresModels/mEventCosts";  // Ticket-Kosten-Datenmodell

export const createEvent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, category, date, location, description, imageUrl, ticketDetails } = req.body;
  const userEmail = req.body.userEmail; // Die E-Mail-Adresse des Benutzers aus dem Body abrufen

  try {
    // Überprüfen, ob der Benutzer existiert und ob die Rolle "Veranstalter" ist
    const user = await Users.findOne({ where: { email: userEmail } });

    if (!user) {
      res.status(404).json({ message: "Benutzer nicht gefunden" });
      return;
    }

    if (user.role !== "Veranstalter") {
      res.status(403).json({ message: "Nur Veranstalter können Events erstellen" });
      return;
    }

    // Event erstellen
    const newEvent = await Event.create({ name, category, date, location, description, imageUrl });

    
    // Überprüfen, ob die Ticketdetails bereitgestellt wurden
    if (!ticketDetails || !Array.isArray(ticketDetails) || ticketDetails.length !== 3) {
      res.status(400).json({
        message:
          "Bitte geben Sie genau drei Ticketarten an (z. B. Standard, Premium, VIP).",
      });
      return;
    }

    // Ticketarten hinzufügen
    const eventCosts = ticketDetails.map((ticket: any) => ({
      eventID: newEvent.id, // Verwende die ID des neu erstellten Events
      ticketBeschreibung: ticket.ticketBeschreibung,
      ticketCost: ticket.ticketCost,
      maxTickets: ticket.maxTickets,
      verfuegbarTickets: ticket.maxTickets, // Anfangs sind alle Tickets verfügbar
    }));

    await EventCosts.bulkCreate(eventCosts);

    res
      .status(201)
      .json({ message: "Event erfolgreich hinzugefügt 😊", event: newEvent });
  } catch (error: any) {
    console.error("Fehler beim Hinzufügen des Events", error.message);
    res.status(500).json({ message: "Ein Fehler ist aufgetreten", error });
    next(error);
  }
};

// READ: Alle Events (nur Name und Ort)
export const getAllEvents = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const events = await Event.find(); // Events aus der Datenbank holen

    if (!events || events.length === 0) {
      res.status(404).json({ message: "Kein Event wurde gefunden" });
      return;
    }

    // Mapping der Events auf nur Name und Ort
    const eventsWithDetails = events.map(event => ({
      name: event.name,
      location: event.location,
      imageUrl: event.imageUrl || null  // Das Bild-URL (falls vorhanden)
    }));

    res.status(200).json(eventsWithDetails);
  } catch (error: any) {
    console.error("Fehler beim Abrufen der Events:", error.message);
    res.status(500).json({ message: "Ein Fehler ist aufgetreten", error });
    next(error);
  }
};

/*// READ: Event by Name
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
};*/

// UPDATE: Event
export const updateEvent = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { id, name, category, date, location, description, imageUrl } = req.body;
  const userEmail = req.body.userEmail; // Die E-Mail-Adresse des Benutzers aus dem Body abrufen

  // Überprüfen, ob der Benutzer existiert und ob die Rolle "Veranstalter" ist
  const user = await Users.findOne({ where: { email: userEmail } });

  if (!user) {
    res.status(404).json({ message: "Benutzer nicht gefunden" });
    return;
  }

  if (user.role !== "Veranstalter") {
    res.status(403).json({ message: "Nur Veranstalter können Events updaten" });
    return;
  }

  if (!id) {
    res.status(400).json({ message: "Event-Id ist erforderlich!" });
    return;
  }

  try {
    const updatedEvent = await Event.findByIdAndUpdate(
      id,
      { name, category, date, location, description, imageUrl },
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
    const userEmail = req.body.userEmail; // Die E-Mail-Adresse des Benutzers aus dem Body abrufen

     // Überprüfen, ob der Benutzer existiert und ob die Rolle "Veranstalter" ist
     const user = await Users.findOne({ where: { email: userEmail } });

     if (!user) {
       res.status(404).json({ message: "Benutzer nicht gefunden" });
       return;
     }
 
     if (user.role !== "Veranstalter") {
       res.status(403).json({ message: "Nur Veranstalter können Events löschen" });
       return;
     }

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
    
    // Lösche die zugehörigen Eventkosten
    const deletedEventCosts = await EventCosts.destroy({
      where: { eventID: id },
    });

    res.status(200).json({
      message: "Event und zugehörige Kosten erfolgreich gelöscht",
      event: deletedEvent,
      deletedCostsCount: deletedEventCosts, // Anzahl der gelöschten Einträge
    });
  } catch (error: any) {
    console.error("Fehler beim Löschen des Events:", error.message);
    res.status(500).json({ message: error.message });
    next(error);
  }
};
/*
// READ: Filter Events nach Kategorie
export const getAllEventsByKategorie = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { kategorie } = req.body; // Kategorie aus dem Body extrahieren

    // Validierung: Ist die Kategorie vorhanden?
    if (!kategorie) {
      res.status(400).json({ message: "Kategorie ist erforderlich" });
      return;
    }

    // Events nach Kategorie filtern
    const events = await Event.find({ category: kategorie });

    // Überprüfen, ob Events gefunden wurden
    if (!events || events.length === 0) {
      res.status(404).json({ message: `Keine Events in Kategorie ${kategorie} gefunden` });
      return;
    }

    res.status(200).json(events);
  } catch (error: any) {
    console.error("Fehler beim Filtern nach Kategorie:", error.message);
    res.status(500).json({ message: "Ein unerwarteter Fehler ist aufgetreten", error });
    next(error);
  }
};

// READ: Filter Events nach Ort
export const getAllEventsByOrt = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { ort } = req.body; // Ort aus dem Body extrahieren

    // Validierung: Ist der Ort vorhanden?
    if (!ort) {
      res.status(400).json({ message: "Ort ist erforderlich" });
      return;
    }

    // Events nach Ort filtern
    const events = await Event.find({ location: ort });

    // Überprüfen, ob Events gefunden wurden
    if (!events || events.length === 0) {
      res.status(404).json({ message: `Keine Events am Ort ${ort} gefunden` });
      return;
    }

    res.status(200).json(events);
  } catch (error: any) {
    console.error("Fehler beim Filtern nach Ort:", error.message);
    res.status(500).json({ message: "Ein unerwarteter Fehler ist aufgetreten", error });
    next(error);
  }
};
*/
// READ: Alle Daten für ein ausgewähltes Event (Event-Daten, Ticket-Kosten und Feedbacks)
export const getSelectedEventData = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { eventID } = req.body;  // Event-ID aus dem Body

  try {
    // Überprüfen, ob die Event-ID existiert
    const event = await Event.findById(eventID);
    if (!event) {
      res.status(404).json({ message: "Event nicht gefunden 😟" });
      return;
    }

    // Alle Feedbacks für dieses Event abrufen
    const feedbacks = await Feedback.find({ eventID });
    
    // Durchschnitt der Feedback-Bewertungen berechnen
    const totalFeedback = feedbacks.reduce((sum, feedback) => sum + feedback.feedback, 0);
    const averageFeedback = feedbacks.length > 0 ? totalFeedback / feedbacks.length : 0;

    // Ticket-Kosten für dieses Event abrufen
    const eventCosts = await EventCosts.findAll({
      where: { eventID }
    });

    // Daten zusammenstellen
    const eventData = {
      event: {
        name: event.name,
        description: event.description,
        location: event.location,
        date: event.date,
        imageUrl: event.imageUrl || null  // Bild-URL, falls vorhanden
      },
      feedbacks: {
        average: averageFeedback.toFixed(1), // Durchschnitt der Feedback-Bewertungen
        comments: feedbacks.map((feedback) => ({
          userEmail: feedback.userEmail,
          comment: feedback.comment,
        })),
      },
      ticketCosts: eventCosts.map((cost) => ({
        ticketCost: cost.ticketCost,
        ticketBeschreibung: cost.ticketBeschreibung,
        verfuegbarTickets: cost.verfuegbarTickets
      })),
    };

    // Antwort mit allen Event-Daten, Feedbacks und Ticket-Kosten
    res.status(200).json(eventData);
  } catch (error: any) {
    console.error("Fehler beim Abrufen der Event-Daten:", error.message);
    res.status(500).json({ message: "Ein Fehler ist aufgetreten", error });
    next(error);
  }
};




// READ: Filter Events nach Kategorie und Ort
export const getAllEventsByKategorieUndOrt = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { category, ort } = req.body; // Kategorie und Ort aus dem Body extrahieren

    // Validierung: Ist die Kategorie oder der Ort vorhanden?
    if (!category && !ort) {
      res.status(400).json({ message: "Kategorie oder Ort sind erforderlich" });
      return;
    }

    let filter = {};

    // Wenn Kategorie angegeben, nach Kategorie filtern
    if (category) {
      filter = { ...filter, category: { $in: category } };
    }

    // Wenn Ort angegeben, nach Ort filtern
    if (ort) {
      filter = { ...filter, location: { $in: ort} };
    }

    // Events nach Filterkriterien suchen
    const events = await Event.find(filter);

    // Überprüfen, ob Events gefunden wurden
    if (!events || events.length === 0) {
      res.status(404).json({ message: "Keine Events gefunden" });
      return;
    }

    res.status(200).json(events);
  } catch (error: any) {
    console.error("Fehler beim Filtern der Events:", error.message);
    res.status(500).json({ message: "Ein unerwarteter Fehler ist aufgetreten", error });
    next(error);
  }
};

/*
// READ: Filter Orte nach Kategorie
export const getAllOrteByKategorie = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { kategorie } = req.body; // Kategorie aus dem Body extrahieren

    // Validierung: Ist die Kategorie vorhanden?
    if (!kategorie) {
      res.status(400).json({ message: "Kategorie ist erforderlich" });
      return;
    }

    // Orte basierend auf der Kategorie filtern
    const events = await Event.find({ category: kategorie });

    if (!events || events.length === 0) {
      res.status(404).json({ message: `Keine Orte für die Kategorie ${kategorie} gefunden` });
      return;
    }

    // Extrahiere die Orte und entferne Duplikate
    const uniqueOrte = [...new Set(events.map(event => event.location))];

    res.status(200).json({ orte: uniqueOrte });
  } catch (error: any) {
    console.error("Fehler beim Abrufen der Orte:", error.message);
    res.status(500).json({ message: "Ein unerwarteter Fehler ist aufgetreten", error });
    next(error);
  }
};

// READ: Filter Kategorien nach Ort
export const getAllKategorienByOrt = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { ort } = req.body; // Ort aus dem Body extrahieren

    // Validierung: Ist der Ort vorhanden?
    if (!ort) {
      res.status(400).json({ message: "Ort ist erforderlich" });
      return;
    }

    // Kategorien basierend auf dem Ort filtern
    const events = await Event.find({ location: ort });

    if (!events || events.length === 0) {
      res.status(404).json({ message: `Keine Kategorien für den Ort ${ort} gefunden` });
      return;
    }

    // Extrahiere die Kategorien und entferne Duplikate
    const uniqueKategorien = [...new Set(events.map(event => event.category))];

    res.status(200).json({ kategorien: uniqueKategorien });
  } catch (error: any) {
    console.error("Fehler beim Abrufen der Kategorien:", error.message);
    res.status(500).json({ message: "Ein unerwarteter Fehler ist aufgetreten", error });
    next(error);
  }
};

// READ: Alle Orte abrufen (ohne Filter)
export const getAllOrte = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const events = await Event.find(); // Alle Events abrufen

    if (!events || events.length === 0) {
      res.status(404).json({ message: "Keine Orte gefunden" });
      return;
    }

    // Extrahiere die Orte und entferne Duplikate
    const uniqueOrte = [...new Set(events.map(event => event.location))];

    res.status(200).json({ orte: uniqueOrte });
  } catch (error: any) {
    console.error("Fehler beim Abrufen der Orte:", error.message);
    res.status(500).json({ message: "Ein unerwarteter Fehler ist aufgetreten", error });
    next(error);
  }
};

// READ: Alle Kategorien abrufen (ohne Filter)
export const getAllKategorien = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const events = await Event.find(); // Alle Events abrufen

    if (!events || events.length === 0) {
      res.status(404).json({ message: "Keine Kategorien gefunden" });
      return;
    }

    // Extrahiere die Kategorien und entferne Duplikate
    const uniqueKategorien = [...new Set(events.map(event => event.category))];

    res.status(200).json({ kategorien: uniqueKategorien });
  } catch (error: any) {
    console.error("Fehler beim Abrufen der Kategorien:", error.message);
    res.status(500).json({ message: "Ein unerwarteter Fehler ist aufgetreten", error });
    next(error);
  }
};
*/
// READ: Alle Orte und Kategorien basierend auf der Auswahl des Benutzers abrufen
export const getKategorieUndOrt = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { kategorie, ort } = req.query; // Kategorie und Ort aus den Query-Parametern extrahieren

    // Filterbedingungen erstellen
    let filter: any = {};

    if (kategorie) filter.category = kategorie;
    if (ort) filter.location = ort;

    // Alle Events basierend auf den Filtern abrufen
    const events = await Event.find(filter);

    // Orte und Kategorien aus den gefilterten Events extrahieren
    const uniqueOrte = [...new Set(events.map((event) => event.location))];
    const uniqueKategorien = [...new Set(events.map((event) => event.category))];

    // Rückgabe der gefilterten Orte und Kategorien
    res.status(200).json({
      orte: uniqueOrte,
      kategorien: uniqueKategorien,
    });
  } catch (error: any) {
    console.error("Fehler beim Abrufen der gefilterten Orte und Kategorien:", error.message);
    res.status(500).json({ message: "Ein Fehler ist aufgetreten", error });
    next(error);
  }
};