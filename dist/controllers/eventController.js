"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createEvent = createEvent;
exports.getAllEvents = getAllEvents;
exports.getEventByName = getEventByName;
const EventModell_1 = __importDefault(require("../models/EventModell")); // Mongoose-Modell importieren
// Funktion zum Erstellen eines neuen Events
function createEvent(eventData) {
    return __awaiter(this, void 0, void 0, function* () {
        const newEvent = new EventModell_1.default(eventData);
        return yield newEvent.save();
    });
}
// Funktion zum Abrufen aller Events
function getAllEvents() {
    return __awaiter(this, void 0, void 0, function* () {
        return yield EventModell_1.default.find();
    });
}
// Funktion zum Abrufen eines Events anhand des Namens
function getEventByName(name) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield EventModell_1.default.findOne({ name });
    });
}
