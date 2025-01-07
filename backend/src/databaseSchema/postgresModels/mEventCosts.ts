import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../../databaseConnection/postgres.js';
import { iEventCosts } from '../../interface/iEventCosts.js';
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
          primaryKey: true, // Teil des zusammengesetzten Primärschlüssels
      },
      ticketBeschreibung: {
          type: DataTypes.STRING,
          allowNull: false,
          primaryKey: true, // Teil des zusammengesetzten Primärschlüssels
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
      tableName: 'EventCosts',
      timestamps: false,
  }
);

export default EventCosts;
