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
// Import getID
import getID from "../../../Utils/getID";

// Export Command
export default async function listCustom(
  mgs: Message,
  db_objct: { tables: tables; sequelize: Sequelize },
  args: string[]
) {
  // Get ID
  getID(mgs, db_objct.tables, args)
    .then(async (id) => {
      // Get Ship
      const ship = (await getcrewShip(id, db_objct.tables))?.get();
      // Ship Names
      const ship_names = ship?.customName?.split(",");
      // MGS Content
      let content: string[] = [];
      // Check length Names
      if (!ship_names || ship_names.length == 0) {
        // Set MGS content if Names Are 0
        content.push(
          `La lista dei nomi personalizzati è vuota.`
        );
      } else {
        // Set MGS content if Names Are > 0
        content.push(
          `Ecco la lista dei nomi personalizzati della ciurma <@&${ship?.shipID}>\n`
        );
        // For Loop
        for (var x = 0; x < ship_names.length; x++) {
          // Add Value to array
          content.push(`Nome [**${x+1}**]: ${ship_names[x]}`);
        }
      }
      // Embed
      const embed = new MessageEmbed()
        .setAuthor(bot_setting.author)
        .setColor(bot_setting.color)
        .setDescription(content);
      // Send Message
      mgs.channel.send(embed);
    })
    .catch((err) => {
      return errorMGS(mgs, err);
    });
}
