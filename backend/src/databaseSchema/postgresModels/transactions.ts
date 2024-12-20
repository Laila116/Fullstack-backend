import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../../databaseConnection/postgres.js';

class Transaction extends Model {
    public TransactionID!: number;
    public CustomerID!: number;
    public Amount!: number;
    public Date!: Date;
    public Type!: string;
  }
  
  Transaction.init(
    {
      TransactionID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      CustomerID: {
        type: DataTypes.INTEGER,
        references: {
          model: 'UserInformation',
          key: 'CustomerID',
        },
      },
      Amount: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      Date: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false,
      },
      Type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Transaction',
      tableName: 'transactions',
      timestamps: false,
    }
  );
  
  export default Transaction;