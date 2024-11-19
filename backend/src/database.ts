import { Sequelize } from 'sequelize';

const host = process.env.DATABASE_HOST || 'localhost';

const sequelize = new Sequelize('eventdb', 'user', 'password', { //google was das ist
  host: host,
  port: 5432,
  dialect: 'postgres',
  dialectOptions: {
    connectTimeout: 60000 
  },
  define: {
    timestamps: false
  }
});

async function connectToDatabase(): Promise<Boolean> {
  try {
    await sequelize.authenticate();
    return true;
  } catch (authError) {
    console.error('Fehler beim Authentifizieren zur Datenbank');
  }
  return false;
}


export { connectToDatabase, sequelize };
