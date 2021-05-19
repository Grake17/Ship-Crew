"use strict";
// ========================================
// Edit Custom
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
// import Discord
var discord_js_1 = require("discord.js");
// Import Error MGS
var errorMGS_1 = __importDefault(require("../../../Utils/errorMGS"));
// Import GetCrewShip
var getCrewShip_1 = __importDefault(require("../../../Utils/Utils Get/getCrewShip"));
// Import GetUserCrew
var getUserCrew_1 = __importDefault(require("../../../Utils/Utils Get/getUserCrew"));
// Import Config
var config_json_1 = require("../../../config.json");
// Export Command
function cancCustom(mgs, db_objct, args) {
    var _a, _b, _c;
    return __awaiter(this, void 0, void 0, function () {
        var user, ship, ship_names, index;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0: return [4 /*yield*/, getUserCrew_1.default(mgs.author.id, db_objct.tables)];
                case 1:
                    user = (_a = (_d.sent())) === null || _a === void 0 ? void 0 : _a.get();
                    // Check Name
                    if (!(user === null || user === void 0 ? void 0 : user.ciurmaId) || !args[2])
                        return [2 /*return*/, errorMGS_1.default(mgs, "Errore nella sintassi")];
                    return [4 /*yield*/, getCrewShip_1.default(user === null || user === void 0 ? void 0 : user.ciurmaId, db_objct.tables)];
                case 2:
                    ship = (_b = (_d.sent())) === null || _b === void 0 ? void 0 : _b.get();
                    ship_names = (_c = ship === null || ship === void 0 ? void 0 : ship.customName) === null || _c === void 0 ? void 0 : _c.split(",");
                    // Check Ship Names
                    if (!ship_names)
                        return [2 /*return*/, errorMGS_1.default(mgs, "Non hai nessun nome personalizzato")];
                    // Check Undefinds
                    if (!ship_names.includes(args[2]))
                        return [2 /*return*/, errorMGS_1.default(mgs, "Nome non trovato!")];
                    index = ship_names.indexOf(args[2]);
                    // Check Index
                    if (index > -1)
                        ship_names.splice(index, 1);
                    // Check Length
                    if (ship_names.length == 0)
                        return [2 /*return*/, errorMGS_1.default(mgs, "Non puoi eliminare l'ultimo nome")];
                    // Update DB
                    db_objct.tables.crew_ship_table
                        .update({ customName: String(ship_names) }, { where: { shipID: user.ciurmaId } })
                        .then(function () {
                        // Embed
                        var embed = new discord_js_1.MessageEmbed()
                            .setAuthor(config_json_1.bot_setting.author)
                            .setColor(config_json_1.bot_setting.color)
                            .setDescription("Il nome " + args[2] + " \u00E8 stato rimosso correttamente");
                        // Send MGS
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
exports.default = cancCustom;
