import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../../databaseConnection/postgres.js';
import { iBookings } from '../../interface/iBookings.js';
import { Users } from './user.js';

class Bookings extends Model<iBookings> implements iBookings {
    public bookingID!: number;
    public useremail!: string;
    public eventID!: number;
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
        onDelete: 'CASCADE', //wenn User löschen = Buchung löschen!
    },
      eventID: {
        type: DataTypes.INTEGER,
        //references: {
          //model: 'Eventdetails',
          //key: 'eventID',
        //},
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
      tableName: 'Bookings',
      timestamps: false,
    }
  );
  
  export default Bookings;