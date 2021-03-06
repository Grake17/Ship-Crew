// ========================================
// Edit Custom
// ========================================

// import Discord
import { Message, MessageEmbed } from "discord.js";
// Import Sequelize
import { Sequelize } from "sequelize";
// Import Tables Interface
import tables from "../../../db/table_interface";
// Import Error MGS
import errorMGS from "../../../Utils/errorMGS";
// Import GetCrewShip
import getcrewShip from "../../../Utils/Utils Get/getCrewShip";
// Import Config
import { bot_setting } from "../../../config.json";
import getID from "../../../Utils/getID";

// Export Command
export default async function cancCustom(
  mgs: Message,
  db_objct: { tables: tables; sequelize: Sequelize },
  args: string[]
) {
  // Check Name
  getID(mgs, db_objct.tables, args)
    .then(async (id) => {
      // Name
      let name = mgs.content;
      // Extract Name
      if (mgs.mentions.roles.first()?.id) {
        name = name.substring(12, mgs.content.length - 23);
      } else {
        name = name.substring(12);
      }
      // Get Ship
      const ship = (await getcrewShip(id, db_objct.tables))?.get();
      // Ship Names
      const ship_names = ship?.customName?.split(",");
      // Check Ship Names
      if (!ship_names)
        return errorMGS(mgs, "Non hai nessun nome personalizzato");
      // Check Undefinds
      if (!ship_names.includes(name))
        return errorMGS(mgs, "Nome non trovato!");
      // Remove
      const index = ship_names.indexOf(name);
      // Check Index
      if (index > -1) ship_names.splice(index, 1);
      // Check Length
      if (ship_names.length == 0)
        return errorMGS(mgs, "Non puoi eliminare l'ultimo nome");
      // Update DB
      db_objct.tables.crew_ship_table
        .update(
          { customName: String(ship_names) },
          { where: { shipID: id } }
        )
        .then(() => {
          // Embed
          const embed = new MessageEmbed()
            .setAuthor(bot_setting.author)
            .setColor(bot_setting.color)
            .setDescription(`Il nome **${name}** ?? stato rimosso correttamente`);
          // Send MGS
          mgs.channel.send(embed);
        })
        .catch((err) => {
          // Error MGS
          errorMGS(mgs, "Error: 500");
        });
    })
    .catch((err) => {
      // Error MGS
      errorMGS(mgs, err);
    });
}
