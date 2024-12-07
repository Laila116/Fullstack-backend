"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
//data-source.ts Datei
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const orm_config_1 = require("./orm-config");
//import { Event } from '../entities/Event'; // Importiere deine Event-Entität
//import { Address } from "../entities/Address";
const User_1 = require("../entities/User");
exports.AppDataSource = new typeorm_1.DataSource({
    type: "postgres",
    /*
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "eventPostgres",
    database: "mydatabase",
    **/
    url: orm_config_1.DB_URIPOSTGRESQL,
    synchronize: true, // automatische aktualisierung der DB struktur (nur im Entwicklungsmodus verwenden!)
    logging: false,
    entities: [User_1.User],
    //migrations: ["../src/migrations/*.ts"], //später
    subscribers: [],
});
exports.AppDataSource.initialize()
    .then(() => {
    console.log('Data Source has been initialized!');
})
    .catch((err) => {
    console.error('Error during Data Source initialization', err);
});
