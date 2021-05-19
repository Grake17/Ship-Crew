// ========================================
// Create text utils
// ========================================

// Import Discord
import { Message, CategoryChannel } from "discord.js";
// Import Crews Interface
import Crew from "../../db/models/Crews/crews_attributes";

// Create Crew TextChannel
export default async function createTextChannel(
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