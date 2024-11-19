const { Sequelize, DataTypes } = require('sequelize');

// Definition des Benutzer-Modells
const Benutzer = sequelize.define('Benutzer', { ////schau chat gbt und tillmans code an 
  KundenNR: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,   // Automatische Inkrementierung des Primärschlüssels
  },
  Vorname: {
    type: DataTypes.STRING(50),
    allowNull: false,      // Das Feld darf nicht null sein
  },
  Name: {
    type: DataTypes.STRING(50),
    allowNull: false,      // Das Feld darf nicht null sein
  },
  Telefon: {
    type: DataTypes.STRING(20),
    allowNull: true,       // Das Feld kann null sein (optional)
  },
  Geburtstag: {
    type: DataTypes.DATE,
    allowNull: true,       // Das Feld kann null sein (optional)
  },
  Email: {
    type: DataTypes.STRING(100),
    allowNull: false,      // Das Feld darf nicht null sein
    unique: true,          // Die E-Mail muss eindeutig sein
  },
  Passwort: {
    type: DataTypes.STRING(255),
    allowNull: false,      // Das Feld darf nicht null sein
  },
  Guthaben: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0.00,    // Standardwert für Guthaben
  }
}, {
  tableName: 'Benutzer',  // Der Name der Tabelle in der Datenbank
  freezeTableName: true   // Verhindert, dass Sequelize den Tabellennamen ändert (z. B. in `benutzers`)
});

// Exportiere das Modell für die Verwendung in anderen Dateien
module.exports = Benutzer;