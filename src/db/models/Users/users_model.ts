// ===================================================
// User Model
// ===================================================

// Import Sequelize
import { STRING, BOOLEAN, NUMBER, DATE } from "sequelize";

// Models
const users = {
  userId: {
    type: STRING,
    unique: true,
    primaryKey: true,
  },
  gamerTag: {
    type: STRING,
    defaultValue: null,
    unique: true,
  },
  guest: {
    type: BOOLEAN,
    defaultValue: false,
  },
  ciurmaId: {
    type: STRING,
    defaultValue: null,
  },
  saldo: {
    type: NUMBER,
    defaultValue: 0,
  },
  saldoDepositatoTot: {
    type: NUMBER,
    defaultValue: 0,
  },
  saldoDepositatoPar: {
    type: NUMBER,
    defaultValue: 0,
  },
  guadagnoMensile: {
    type: NUMBER,
    defaultValue: 0,
  },
  pirataLeggendario: {
    type: BOOLEAN,
    defaultValue: false,
  },
  guardianoAthena: {
    type: BOOLEAN,
    defaultValue: false,
  },
  dataEntrataCiurma: {
    type: DATE,
    defaultValue: null,
  },
  dataEntrataVoc: {
    type: STRING,
    defaultValue: null,
  },
  bannato: {
    type: BOOLEAN,
    defaultValue: false,
  },
  discordlevel: {
    type: NUMBER,
    defaultValue: 0,
  },
  gamelevel: {
    type: NUMBER,
    defaultValue: 0,
  },
  chiavi: {
    type: NUMBER,
    defaultValue: 0,
  },
  dateGuest: {
    type: DATE,
    defaultValue: null,
  },
  guestTime: {
    type: NUMBER,
    defaultValue: 0,
  },
};

// Models
const users_model = { name: "users", model: users };

// Export Model
export default users_model;
