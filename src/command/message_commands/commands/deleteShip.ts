// ========================================
// Delete Ship
// ========================================

// Import Discord Type
import { Message, MessageEmbed } from "discord.js";
// Import Sequelize
import { Sequelize } from "sequelize";
// Import Table Interface
import tables from "../../../db/table_interface";
// Import Error MGS
import errorMGS from "../../../Utils/errorMGS";
// Import Get Ship
import getShip from "../../../Utils/Utils Get/getCrewShip";
// Import Config
import { bot_setting } from "../../../config.json";
// Import Check Permission
import checkPermission from '../../../Utils/checkPermission'

// Export Function
export default async function deleteShip(
  mgs: Message,
  db_objct: { tables: tables; sequelize: Sequelize },
  args: string[]
) {
  // Check Permission
  if (!checkPermission(mgs.author.id))
    return errorMGS(mgs, "Non hai i permessi per questo comando!");
  // Get Role
  const role = mgs.mentions.roles.first();
  // Check Role
  if (!role) return errorMGS(mgs, "Sintassi invalida");
  // Check Ship
  const ship = (await getShip(role.id, db_objct.tables))?.get();
  // Check Ship
  if (!ship) return errorMGS(mgs, "Ship non trovata");
  // Delete Ship
  db_objct.tables.crew_ship_table
    .destroy({ where: { shipID: role.id } })
    .then(() => {
      // Embed
      const embed = new MessageEmbed()
        .setAuthor(bot_setting.author)
        .setColor(bot_setting.color)
        .setTitle("Nave eliminata con successo")
        .setDescription("Ricorda di eliminare i canali!");
      // Send MGS
      mgs.channel.send(embed);
    });
}

