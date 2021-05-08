"use strict";
// ========================================
// Create Ship Command
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
// Check User Permission
var checkPermission_1 = __importDefault(require("../../../Utils/checkPermission"));
// Import Error MGS
var errorMGS_1 = __importDefault(require("../../../Utils/errorMGS"));
// Import Get Crew
var getCrew_1 = __importDefault(require("../../../Utils/Utils Get/getCrew"));
// Import Config
var config_json_1 = require("../../../config.json");
// Import Get Crew Ship
var getCrewShip_1 = __importDefault(require("../../../Utils/Utils Get/getCrewShip"));
// Export Function
function create(mgs, db_objct, args) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function () {
        var crew_role, crew, ship;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    // Check Permission
                    if (!checkPermission_1.default(mgs.author.id))
                        return [2 /*return*/, errorMGS_1.default(mgs, "Non hai i permessi per questo comando!")];
                    crew_role = mgs.mentions.roles.first();
                    // Check Roles
                    if (!crew_role)
                        return [2 /*return*/, errorMGS_1.default(mgs, "Sintassi invalida!")];
                    return [4 /*yield*/, getCrew_1.default(crew_role.id, db_objct.tables)];
                case 1:
                    crew = (_a = (_c.sent())) === null || _a === void 0 ? void 0 : _a.get();
                    // Check Crew
                    if (!crew)
                        return [2 /*return*/, errorMGS_1.default(mgs, "La ciruma non esiste")];
                    return [4 /*yield*/, getCrewShip_1.default(crew.crewId, db_objct.tables)];
                case 2:
                    ship = (_b = (_c.sent())) === null || _b === void 0 ? void 0 : _b.get();
                    // Check Ship
                    if (ship)
                        return [2 /*return*/, errorMGS_1.default(mgs, "La ciurma ha già la sua nave")];
                    // Create Crew Ship
                    createShip(mgs, crew, db_objct.tables)
                        .then(function () {
                        // Message Embed
                        var embed = new discord_js_1.MessageEmbed()
                            .setAuthor(config_json_1.bot_setting.author)
                            .setColor(config_json_1.bot_setting.color)
                            .setTitle("Ship " + crew.name + " creata")
                            .setDescription("Ricordati di settare i permessi");
                        // Send Embed
                        mgs.channel.send(embed);
                    })
                        .catch(function (err) {
                        // Return Error
                        return errorMGS_1.default(mgs, err);
                    });
                    return [2 /*return*/];
            }
        });
    });
}
exports.default = create;
// Function Check Error
function createShip(mgs, crew, tables) {
    return __awaiter(this, void 0, void 0, function () {
        var _this = this;
        return __generator(this, function (_a) {
            // Return Promise
            return [2 /*return*/, new Promise(function (resolve, rejects) { return __awaiter(_this, void 0, void 0, function () {
                    var category, text, voice;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, createCategory(mgs, crew)];
                            case 1:
                                category = _a.sent();
                                // Check Category
                                if (!category)
                                    return [2 /*return*/, rejects("Errore durante la creazione della categoria")];
                                return [4 /*yield*/, createTextChannel(mgs, crew, category)];
                            case 2:
                                text = _a.sent();
                                // Check Text
                                if (!text)
                                    return [2 /*return*/, rejects("Errore durante la creazione del canale testuale")];
                                return [4 /*yield*/, createVocalChannel(mgs, crew, category)];
                            case 3:
                                voice = _a.sent();
                                // Check Voice
                                if (!voice)
                                    return [2 /*return*/, rejects("Errore durante la creazione del canale vocale")];
                                // Add Ship In DB
                                return [4 /*yield*/, tables.crew_ship_table
                                        .create({
                                        shipID: crew.crewId,
                                        parentshipID: category.id,
                                        textChannelID: text.id,
                                        voiceChannelID: voice.id,
                                    })
                                        .catch(function () {
                                        return rejects("Errore inserimento nave DB");
                                    })];
                            case 4:
                                // Add Ship In DB
                                _a.sent();
                                // Resolve Promise
                                resolve("Ship configurata");
                                return [2 /*return*/];
                        }
                    });
                }); })];
        });
    });
}
// Create Crew Category
function createCategory(mgs, crew) {
    var _a;
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, ((_a = mgs.guild) === null || _a === void 0 ? void 0 : _a.channels.create(crew.name, {
                        type: "category",
                    }))];
                case 1: 
                // Create Category
                return [2 /*return*/, _b.sent()];
            }
        });
    });
}
// Create Crew TextChannel
function createTextChannel(mgs, crew, category) {
    var _a;
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, ((_a = mgs.guild) === null || _a === void 0 ? void 0 : _a.channels.create("Canale Testuale " + crew.name, {
                        type: "text",
                        parent: category,
                    }))];
                case 1: 
                // Create Category
                return [2 /*return*/, _b.sent()];
            }
        });
    });
}
// Create Vocal Channel
function createVocalChannel(mgs, crew, category) {
    var _a;
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, ((_a = mgs.guild) === null || _a === void 0 ? void 0 : _a.channels.create("Canale Vocale " + crew.name, {
                        type: "voice",
                        parent: category,
                    }))];
                case 1: 
                // Create Category
                return [2 /*return*/, _b.sent()];
            }
        });
    });
}
