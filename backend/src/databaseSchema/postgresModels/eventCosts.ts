import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../../databaseConnection/postgres.js';

class EventCosts extends Model {
  public eventID!: number;
  public ticketCost!: number;
  public eventName!: string; 
}

EventCosts.init(
  {
      eventID: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          allowNull: false,
          /*references: {
              model: 'Eventdetails',
              key: 'eventID',
          },*/
      },
      ticketCost: {
          type: DataTypes.FLOAT,
          allowNull: false,
      },
      eventName: {
          type: DataTypes.STRING,
          allowNull: false,
      },
  },
  {
      sequelize,
      modelName: 'EventCosts',
      tableName: 'Event_costs',
      timestamps: false,
  }
);

export default EventCosts;