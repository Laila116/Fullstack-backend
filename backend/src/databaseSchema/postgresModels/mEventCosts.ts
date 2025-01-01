import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../../databaseConnection/postgres.js';
import { iEventCosts, iEventCostsCreationAttributes } from '../../interface/iEventCosts.js';

class EventCosts extends Model<iEventCosts, iEventCostsCreationAttributes> implements iEventCosts {
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
          allowNull: true,
      },
  },
  {
      sequelize,
      modelName: 'EventCosts',
      tableName: 'EventCosts',
      timestamps: false,
  }
);

export default EventCosts;