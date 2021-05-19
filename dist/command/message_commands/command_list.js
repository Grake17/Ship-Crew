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
var deleteShip_1 = __importDefault(require("./commands/deleteShip")); // Import Delete Ship
var help_1 = __importDefault(require("./commands/help")); // Command Help
var listShip_1 = __importDefault(require("./commands/listShip")); // Command List
var addspace_1 = __importDefault(require("./commands/addspace")); // Command Add Space
// Command List
var command_list = {
    create: createShip_1.default,
    addname: addCustom_1.default,
    listname: listCustom_1.default,
    cancname: cancCustom_1.default,
    delete: deleteShip_1.default,
    help: help_1.default,
    list: listShip_1.default,
    addspace: addspace_1.default
};
// Export Command List
exports.default = command_list;
