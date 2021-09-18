// ========================================
// Env Script
// ========================================

// Import DotEnv
require("dotenv").config();

// Define Variables
const env_data = [
  "TOKEN",
  "PREFIX",
  "DATABASE",
  "USER_DB",
  "PASSWORD",
  "HOST",
  "Create_ChannelID",
];

// Export Function
export function env_var() {
  // Verify if null
  const outdata = env_data.filter(
    // Check if process is !
    (env_data) => !process.env[env_data]
  );
  // Check Lenght
  if (outdata.length) {
    throw new Error(`Missing Env Variables: ${outdata.join(", ")}`);
  }
  // Return
  return {
    token: process.env.TOKEN, // Process Token Bot
    prefix: process.env.PREFIX, // Process Prefix
    database: process.env.DATABASE, // Process Database
    user_db: process.env.USER_DB, // Process USERNAME
    password_db: process.env.PASSWORD, // Process Password DB
    host: process.env.HOST, // Process HOST DB
    create_channelid: process.env.Create_ChannelID, // Process Create Channel ID
  };
}
