// ========================================
// Create Category
// ========================================

// Import Discord Type
import { Message } from "discord.js";
// Import Crew Interface
import Crew from "../../db/models/Crews/crews_attributes";

// Create Crew Category
export default async function createCategory(mgs: Message, crew: Crew) {
    // Create Category
    return await mgs.guild?.channels.create(crew.name, {
      type: "category",
    });
  }