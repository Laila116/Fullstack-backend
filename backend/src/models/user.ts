import { sequelize } from '../database.js';
import { Model, DataTypes } from 'sequelize';
import { UserData} from '../interface/interface.js';
import { Console } from 'console';

class users extends Model {
public static async getUserData(INcustomerId: string): Promise<UserData> {
    try {
        // Retrieve user data by username
        const user = await users.findOne({ 
            where: { customerid: INcustomerId },
        });

        // Handle case where user is not found
        if (!user) {
            throw new Error(`User with username ${INcustomerId} not found`);
        }

        // Map the database result to the UserData interface
        const userData: UserData = user.dataValues;
        // {
        //     customerid: user.dataValues.customerid,
        //     firstname: user.dataValues.firstname,
        //     surname: user.dataValues.surname,
        //     phone: user.dataValues.phone,
        //     birthday: user.dataValues.birthday,
        //     email: user.dataValues.email,
        //     balance: parseFloat(user.dataValues.balance), // Ensure balance is returned as a number
        // };

        return userData;
    } catch (error: any) {
        console.error(`Error fetching user data for customerId ${INcustomerId}:`, error.message);
        throw new Error('Failed to fetch user data. Please try again later.');
    }
  }

}

users.init(
  {
    customerid: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,  // Assuming the customerId is auto-incremented
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
      allowNull: true, // Optional field
    },
    birthday: {
      type: DataTypes.DATEONLY, // Using DATEONLY for date without time
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: true, // Optional field
    },
    password: {
      type: DataTypes.STRING(255), // Assuming password is hashed, so the length might be longer
      allowNull: false,
    },
    balance: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'users',
    tableName: 'users',
  }
);

export { users };
