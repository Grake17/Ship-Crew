// ========================================
// Message Handler Script
// ========================================

// Import Discord Type
import { Message } from "discord.js";
// import Sequelize
import { Sequelize } from "sequelize";
// Import Command Ship
import command_list from "../command/message_commands/command_list";
// Import Tables
import tables from "../db/table_interface";
// Import Env Var
import { env_var } from "../env";
// Import LOG
import log from "../Utils/log";
// Import Config
import { command_channel } from "../config.json";

// Export handlers
export default async function message_hanlder(
  mgs: Message,
  db_objct: { tables: tables; sequelize: Sequelize }
) {
  // Env Varibles
  const env = env_var();[">s", "comand"]
  // Check Channel
  if (!command_channel.includes(mgs.channel.id)) return;
  // Split Message
  const args = mgs.content.split(" ");
  // Check Prefix
  if (args[0] !== env.prefix + "s") return;
  // Exec Command
  command_list[args[1]]?.(mgs, db_objct, args);
  // Log Function
  log(mgs);
}
