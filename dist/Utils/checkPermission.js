"use strict";
// ========================================
// Persmission Utils
// ========================================
Object.defineProperty(exports, "__esModule", { value: true });
// Import Config
var config_json_1 = require("../config.json");
// Export Function
function checkPermission(id) {
    // Check Permission
    var test = JSON.stringify(config_json_1.permission);
    // Return Boolen
    return test.includes(id);
}
exports.default = checkPermission;
