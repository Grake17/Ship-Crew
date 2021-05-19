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
import create from "./commands/createShip"; // Command Create Ship
import addCustom from "./commands/addCustom"; // Command Add Custom Name
import listCustom from "./commands/listCustom"; // Command List Custom Name
import cancCustom from "./commands/cancCustom"; // remove custom name command

// Command List
const command_list: Record<
  string,
  (
    mgs: Message,
    db_objct: { tables: tables; sequelize: Sequelize },
    args: string[]
  ) => Promise<void> | undefined
> = {
  create: create,
  addname: addCustom,
  listname: listCustom,
  cancname: cancCustom,
};

// Export Command List
export default command_list;
