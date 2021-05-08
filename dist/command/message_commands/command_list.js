"use strict";
// ========================================
// Command List
// ========================================
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import Commands
var createShip_1 = __importDefault(require("./Ship Commands/createShip")); // Command Create Ship
// Command List
var command_list = {
    create: createShip_1.default
};
// Export Command List
exports.default = command_list;
