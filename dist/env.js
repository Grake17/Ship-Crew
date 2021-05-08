"use strict";
// ========================================
// Env Script
// ========================================
Object.defineProperty(exports, "__esModule", { value: true });
exports.env_var = void 0;
// Import DotEnv
require("dotenv").config();
// Define Variables
var env_data = [
    "TOKEN",
    "PREFIX",
    "DATABASE",
    "USERNAME",
    "PASSWORD",
    "HOST",
    "Create_ChannelID",
];
// Export Function
function env_var() {
    // Verify if null
    var outdata = env_data.filter(
    // Check if process is !
    function (env_data) { return !process.env[env_data]; });
    // Check Lenght
    if (outdata.length) {
        throw new Error("Missing Env Variables: " + outdata.join(", "));
    }
    // Return
    return {
        token: process.env.TOKEN,
        prefix: process.env.PREFIX,
        database: process.env.DATABASE,
        user_db: process.env.USER_DB,
        password_db: process.env.PASSWORD,
        host: process.env.HOST,
        create_channelid: process.env.Create_ChannelID, // Process Create Channel ID
    };
}
exports.env_var = env_var;
