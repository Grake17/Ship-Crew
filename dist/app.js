"use strict";
// ========================================
// App Main Discord
// ========================================
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import DiscordJs
var discord_js_1 = require("discord.js");
// Import Env
var env_1 = require("./env");
// Import DB
var mainDB_1 = __importDefault(require("./db/mainDB"));
// import handler
var vocal_handler_1 = __importDefault(require("./handlers/vocal_handler"));
// Message Hanlder
var message_handler_1 = __importDefault(require("./handlers/message_handler"));
// Try Catch For Error
try {
    // New Client
    var bot_1 = new discord_js_1.Client();
    //Env Var
    var env_2 = env_1.env_var();
    // Load DB
    mainDB_1.default()
        .then(function (db_object) {
        // Check Result
        if (!db_object)
            return;
        // Sync Table
        db_object.tables.crew_ship_table.sync();
        // Bot On
        bot_1.on("ready", function () { var _a; return console.log(((_a = bot_1.user) === null || _a === void 0 ? void 0 : _a.username) + " pronto!"); });
        // Bot Message Listener
        bot_1.on("message", function (mgs) { message_handler_1.default(mgs, db_object); });
        // Bot Voice Listener
        bot_1.on("voiceStateUpdate", function (oldMember, newMember) { vocal_handler_1.default(oldMember, newMember, db_object); });
        // Bot Login
        bot_1.login(env_2.token);
    })
        .catch(function (err) {
        // Console Log
        console.error(err);
    });
}
catch (err) {
    // Console Log Error
    console.error(err);
}
