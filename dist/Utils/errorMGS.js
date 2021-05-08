"use strict";
// ========================================
// Error MGS
// ========================================
Object.defineProperty(exports, "__esModule", { value: true });
// Import Discord Types
var discord_js_1 = require("discord.js");
// Import Config
var config_json_1 = require("../config.json");
// Export Function
function errorMGS(mgs, err_mgs) {
    // New Embed
    var embed = new discord_js_1.MessageEmbed()
        .setAuthor(config_json_1.bot_setting.author)
        .setColor(config_json_1.bot_setting.color)
        .setTitle("Error during Excution")
        .setDescription(err_mgs);
    // Send Embed
    mgs.channel.send(embed);
}
exports.default = errorMGS;
