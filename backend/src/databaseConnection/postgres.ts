import { Sequelize } from 'sequelize';

const host = process.env.DATABASE_HOST || 'localhost';

const sequelize = new Sequelize('eventdb', 'AdminUser', 'AdminPassword', { //von Compose datei für verbindung
  host: host,
  port: 5432,
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
