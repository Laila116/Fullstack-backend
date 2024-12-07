import { sequelize } from '../database.js';
import { Model, DataTypes } from 'sequelize';

class Address extends Model {}

Address.init(
  {
    adresseId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true, // Assuming adresseId is auto-incremented
      allowNull: false,
    },
    name: {
      type: DataTypes.INTEGER, // Fremdschlüssel zu einer anderen Tabelle (z. B. Benutzerinformationen)
      allowNull: false,
    },
    postleitzahl: {
      type: DataTypes.STRING(10), // Postleitzahlen können auch alphanumerisch sein
      allowNull: false,
    },
    ort: {
      type: DataTypes.STRING(100), // Maximale Länge des Ortnamens
      allowNull: false,
    },
    strasse: {
      type: DataTypes.STRING(100), // Maximale Länge des Straßennamens
      allowNull: false,
    },
    hausnr: {
      type: DataTypes.STRING(10), // Hausnummer kann Buchstaben enthalten (z. B. "12A")
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Address',
    tableName: 'addresses',
    timestamps: false, // Falls die Tabelle keine createdAt/updatedAt Felder hat
  }
);

export { Address };
