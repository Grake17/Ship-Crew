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
  voiceChannelID: {
    type: Sequelize.STRING,
    unique: true,
  },
  textChannelID: {
    type: Sequelize.STRING,
    unique: true,
  },
};

// Model
const crew_ship = { name: "crews_ship", model: crew_ship_model };

// Export
export default crew_ship;
