// ========================================
// App Main Discord
// ========================================

// Import DiscordJs
import { Client } from "discord.js";
// Import Env
import { env_var } from "./env";
// Import DB
import db_load from "./db/mainDB";
// import handler
import vocal_handler from "./handlers/vocal_handler";
// Message Hanlder
import message_handler from "./handlers/message_handler";

// Try Catch For Error
try {
  // New Client
  const bot = new Client();

  //Env Var
  const env = env_var();

  // Load DB
  db_load()
    .then((db_object) => {
      // Check Result
      if (!db_object) return;

      // Sync Table
      db_object.tables.crew_ship_table.sync();

      // Bot On
      bot.on("ready", () => console.log(`${bot.user?.username} pronto!`));

      // Bot Message Listener
      bot.on("message", (mgs) => {
        message_handler(mgs, db_object);
      });

      // Bot Voice Listener
      bot.on("voiceStateUpdate", (oldMember, newMember) => {
        vocal_handler(oldMember, newMember, db_object);
      });

      // Bot Login
      bot.login(env.token);
    })
    .catch((err) => {
      // Console Log
      console.error(err);
    });
} catch (err) {
  // Console Log Error
  console.error(err);
}
