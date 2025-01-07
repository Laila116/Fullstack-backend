import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../../databaseConnection/postgres.js';
import { iTransactions } from '../../interface/iTransactions.js';
import Users from './mUser.js';

class Transactions extends Model<iTransactions> implements iTransactions {
    public transactionID!: number;
    public useremail!: string;
    public amount!: number;
    public date!: Date;
    public type!: string;
  }
  
  Transactions.init(
    {
      transactionID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      useremail: {
        type: DataTypes.STRING(50), // EMial des Nutzers, verknüpft mit Users.email
        allowNull: false,
        references: {
            model: Users,
            key: 'email',
        },
        onUpdate: 'CASCADE', // Verhalten bei Updates des Fremdschlüssels
        onDelete: 'CASCADE', // Verhalten bei Löschung des Fremdschlüssels
      },
      amount: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: {
          isFloat: true, // Sicherstellen, dass der Betrag eine gültige Gleitkommazahl ist 
          min: 0, // NEgative Werte verhindern
        },
      },
      date: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Transaction',
      tableName: 'Transactions',
      underscored: true,
    }
  );
  
  export default Transactions;