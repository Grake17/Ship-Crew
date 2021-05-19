// ========================================
// Get ID Function
// ========================================

// Import Discord Type
import { Message } from "discord.js";
// Import Tbale Interface
import tables from "../db/table_interface";
// import Check Permission
import checkPermission from "./checkPermission";
// import Get User Crew
import getUserCrew from "./Utils Get/getUserCrew";
// Import Config
import { roles } from "../config.json"

// Export Function
export default async function getID(
  mgs: Message,
  table: tables,
  args: string[]
): Promise<string> {
  return new Promise(async (resolve, reject) => {
    // Get Role
    const role = mgs.mentions.roles.first();
    // Check Roles
    if (role) {
      // Check Permission
      if (!checkPermission(mgs.author.id)) {
        return reject("Non puoi fare questo comando");
      }
      resolve(role.id);
    } else {
      // Check Content
      if (args[1] == "listname") {
        // Get Crew
        const user = (await getUserCrew(mgs.author.id, table))?.get();
        // Check Name
        if (!user?.ciurmaId) return reject("Errore nella sintassi");
        resolve(user.ciurmaId);
      } else {
        // Check PL
        if (!mgs.guild?.members.cache.get(mgs.author.id)?.roles.cache.has(roles.role_pl))
          return reject("Non puoi fare questo comando");
        // Get Crew
        const user = (await getUserCrew(mgs.author.id, table))?.get();
        // Check Name
        if (!user?.ciurmaId) return reject("Errore nella sintassi");
        resolve(user.ciurmaId);
      }
    }
  });
}
