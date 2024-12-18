import { sequelize } from '../../databaseConnection/postgres.js';
import { Model, DataTypes } from 'sequelize';
import { AddressAttributes} from '../../interface/interface.js';

import { Users } from './user.js';

class Address extends Model{
    public useremail!: string;   // Email des Users
    public city!: string;        // Stadt
    public postcode!: string;    // Postleitzahl
    public street!: string;      // Straße
    public houseNumber!: string; // Hausnummer

    public static async createAddress(addressData: AddressAttributes): Promise<AddressAttributes> {
        try {
            const newAddress = await Address.create(
                {
                    useremail: addressData.useremail,
                    city: addressData.city,
                    postcode: addressData.postcode,
                    street: addressData.street,
                    houseNumber: addressData.houseNumber,
                },
        );

        return newAddress;
        } catch (error:any) {
        console.error('Error creating user with address:', error.message);
        throw new Error('Failed to create user and address. Please try again later.');
        }
    }
}

Address.init(
  {
    addresseId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement:true,
        allowNull: false,
    },
    useremail: {
        type: DataTypes.STRING(50),
        references: {
            model: Users,
            key: 'email',
        },
        onDelete: 'CASCADE',
    },
    city: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    postcode: {
        type: DataTypes.STRING(10),
        allowNull: false,
    },
    street: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    houseNumber: {
        type: DataTypes.STRING(10),
        allowNull: false,
    },
  },
  {
      sequelize,
      modelName: 'Address',
      tableName: 'Address',
  }
);


export { Address };
