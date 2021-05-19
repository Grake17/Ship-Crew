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
    fixedChannelsID: {
        type: sequelize_1.default.STRING,
        unique: true,
        defaultValue: undefined,
    },
    channelSize: {
        type: sequelize_1.default.NUMBER,
        defaultValue: 12,
    },
    customName: {
        type: sequelize_1.default.STRING,
        defaultValue: "Lobby"
    },
};
// Model
var crew_ship = { name: "crews_ship", model: crew_ship_model };
// Export
exports.default = crew_ship;
