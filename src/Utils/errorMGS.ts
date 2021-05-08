// ========================================
// Error MGS
// ========================================

// Import Discord Types
import { Message, MessageEmbed } from "discord.js";
// Import Config
import { bot_setting } from "../config.json";

// Export Function
export default function errorMGS(mgs: Message, err_mgs: string): void {
  // New Embed
  const embed = new MessageEmbed()
    .setAuthor(bot_setting.author)
    .setColor(bot_setting.color)
    .setTitle(`Error during Excution`)
    .setDescription(err_mgs);
  // Send Embed
  mgs.channel.send(embed);
}
