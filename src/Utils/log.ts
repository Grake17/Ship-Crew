// ========================================
// Log Function
// ========================================

// Import Discord Type
import { Message, MessageEmbed, TextChannel } from "discord.js";
// Import Config
import { log_channel, bot_setting } from "../config.json";

export default async function log(mgs: Message) {
  // Check MGS
  if(mgs.guild == null) return;
  // Get Log Channel
  const channel = mgs.guild.channels.cache.get(log_channel) as TextChannel;
  // MGS Content
  const content = [
    `L'utente <@!${mgs.author.id}> ha fatto un comando.`,
    `◾️ Link messaggio: **${mgs.url}**`,
    `◾️ Contenuto Messaggio: **${mgs.content}**`,
  ].join("\n");
  // New Embed
  const embed = new MessageEmbed()
    .setAuthor(bot_setting.author)
    .setColor(bot_setting.color)
    .setTitle("Command Log")
    .setDescription(content);
  // Send Log
  channel.send(embed);
}
