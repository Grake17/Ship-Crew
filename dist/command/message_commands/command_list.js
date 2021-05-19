"use strict";
// ========================================
// Command List
// ========================================
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import Commands
var createShip_1 = __importDefault(require("./commands/createShip")); // Command Create Ship
var addCustom_1 = __importDefault(require("./commands/addCustom")); // Command Add Custom Name
var listCustom_1 = __importDefault(require("./commands/listCustom")); // Command List Custom Name
var cancCustom_1 = __importDefault(require("./commands/cancCustom")); // remove custom name command
// Command List
var command_list = {
    create: createShip_1.default,
    addname: addCustom_1.default,
    listname: listCustom_1.default,
    cancname: cancCustom_1.default,
};
// Export Command List
exports.default = command_list;
