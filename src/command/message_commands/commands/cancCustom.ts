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
export default async function cancCustom(
  mgs: Message,
  db_objct: { tables: tables; sequelize: Sequelize },
  args: string[]
) {
  // Get Crew
  const user = (await getUserCrew(mgs.author.id, db_objct.tables))?.get();
  // Check Name
  if (!user?.ciurmaId || !args[2])
    return errorMGS(mgs, "Errore nella sintassi");
  // Get Ship
  const ship = (await getcrewShip(user?.ciurmaId, db_objct.tables))?.get();
  // Ship Names
  const ship_names = ship?.customName?.split(",");
  // Check Ship Names
  if (!ship_names) return errorMGS(mgs, "Non hai nessun nome personalizzato");
  // Check Undefinds
  if (!ship_names.includes(args[2])) return errorMGS(mgs, "Nome non trovato!");
  // Remove
  const index = ship_names.indexOf(args[2]);
  // Check Index
  if (index > -1) ship_names.splice(index, 1);
  // Check Length
  if (ship_names.length == 0) return errorMGS(mgs, "Non puoi eliminare l'ultimo nome");
  // Update DB
  db_objct.tables.crew_ship_table
    .update(
      { customName: String(ship_names) },
      { where: { shipID: user.ciurmaId } }
    )
    .then(() => {
      // Embed
      const embed = new MessageEmbed()
        .setAuthor(bot_setting.author)
        .setColor(bot_setting.color)
        .setDescription(`Il nome ${args[2]} è stato rimosso correttamente`);
      // Send MGS
      mgs.channel.send(embed);
    })
    .catch((err) => {
      // Error MGS
      errorMGS(mgs, "Error: 500");
    });
}
