import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../../databaseConnection/postgres.js';

class Booking extends Model {
    public BookingID!: number;
    public CustomerID!: number;
    public EventID!: number;
    public NumberOfTickets!: number;
    public TotalPrice!: number;
    public BookingDate!: Date;
  }
  
  Booking.init(
    {
      BookingID: {
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
      EventID: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Eventdetails',
          key: 'EventID',
        },
      },
      NumberOfTickets: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      TotalPrice: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      BookingDate: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Booking',
      tableName: 'bookings',
      timestamps: false,
    }
  );
  
  export default Booking;