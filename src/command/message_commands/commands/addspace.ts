// ========================================
// Command Add Space
// ========================================

// Import Discord Type
import { Message, MessageEmbed } from "discord.js";
// Import Sequelize
import { Sequelize } from "sequelize";
// Import Table Interface
import tables from "../../../db/table_interface";
// Import Config
import { bot_setting } from "../../../config.json";
// Import Check Permission
import checkPermission from "../../../Utils/checkPermission";
// Error MGS
import errorMGS from "../../../Utils/errorMGS";
// Import Get Ship
import getShip from "../../../Utils/Utils Get/getCrewShip";

// Export Command
export default async function addSpace(
  mgs: Message,
  db_objct: { tables: tables; sequelize: Sequelize },
  args: string[]
) {
  // Check Permission
  if (!checkPermission(mgs.author.id))
    return errorMGS(mgs, "Non hai i permessi per fare questo comando");
  // Get Role
  const role = mgs.mentions.roles.first();
  // Check Roles & Number
  if (!role || !Number(args[2])) return errorMGS(mgs, "Sintassi Invalida");
  // Get Ship
  const ship = (await getShip(role.id, db_objct.tables))?.get();
  // Check Space
  if (!ship?.channelSize) return errorMGS(mgs, "Error: 500");
  // Tot
  const tot = Number(args[2]) + Number(ship.channelSize);
  console.log(tot)
  // Add Space
  if (tot > 20) return errorMGS(mgs, `Non puoi superare il limite di **20**.\nSpazio corrente **${ship.channelSize}**`);
  // Update
  db_objct.tables.crew_ship_table
    .update(
      { channelSize: Number(args[2]) + Number(ship.channelSize) },
      { where: { shipID: role.id } }
    )
    .then(() => {
      // Embed
      const embed = new MessageEmbed()
        .setAuthor(bot_setting.author)
        .setColor(bot_setting.color)
        .setDescription(
          `Posti Aggiornati con successo!\n<@&${role.id}>: ${ship.channelSize} --> ${tot}`
        );
      // Send Message
      mgs.channel.send(embed);
    })
    .catch((err) => {
      // Error MGS
      errorMGS(mgs, "Error: 500");
    });
}
