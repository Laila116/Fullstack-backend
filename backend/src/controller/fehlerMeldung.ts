class CustomError extends Error {
    public statusCode: number;

    constructor(message: string, statusCode: number) {
        super(message);
        this.statusCode = statusCode;
    }
}

class BadRequestError extends CustomError {
    constructor(message: string) {
        super(message, 400);
    }
}

class Unauthorized extends CustomError {
    constructor(message: string) {
        super(message, 401);
    }
}

class ForbiddenError extends CustomError {
    constructor(message: string) {
        super(message, 403);
    }
}

class NotFoundError extends CustomError {
    constructor(message: string) {
        super(message, 404);
    }
}

class ConflictError extends CustomError {
    constructor(message: string) {
        super(message, 409);
    }
}

class InternalServerError extends CustomError {
    constructor(message: string) {
        super(message, 500);
    }
}

// Fehlermeldungen
const ErrorMessages = {
    MissingFields:                  new BadRequestError("Fehlende Pflichtfelder."),
    UserNotFound:                   new NotFoundError("Benutzer mit der angegebenen E-Mail-Adresse nicht gefunden."),
    EventNotFound:                  new NotFoundError("Das Event mit der angegebenen ID wurde nicht gefunden."),
    EventsNotFound:                 new NotFoundError("Es wurden keine Events gefunden."),
    TicketTypeNotFound:             new NotFoundError("Tickettyp für das angegebene Event nicht gefunden."),
    InsufficientTickets: (availableTickets: number) => new BadRequestError(`Nicht genügend verfügbare Tickets. Verfügbare Tickets: ${availableTickets}`),
    InsufficientBalance: (required: number, available: number) => new BadRequestError(`Nicht genügend Guthaben. Erforderlich: ${required}, Verfügbar: ${available}`),
    NoBookingsFound:                new NotFoundError("Es wurden keine Buchungen für den angegebenen Benutzer gefunden."),
    NoFeedbacksForUserFound:        new NotFoundError("Es wurden keine Feedbacks für den angegebenen Benutzer gefunden."),
    MissingOrganizerRole:           new ForbiddenError("Sie besitzen kein Veranstalter Rolle."),
    InvalidNumberOfTicketTypes:     new BadRequestError("Bitte geben Sie genau drei Ticketarten an."),
    NotEventOrganizer:              new ForbiddenError("Sie sind nicht der Veranstalter dieses Events!"),
    EventUpdateFailed:              new BadRequestError("Event konnte nicht aktualisiert werden."),
    EventDeletFailed:               new BadRequestError("Event konnte nicht gelöscht werden."),
    EventCostsNotFound:             new BadRequestError("Keine Event-Kosten gefunden."),
    NoFeedbacksForEventFound:       new NotFoundError("Keine Feedbacks für das Event gefunden."),
    NoEventsFoundWithFilters:       new NotFoundError("Keine Events gefunden für die angegebenen Filter."),
    NoEventsFoundForOrganizer:      new NotFoundError("Keine Events für den Veranstalter gefunden."),
    UserExists:                     new ConflictError("User already exists."),
    AddressNotFound:                new NotFoundError("Adresse für den Nutzer nicht gefunden."),
    UserDeletFailed:                new BadRequestError("User konnte nicht gelöscht werden."),
    AmountGreaterThanZero:          new BadRequestError("Der Betrag muss größer als 0 sein."),
    WrongPassword:                  new Unauthorized("Falsches Passwort"),

    InternalServerError:            new InternalServerError("Ein unerwarteter Fehler ist aufgetreten. Bitte versuchen Sie es später erneut."),
};

// Exportiere alles
export { CustomError, BadRequestError, InternalServerError};
export default ErrorMessages;