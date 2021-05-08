"use strict";
// ========================================
// Crew Ship Model
// ========================================
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import Sequelize
var sequelize_1 = __importDefault(require("sequelize"));
// Define Variables
var crew_ship_model = {
    shipID: {
        type: sequelize_1.default.STRING,
        unique: true,
        primaryKey: true,
    },
    parentshipID: {
        type: sequelize_1.default.STRING,
        unique: true,
    },
    voiceChannelID: {
        type: sequelize_1.default.STRING,
        unique: true,
    },
    textChannelID: {
        type: sequelize_1.default.STRING,
        unique: true,
    },
};
// Model
var crew_ship = { name: "crews_ship", model: crew_ship_model };
// Export
exports.default = crew_ship;
