import { sequelize } from '../../databaseConnection/postgres.js';
import { Model, DataTypes } from 'sequelize';
import { UserData} from '../../../../shared/interface/iUser.js';

class Users extends Model<UserData> implements UserData{
  public firstname!: string;
  public surname!: string;
  public phone!: string;
  public birthday!: Date;
  public email!: string;
  public password!: string;
  public balance!: number;
  public role!: string;
  public companyName?: string;
}

Users.init(
  {
    email: {
      type: DataTypes.STRING(100),
      primaryKey: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(255), // Assuming password is hashed, so the length might be longer
      allowNull: false,
    },
    firstname: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    surname: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    birthday: {
      type: DataTypes.DATEONLY, // Using DATEONLY for date without time
      allowNull: false,
    },
    balance: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0.00, // Standardwert für balance
      validate: {
          isDecimal: { msg: 'Balance must be a valid decimal number' },
          min: { args: [0], msg: 'Balance cannot be negative' },
      },
    },
    role:{
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    companyName:{
      type: DataTypes.STRING(20),
      allowNull: true,
    }
  },
  {
    sequelize,
    modelName: 'Users',
    tableName: 'Users',
  }
);

export default Users ;
