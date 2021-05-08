// ========================================
// Command List
// ========================================

// Import Discord Type
import { Message } from "discord.js";
// Import Sequelize
import { Sequelize } from "sequelize";
// Import Table Interface
import tables from "../../db/table_interface";
// Import Commands
import create from "./Ship Commands/createShip"; // Command Create Ship

// Command List
const command_list: Record<
  string,
  (
    mgs: Message,
    db_objct: { tables: tables; sequelize: Sequelize },
    args: string[]
  ) => Promise<void> | undefined
> = {
    create: create
};

// Export Command List
export default command_list;
