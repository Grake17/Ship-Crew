// ========================================
// Vocal Create
// ========================================

// Import Discord Types
import { VoiceChannel, VoiceState } from "discord.js";
// Import Sequelize Types
import { Sequelize } from "sequelize";
// Import Tables Interface
import tables from "../../db/table_interface";
// Import Create Channel
import createChannel from "../../Utils/Create Utils/createChannel";
// Import Get Crew Ship
import getcrewShip from "../../Utils/Utils Get/getCrewShip";
// Import Get User Crew
import getUserCrew from "../../Utils/Utils Get/getUserCrew";

// Export Function
export default async function create_Channel(
  oldMember: VoiceState,
  newMember: VoiceState,
  db_object: { tables: tables; sequelize: Sequelize }
) {
  // Get Crew
  const user_crew = (await getUserCrew(newMember.id, db_object.tables))?.get();
  // Check Crew
  if (!user_crew?.ciurmaId)
    return newMember.setChannel(null, "Fuori dalle Balle");
  // Get Crew Ship Data
  const crew_ship = (
    await getcrewShip(user_crew.ciurmaId, db_object.tables)
  )?.get();
  // Check Ship
  if (!crew_ship?.shipID) return newMember.setChannel(null, "Fuori dalle Balle");
  // Create Channel
  createChannel(newMember, crew_ship)
    .then((channel: VoiceChannel) => {
      // Set User Channel
      newMember.setChannel(channel, "Teletrasporto nella ciurma attivato!");
    })
    .catch(err => {
      // error on channel creation
      newMember.setChannel(null, "Fuori dalle Balle");
    });
}
