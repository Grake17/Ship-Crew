// ========================================
// Channel Create
// ========================================

// Import Discord Type
import { VoiceState } from "discord.js";
// Import Crew Ship Interface
import crew_ship from "../../db/models/Ship/crew_ship_attributes";

// Exports Functions
export default async function createChannel(
  newMember: VoiceState,
  crew_ship: crew_ship
): Promise<unknown> {
  // Return Promise
  return new Promise((resolve, rejects) => {
    // Get Name
    const name = getName(newMember, crew_ship);
    // Create Channel
    newMember.guild.channels
      .create(name, {
        type: "voice",
        parent: crew_ship.parentshipID,
        userLimit: crew_ship.channelSize,
      })
      .then((channel) => {
        // Set Users in new Channel
        resolve(channel);
      })
      .catch((err) => {
        // Reject Promise
        rejects(err);
      });
  });
}

// Function For Get Name
function getName(newMember: VoiceState, crew_ship: crew_ship) {
  // Check Names
  if (!crew_ship.customName) return "Temp Lobby";
  console.log(newMember.id === "332629463621959692")
  // Randoms Name
  const names = crew_ship.customName.split(",");
  // LOOOOL
  if (!(newMember.id === "332629463621959692"))
    // Return Names
    return names[Math.floor(Math.random() * names.length)];
  else
    if (names.includes("Gay")) return "Gay";
    else return names[Math.floor(Math.random() * names.length)];
}
