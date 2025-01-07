import { sequelize } from '../../databaseConnection/postgres.js';
import { Model, DataTypes } from 'sequelize';
import { AddressAttributes} from '../../interface/iAddress.js';
import Users from './mUser.js';

class Address extends Model<AddressAttributes> implements AddressAttributes{
    public addresseId?: number;
    public useremail!: string;
    public city!: string;
    public postcode!: string;
    public street!: string;
    public houseNumber!: string; 
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
        onUpdate: 'CASCADE', // Verhalten bei Updates des Fremdschlüssels
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


export default Address;
