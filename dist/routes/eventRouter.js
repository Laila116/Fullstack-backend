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
/**/
const express_1 = require("express");
const eventController_1 = require("../controllers/eventController");
const EventModell_1 = __importDefault(require("../models/EventModell")); // Importiere das EventModel 'separates Modell'
const router = (0, express_1.Router)();
// Route zum Erstellen eines Events
router.post("/events", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newEvent = yield (0, eventController_1.createEvent)(req.body);
        res.status(201).json(newEvent);
    }
    catch (error) {
        res.status(500).json({ message: "Error creating event", error });
    }
}));
// GET: Alle Events abrufen
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const events = yield EventModell_1.default.find(); // MongoDB-Abfrage
        res.json(events);
    }
    catch (err) {
        res.status(500).json({ message: "Error retrieving events", error: err });
    }
}));
// GET: Ein Event nach ID abrufen
router.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const event = yield EventModell_1.default.findById(req.params.id); // Sucht ein Event mit der angegebenen ID
        if (event) {
            res.json(event); // Gibt das gefundene Event zurück
        }
        else {
            res.status(404).json({ message: "Event not found" }); // Wenn kein Event gefunden wird
        }
    }
    catch (err) {
        res.status(500).json({ message: "Error retrieving event", error: err });
    }
}));
// POST: Ein neues Event erstellen
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newEvent = new EventModell_1.default(req.body);
        yield newEvent.save();
        res
            .status(201)
            .json({ message: "Event created successfully", event: newEvent });
    }
    catch (err) {
        res.status(500).json({ message: "Error saving event", error: err });
    }
}));
// Exportiere den Router
exports.default = router;
