// utils/fehlerMeldung.ts

class CustomError extends Error {
    public statusCode: number;

    constructor(message: string, statusCode: number) {
        super(message);
        this.statusCode = statusCode;
        Object.setPrototypeOf(this, new.target.prototype); // Ermöglicht Vererbung in TypeScript
    }
}

class BadRequestError extends CustomError {
    constructor(message: string) {
        super(message, 400); // Statuscode 400 für BadRequest
    }
}

class NotFoundError extends CustomError {
    constructor(message: string) {
        super(message, 404); // Statuscode 404 für NotFound
    }
}

class InternalServerError extends CustomError {
    constructor(message: string) {
        super(message, 500); // Statuscode 500 für InternalServerError
    }
}

// Fehlerbehandlungen
class FehlerMeldung {
    static userNotFound(): NotFoundError {
        return new NotFoundError("Benutzer nicht gefunden");
    }

    static eventNotFound(): NotFoundError {
        return new NotFoundError("Event nicht gefunden");
    }

    static ticketTypeNotFound(): NotFoundError {
        return new NotFoundError("Ticket-Typ nicht gefunden");
    }

    static insufficientTickets(): BadRequestError {
        return new BadRequestError("Nicht genügend verfügbare Tickets");
    }

    static insufficientBalance(): BadRequestError {
        return new BadRequestError("Nicht genügend Guthaben");
    }

    static bookingCreationFailed(): InternalServerError {
        return new InternalServerError("Fehler beim Erstellen der Buchung");
    }

    static emailMissing(): BadRequestError {
        return new BadRequestError("Email fehlt");
    }

    static noBookingsFound(): NotFoundError {
        return new NotFoundError("Keine Buchungen für diesen Benutzer gefunden");
    }

    static unexpectedError(): InternalServerError {
        return new InternalServerError("Ein unerwarteter Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.");
    }
}

export { CustomError, BadRequestError, NotFoundError, InternalServerError, FehlerMeldung };
