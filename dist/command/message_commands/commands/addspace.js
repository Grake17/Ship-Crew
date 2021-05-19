"use strict";
// ========================================
// Command Add Space
// ========================================
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import Discord Type
var discord_js_1 = require("discord.js");
// Import Config
var config_json_1 = require("../../../config.json");
// Import Check Permission
var checkPermission_1 = __importDefault(require("../../../Utils/checkPermission"));
// Error MGS
var errorMGS_1 = __importDefault(require("../../../Utils/errorMGS"));
// Import Get Ship
var getCrewShip_1 = __importDefault(require("../../../Utils/Utils Get/getCrewShip"));
// Export Command
function addSpace(mgs, db_objct, args) {
    var _a;
    return __awaiter(this, void 0, void 0, function () {
        var role, ship, tot;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    // Check Permission
                    if (!checkPermission_1.default(mgs.author.id))
                        return [2 /*return*/, errorMGS_1.default(mgs, "Non hai i permessi per fare questo comando")];
                    role = mgs.mentions.roles.first();
                    // Check Roles & Number
                    if (!role || !Number(args[2]))
                        return [2 /*return*/, errorMGS_1.default(mgs, "Sintassi Invalida")];
                    return [4 /*yield*/, getCrewShip_1.default(role.id, db_objct.tables)];
                case 1:
                    ship = (_a = (_b.sent())) === null || _a === void 0 ? void 0 : _a.get();
                    // Check Space
                    if (!(ship === null || ship === void 0 ? void 0 : ship.channelSize))
                        return [2 /*return*/, errorMGS_1.default(mgs, "Error: 500")];
                    tot = Number(args[2]) + Number(ship.channelSize);
                    console.log(tot);
                    // Add Space
                    if (tot > 20)
                        return [2 /*return*/, errorMGS_1.default(mgs, "Non puoi superare il limite di **20**.\nSpazio corrente **" + ship.channelSize + "**")];
                    // Update
                    db_objct.tables.crew_ship_table
                        .update({ channelSize: Number(args[2]) + Number(ship.channelSize) }, { where: { shipID: role.id } })
                        .then(function () {
                        // Embed
                        var embed = new discord_js_1.MessageEmbed()
                            .setAuthor(config_json_1.bot_setting.author)
                            .setColor(config_json_1.bot_setting.color)
                            .setDescription("Posti Aggiornati con successo!\n<@&" + role.id + ">: " + ship.channelSize + " --> " + tot);
                        // Send Message
                        mgs.channel.send(embed);
                    })
                        .catch(function (err) {
                        // Error MGS
                        errorMGS_1.default(mgs, "Error: 500");
                    });
                    return [2 /*return*/];
            }
        });
    });
}
exports.default = addSpace;
