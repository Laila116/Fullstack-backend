import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../../databaseConnection/postgres.js';
import { iBookings } from '../../../../shared/interface/iBookings';
import Users from './mUser.js';
import { ObjectId } from "mongoose";

class Bookings extends Model<iBookings> implements iBookings {
    public bookingID!: number;
    public useremail!: string;
    public eventID!: ObjectId;
    public numberOfTickets!: number;
    public totalPrice!: number;
    public bookingDate!: Date;
  }
  
  Bookings.init(
    {
      bookingID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
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
      eventID: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      numberOfTickets: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      totalPrice: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      bookingDate: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Booking',
      tableName: 'booking',
    }
  );
  
  export default Bookings;