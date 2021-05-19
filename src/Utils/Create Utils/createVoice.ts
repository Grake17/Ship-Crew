// ========================================
// Create VocalChannl
// ========================================

// Import Discord
import { Message, CategoryChannel } from "discord.js";
// Import Crews Interface
import Crew from "../../db/models/Crews/crews_attributes";

// Create Vocal Channel
export default async function createVocalChannel(
    mgs: Message,
    crew: Crew,
    category: CategoryChannel   
  ) {
    // Create Category
    return await mgs.guild?.channels.create(`Canale Vocale ${crew.name}`, {
      type: "voice",
      parent: category      
    });
  }