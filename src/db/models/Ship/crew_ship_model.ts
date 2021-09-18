// ========================================
// Crew Ship Model
// ========================================

// Import Sequelize
import { STRING, NUMBER } from "sequelize";

// Define Variables
const crew_ship_model = {
  shipID: {
    type: STRING,
    unique: true,
    primaryKey: true,
  },
  parentshipID: {
    type: STRING,
    unique: true,
  },
  fixedChannelsID: {
    type: STRING,
    unique: true,
    defaultValue: undefined,
  },
  channelSize: {
    type: NUMBER,
    defaultValue: 12,
  },
  customName: {
    type: STRING,
    defaultValue: "Lobby"
  },
};

// Model
const crew_ship = { name: "ships", model: crew_ship_model };

// Export
export default crew_ship;
