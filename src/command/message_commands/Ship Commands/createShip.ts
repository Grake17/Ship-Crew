// ========================================
// Create Ship Command
// ========================================

// Import Discord Type
import { CategoryChannel, Message, MessageEmbed } from "discord.js";
// Import Sequelize
import { Sequelize } from "sequelize";
// Import Tables Interface
import tables from "../../../db/table_interface";
// Check User Permission
import checkPermission from "../../../Utils/checkPermission";
// Import Error MGS
import errorMGS from "../../../Utils/errorMGS";
// Import Get Crew
import getCrew from "../../../Utils/Utils Get/getCrew";
// Import Config
import { bot_setting } from "../../../config.json";
// Import Crew Interface
import Crew from "../../../db/models/Crews/crews_attributes";
// Import Get Crew Ship
import getcrewShip from "../../../Utils/Utils Get/getCrewShip";

// Export Function
export default async function create(
  mgs: Message,
  db_objct: { tables: tables; sequelize: Sequelize },
  args: string[]
) {
  // Check Permission
  if (!checkPermission(mgs.author.id))
    return errorMGS(mgs, "Non hai i permessi per questo comando!");
  // Crew Role
  const crew_role = mgs.mentions.roles.first();
  // Check Roles
  if (!crew_role) return errorMGS(mgs, "Sintassi invalida!");
  // Get Crew
  const crew = (await getCrew(crew_role.id, db_objct.tables))?.get();
  // Check Crew
  if (!crew) return errorMGS(mgs, "La ciruma non esiste");
  // Chekc Ship
  const ship = (await getcrewShip(crew.crewId, db_objct.tables))?.get();
  // Check Ship
  if (ship) return errorMGS(mgs, "La ciurma ha già la sua nave");
  // Create Crew Ship
  createShip(mgs, crew, db_objct.tables)
    .then(() => {
      // Message Embed
      const embed = new MessageEmbed()
        .setAuthor(bot_setting.author)
        .setColor(bot_setting.color)
        .setTitle(`Ship ${crew.name} creata`)
        .setDescription("Ricordati di settare i permessi");
      // Send Embed
      mgs.channel.send(embed);
    })
    .catch((err) => {
      // Return Error
      return errorMGS(mgs, err);
    });
}

// Function Check Error
async function createShip(mgs: Message, crew: Crew, tables: tables) {
  // Return Promise
  return new Promise(async (resolve, rejects) => {
    // Create Category
    const category = await createCategory(mgs, crew);
    // Check Category
    if (!category)
      return rejects("Errore durante la creazione della categoria");
    // Create Text Channel
    const text = await createTextChannel(mgs, crew, category);
    // Check Text
    if (!text)
      return rejects("Errore durante la creazione del canale testuale");
    // Create Vocal Channel
    const voice = await createVocalChannel(mgs, crew, category);
    // Check Voice
    if (!voice) return rejects("Errore durante la creazione del canale vocale");
    // Add Ship In DB
    await tables.crew_ship_table
      .create({
        shipID: crew.crewId,
        parentshipID: category.id,
        textChannelID: text.id,
        voiceChannelID: voice.id,
      })
      .catch(() => {
        return rejects("Errore inserimento nave DB");
      });
    // Resolve Promise
    resolve(`Ship configurata`);
  });
}

// Create Crew Category
async function createCategory(mgs: Message, crew: Crew) {
  // Create Category
  return await mgs.guild?.channels.create(crew.name, {
    type: "category",
  });
}

// Create Crew TextChannel
async function createTextChannel(
  mgs: Message,
  crew: Crew,
  category: CategoryChannel
) {
  // Create Category
  return await mgs.guild?.channels.create(`Canale Testuale ${crew.name}`, {
    type: "text",
    parent: category,
  });
}

// Create Vocal Channel
async function createVocalChannel(
  mgs: Message,
  crew: Crew,
  category: CategoryChannel
) {
  // Create Category
  return await mgs.guild?.channels.create(`Canale Vocale ${crew.name}`, {
    type: "voice",
    parent: category,
  });
}
