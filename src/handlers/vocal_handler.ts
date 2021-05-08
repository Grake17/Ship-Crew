// ========================================
// Vocal Handler Script
// ========================================

// import Discord Types
import { VoiceState } from "discord.js";
// import Sequelize Type
import { Sequelize } from "sequelize";
// Import Create Channel
import vocal_create from "../command/vocal_commands/vocal_create";
// Import Delete Channel
import vocal_delete from "../command/vocal_commands/vocal_delete";
// import Table interface
import tables from "../db/table_interface";
// import Env
import { env_var } from "../env";

// Export Function
export default async function vocal_hanlder(
  oldMember: VoiceState,
  newMember: VoiceState,
  db_object: { tables: tables; sequelize: Sequelize }
) {
  // Env Data
  const env = env_var();
  // Check Create Channel
  if (newMember.channelID === env.create_channelid)
    vocal_create(oldMember, newMember, db_object);
  // Check
  if (oldMember) vocal_delete(oldMember, newMember, db_object);
}
