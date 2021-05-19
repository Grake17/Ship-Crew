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
// Import GetUserCrew
import getUserCrew from "../../../Utils/Utils Get/getUserCrew";
// Import Config
import { bot_setting } from "../../../config.json";

// Export Command
export default async function listCustom(
  mgs: Message,
  db_objct: { tables: tables; sequelize: Sequelize },
  args: string[]
) {
  // Get Crew
  const user = (await getUserCrew(mgs.author.id, db_objct.tables))?.get();
  // Check Name
  if (!user?.ciurmaId) return errorMGS(mgs, "Errore nella sintassi");
  // Get Ship
  const ship = (await getcrewShip(user?.ciurmaId, db_objct.tables))?.get();
  // Ship Names
  const ship_names = ship?.customName?.split(",");
  // MGS Content
  let content: string[] = [];
  // Check length Names
  if (!ship_names || ship_names.length == 0) {
    // Set MGS content if Names Are 0
    content.push(
      `La lista dei nomi personalizzati della ciurma <@&${ship?.shipID}> è vuota.`
    );
  } else {
    // Set MGS content if Names Are > 0
    content.push(
      `Ecco la lista dei nomi personalizzati della ciurma <@&${ship?.shipID}>\n`
    );
    // For Loop
    for (var x = 0; x < ship_names.length; x++) {
      // Add Value to array
      content.push(`Nome [**${x}**]: ${ship_names[x]}`);
    }
  }
  console.log(content)
  // Embed
  const embed = new MessageEmbed()
    .setAuthor(bot_setting.author)
    .setColor(bot_setting.color)
    .setDescription(content);
  // Send Message
  mgs.channel.send(embed);
}
