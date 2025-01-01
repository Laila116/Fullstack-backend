import { sequelize } from '../../databaseConnection/postgres.js';
import { Model, DataTypes } from 'sequelize';
import { UserData} from '../../interface/iUser.js';

class Users extends Model<UserData> implements UserData{
  public firstname!: string;
  public surname!: string;
  public phone!: string;
  public birthday!: Date;
  public email!: string;
  public password!: string;
  public balance!: number;

  public static async createUser(userData: UserData): Promise<UserData|null> {
    console.log("userData: ", userData);
    try {
      const newUser = await Users.create(
        {
          email: userData.email,
          password: userData.password,
          firstname: userData.firstname,
          surname: userData.surname,
          phone: userData.phone,
          birthday: userData.birthday,
          balance: 0.0,
        },
      );
      console.log("userData2: ", newUser);

      return newUser;
    } catch (error:any) {
      console.error('Error creating user with address:', error.message);
      return null;
    }
  }

  public static async getUserData(userEmail: string): Promise<UserData|null> {
    try {
      console.log('Fetching user data for email:', userEmail);  // Debugging-Linie
      const user = await Users.findOne ({ where: { email: userEmail }, });

      // schaut nach user
      if (!user) {
        console.error(`User with Email ${userEmail} not found`);
        return null;
      }

      return user.dataValues;
    } catch (error: any) {
      console.error(`Error fetching user data for Email ${userEmail}:`, error.message);
      return null; 
    }
  }

  public static async deleteUser(userEmail: string): Promise<number|null> {
    try {
      const deleted = await Users.destroy({ where: { email: userEmail } });

      if (deleted === 0) {
        throw new Error(`User with Email ${userEmail} not found`);
      }

      return deleted;

    } catch (error: any) {
      console.error(`Error deleting user with Email ${userEmail}:`, error.message);
      return null;
    }
  }
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
    }
  },
  {
    sequelize,
    modelName: 'Users',
    tableName: 'Users',
  }
);

export { Users };
