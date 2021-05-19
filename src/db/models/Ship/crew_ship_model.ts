// ========================================
// Crew Ship Model
// ========================================

// Import Sequelize
import Sequelize from "sequelize";

// Define Variables
const crew_ship_model = {
  shipID: {
    type: Sequelize.STRING,
    unique: true,
    primaryKey: true,
  },
  parentshipID: {
    type: Sequelize.STRING,
    unique: true,
  },
  fixedChannelsID: {
    type: Sequelize.STRING,
    unique: true,
    defaultValue: undefined,
  },
  channelSize: {
    type: Sequelize.NUMBER,
    defaultValue: 12,
  },
  customName: {
    type: Sequelize.STRING,
  },
};

// Model
const crew_ship = { name: "crews_ship", model: crew_ship_model };

// Export
export default crew_ship;
