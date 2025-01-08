import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config({ path: '../.env' });

const dbName = process.env.PG_NAME || 'postgre_eventdb';
const dbUser = process.env.PG_USER || 'AdminUser';
const dbPassword = process.env.PG_PASSWORD || 'AdminPassword';
const dbHost = process.env.DATABASE_HOST || 'localhost';
const dbPort = parseInt(process.env.PG_PORT || '5432', 10);
const sequelize = new Sequelize(dbName, dbUser, dbPassword, { //von Compose datei für verbindung
  host: dbHost,
  port: dbPort,
  dialect: 'postgres',
  dialectOptions: {
    connectTimeout: 60000 
  },
  define: {
    timestamps: false
  },
  logging: (msg) => console.log(msg), // SQL-Logging aktivieren
});

async function connectToDatabase(): Promise<Boolean> {
  try {
    await sequelize.authenticate();
    console.log('Connected to PostgreSQL');
    await sequelize.sync(); // force: true erzwingt das Neu-Erstellen aller Tabellen
    return true;
  } catch (authError) {
    console.error('Fehler beim Authentifizieren zur PostrgesDB');
  }
  return false;
}


export { connectToDatabase, sequelize };
