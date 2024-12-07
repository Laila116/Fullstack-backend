"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const dotenv_1 = __importDefault(require("dotenv"));
// Lade Umgebungsvariablen aus der .env Datei
dotenv_1.default.config();
const pool = new pg_1.Pool({
    user: process.env.PG_USER, // PostgreSQL Benutzername aus der .env Datei
    host: process.env.PG_HOST, // Host aus der .env Datei (der Docker-Containername)
    database: process.env.PG_DATABASE, // Name der Datenbank aus der .env Datei
    password: process.env.PG_PASSWORD, // Passwort aus der .env Datei
    port: Number(process.env.PG_PORT), // Port aus der .env Datei  5432
});
exports.default = pool;
