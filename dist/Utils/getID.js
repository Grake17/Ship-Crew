"use strict";
// ========================================
// Get ID Function
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
// import Check Permission
var checkPermission_1 = __importDefault(require("./checkPermission"));
// import Get User Crew
var getUserCrew_1 = __importDefault(require("./Utils Get/getUserCrew"));
// Import Config
var config_json_1 = require("../config.json");
// Export Function
function getID(mgs, table, args) {
    return __awaiter(this, void 0, void 0, function () {
        var _this = this;
        return __generator(this, function (_a) {
            return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                    var role, user, user;
                    var _a, _b, _c, _d;
                    return __generator(this, function (_e) {
                        switch (_e.label) {
                            case 0:
                                role = mgs.mentions.roles.first();
                                if (!role) return [3 /*break*/, 1];
                                // Check Permission
                                if (!checkPermission_1.default(mgs.author.id)) {
                                    return [2 /*return*/, reject("Non puoi fare questo comando")];
                                }
                                resolve(role.id);
                                return [3 /*break*/, 5];
                            case 1:
                                if (!(args[1] == "listname")) return [3 /*break*/, 3];
                                return [4 /*yield*/, getUserCrew_1.default(mgs.author.id, table)];
                            case 2:
                                user = (_a = (_e.sent())) === null || _a === void 0 ? void 0 : _a.get();
                                // Check Name
                                if (!(user === null || user === void 0 ? void 0 : user.ciurmaId))
                                    return [2 /*return*/, reject("Errore nella sintassi")];
                                resolve(user.ciurmaId);
                                return [3 /*break*/, 5];
                            case 3:
                                // Check PL
                                if (!((_c = (_b = mgs.guild) === null || _b === void 0 ? void 0 : _b.members.cache.get(mgs.author.id)) === null || _c === void 0 ? void 0 : _c.roles.cache.has(config_json_1.roles.role_pl)))
                                    return [2 /*return*/, reject("Non puoi fare questo comando")];
                                return [4 /*yield*/, getUserCrew_1.default(mgs.author.id, table)];
                            case 4:
                                user = (_d = (_e.sent())) === null || _d === void 0 ? void 0 : _d.get();
                                // Check Name
                                if (!(user === null || user === void 0 ? void 0 : user.ciurmaId))
                                    return [2 /*return*/, reject("Errore nella sintassi")];
                                resolve(user.ciurmaId);
                                _e.label = 5;
                            case 5: return [2 /*return*/];
                        }
                    });
                }); })];
        });
    });
}
exports.default = getID;
