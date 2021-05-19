"use strict";
// ========================================
// Vocal Create
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
// Import Create Channel
var createChannel_1 = __importDefault(require("../../Utils/Create Utils/createChannel"));
// Import Get Crew Ship
var getCrewShip_1 = __importDefault(require("../../Utils/Utils Get/getCrewShip"));
// Import Get User Crew
var getUserCrew_1 = __importDefault(require("../../Utils/Utils Get/getUserCrew"));
// Export Function
function create_Channel(oldMember, newMember, db_object) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function () {
        var user_crew, crew_ship;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0: return [4 /*yield*/, getUserCrew_1.default(newMember.id, db_object.tables)];
                case 1:
                    user_crew = (_a = (_c.sent())) === null || _a === void 0 ? void 0 : _a.get();
                    // Check Crew
                    if (!(user_crew === null || user_crew === void 0 ? void 0 : user_crew.ciurmaId))
                        return [2 /*return*/, newMember.setChannel(null, "Fuori dal Cazzo")];
                    return [4 /*yield*/, getCrewShip_1.default(user_crew.ciurmaId, db_object.tables)];
                case 2:
                    crew_ship = (_b = (_c.sent())) === null || _b === void 0 ? void 0 : _b.get();
                    // Check Ship
                    if (!(crew_ship === null || crew_ship === void 0 ? void 0 : crew_ship.shipID))
                        return [2 /*return*/, newMember.setChannel(null, "Fuori dal Cazzo")];
                    // Create Channel
                    createChannel_1.default(newMember, crew_ship)
                        .then(function (channel) {
                        // Set User Channel
                        newMember.setChannel(channel, "Teletrasporto nella ciurma attivato!");
                    })
                        .catch(function (err) {
                        // error on channel creation
                        newMember.setChannel(null, "Fuori dal Cazzo");
                    });
                    return [2 /*return*/];
            }
        });
    });
}
exports.default = create_Channel;
