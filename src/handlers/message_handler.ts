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

// Export handlers
export default async function message_hanlder(
  mgs: Message,
  db_objct: { tables: tables; sequelize: Sequelize }
) {
    // Env Varibles
    const env = env_var()
    // Check Channel
    if(!mgs.channel.id) return;  
    // Split Message 
    const args = mgs.content.split(" ");  
    // Check Prefix
    if(args[0] !== env.prefix) return;
    // Exec Command
    command_list[args[1]]?.(mgs, db_objct, args);   
}
