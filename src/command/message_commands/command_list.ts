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
import deleteShip from "./commands/deleteShip"; // Import Delete Ship
import help from "./commands/help"; // Command Help
import listShip from "./commands/listShip"; // Command List
import addSpace from "./commands/addspace"; // Command Add Space

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
  delete: deleteShip,
  help: help,
  list: listShip,
  addspace: addSpace
};

// Export Command List
export default command_list;
