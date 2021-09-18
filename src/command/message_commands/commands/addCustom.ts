// ========================================
// Add Custom Name
// ========================================

// Import Discord
import { Message, MessageEmbed } from "discord.js";
// Import Sequelize
import { Sequelize } from "sequelize";
// Import Tables Interface
import tables from "../../../db/table_interface";
// Import Get Crew
import getCrew from "../../../Utils/Utils Get/getCrew";
// import Error MGS
import errorMGS from "../../../Utils/errorMGS";
// import Get Ship
import getShip from "../../../Utils/Utils Get/getCrewShip";
// Import Config
import { bot_setting } from "../../../config.json";
import getID from "../../../Utils/getID";

// Export Command
export default async function addCustom(
  mgs: Message,
  db_objct: { tables: tables; sequelize: Sequelize },
  args: string[]
) {
  getID(mgs, db_objct.tables, args)
    .then(async (id) => {
      // Name
      let name = mgs.content;
      // Extract Name
      if (mgs.mentions.roles.first()?.id) {
        name = name.substring(11, mgs.content.length - 23);
      } else {
        name = name.substring(11);    
      }  
      // Get Ship
      const ship = (await getShip(id, db_objct.tables))?.get();
      // Add Name to value
      let names = ship?.customName?.split(",");
      // Check Mane Exist
      if (names?.includes(name))
        return errorMGS(mgs, `Il nome **${name}** è già presente nella lista`);
      // Get Crew
      const crew = (await getCrew(id, db_objct.tables))?.get();
      // Count Name
      if (names)
        if (!crew?.livellociurma || names.length >= crew.livellociurma * 3)
          return errorMGS(
            mgs,
            `La ciurma ha già raggiunto il suo limite di nomi personalizzati!`
          );    
      // Add New Name
      names?.push(name);
      // Edit DB && error handler
      db_objct.tables.crew_ship_table
        .update(
          { customName: String(names) },
          { where: { shipID: ship?.shipID } }
        )
        .then(() => {
          // Embed
          const embed = new MessageEmbed()
            .setAuthor(bot_setting.author)
            .setColor(bot_setting.color)
            .setTitle(`Nome inserito!`)
            .setDescription(`Il nome **${name}** è ora disponibile!`);
          // Send MGS
          mgs.channel.send(embed);
        })
        .catch((err) => {
          // Error MGS
          errorMGS(mgs, "Error 500");
        });
    })
    .catch((err) => {
      // Error MGS
      errorMGS(mgs, err);
    });
}
