import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../../databaseConnection/postgres.js';

class EventCosts extends Model {
    public EventID!: number;
    public TicketCost!: number;
  }

  EventCosts.init(
    {
      EventID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        references: {
          model: 'Eventdetails',
          key: 'EventID',
        },
      },
      TicketCost: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'EventCosts',
      tableName: 'event_costs',
      timestamps: false,
    }
  );
  
  export default EventCosts;