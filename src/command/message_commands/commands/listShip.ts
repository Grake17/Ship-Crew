// ========================================
// Ship List
// ========================================

// import Discord
import { Message, MessageEmbed } from "discord.js";
// Import Sequelize
import { Sequelize } from "sequelize";
// Import Tables Interface
import tables from "../../../db/table_interface";
// Import Error MGS
import errorMGS from "../../../Utils/errorMGS";
// Import Config
import { bot_setting } from "../../../config.json";
// Import Check Permission
import checkPermission from "../../../Utils/checkPermission";

// Export Command
export default async function listShip(
  mgs: Message,
  db_objct: { tables: tables; sequelize: Sequelize },
  args: string[]
) {
  // Check Permission
  if(!checkPermission(mgs.author.id)) return errorMGS(mgs, "Non hai i permessi per questo comando")
  // Message Embed
  const embed = new MessageEmbed()
    .setAuthor(bot_setting.author)
    .setColor(bot_setting.color)
  // Get All Ship
  const list = await db_objct.tables.crew_ship_table.findAll();
  // Check Lenght
  if (list.length == 0) {
    // Set Content
    embed.setDescription("Nessuna Ship registrata");
  } else {
    // Array
    let array = [];
    // Map
    const lists = list.map((element) => {
      // Get Data
      const data = element.get();
      // Element Content
      let content = [
        `\n**NAVE CIURMA**: <@&${data.shipID}>`,
        `◾️ Canali Vocali #1: <#${data.fixedChannelsID?.split(",")[0]}>`,
        `◾️ Canali Vocali #2: <#${data.fixedChannelsID?.split(",")[1]}>`,
        `◾️ Canali Vocali #3: <#${data.fixedChannelsID?.split(",")[2]}>`,
        `◾️ Spazio Canali: **${data.channelSize}**`,
        `◾️ Nomi personalizzati: ${data.customName}`,
      ].join("\n");
      return content;
    });
    // Set Descrption
    embed.setDescription(lists);
  }
  // Send Embed
  mgs.channel.send(embed);
}
