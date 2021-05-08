// ========================================
// Vocal Delete
// ========================================

// Import Discord Type
import { VoiceState } from "discord.js";
// Import Sequelize
import { Sequelize } from "sequelize";
// Import Table Interface
import tables from "../../db/table_interface";
// import Get Ship By Parent
import getparentShip from "../../Utils/Utils Get/getparentShip";

// Export Function Delete
export default async function vocal_delete(
  oldMember: VoiceState,
  newMember: VoiceState,
  db_object: { tables: tables; sequelize: Sequelize }
) {
  // Check Parent
  if (!oldMember.channel?.parentID) return;
  // Get Ship
  const ship = (
    await getparentShip(oldMember.channel?.parentID, db_object.tables)
  )?.get();
  // Check InDeleteble Channel && Parent
  if ((!(oldMember.channelID !== ship?.voiceChannelID)) || (oldMember.channel.parentID !== ship?.parentshipID)) return;
  // Check Lenght
  if (oldMember.channel.members.size === 0) oldMember.channel.delete();
}
