import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../../databaseConnection/postgres';
import { iEventCosts } from '@shared/interface/iEventCosts';
import { ObjectId } from "mongoose";

class EventCosts extends Model<iEventCosts> implements iEventCosts {
  public eventID!: ObjectId;
  public ticketCost!: number;
  public ticketBeschreibung!: string; 
  public maxTickets!: number;
  public verfuegbarTickets!: number;
}

EventCosts.init(
  {
      eventID: {
          type: DataTypes.STRING,
          allowNull: false,
          primaryKey: true,
      },
      ticketBeschreibung: {
          type: DataTypes.STRING,
          allowNull: false,
          primaryKey: true,
      },
      ticketCost: {
          type: DataTypes.FLOAT,
          allowNull: false,
      },
      maxTickets: {
          type: DataTypes.INTEGER,
          allowNull: false,
      },
      verfuegbarTickets: {
          type: DataTypes.INTEGER,
          allowNull: false,
      },
  },
  {
      sequelize,
      modelName: 'EventCosts',
      tableName: 'eventCosts',
  }
);

export default EventCosts;
