// ========================================
// Command Help
// ========================================

// Import Discord Type
import { Message, MessageEmbed } from "discord.js";
// Import Sequelize
import { Sequelize } from "sequelize";
// Import Table Interface
import tables from "../../../db/table_interface";
// Import Config
import { bot_setting } from "../../../config.json";
// Import Check Permission
import checkPermission from "../../../Utils/checkPermission";

// Export Command
export default async function (
  mgs: Message,
  db_objct: { tables: tables; sequelize: Sequelize },
  args: string[]
) {
  // Embed
  const embed = new MessageEmbed()
    .setAuthor(bot_setting.author)
    .setColor(bot_setting.color)
    .addField(
      "------------------------------------------------------",
      "Comandi Utenti"
    )
    .addField("Comando: Visualizza Nomi Personalizzati Nave", ">s listname")
    .setDescription(`Ecco la lista dei comandi`)
    .addField(
      "------------------------------------------------------",
      "Comandi PL"
    )
    .addField(
      "Comando: Aggiungi Nome Personalizzato",
      ">s addname `nome_personalizzato`"
    )
    .addField(
      "Comando: Elimina Nome Personalizzato",
      ">s cancname `nome_personalizzato`"
    );
  if (checkPermission(mgs.author.id))
    embed
      .addField(
        "------------------------------------------------------",
        "Comandi Admin"
      )
      .addField("Comando: Crea Nave", ">s create @TagCiurma")
      .addField("Comando: Cancella Nave", ">s delete @TagCiurma")
      .addField("Comando: Lista Navi", ">s list")
      .addField(
        "Comando: Visualizza Nomi Personalizzati Navi",
        ">s listname @TagCiurma"
      )
      .addField("Comando: Visualizza Nomi Personalizzati Nave", ">s listname")
      .addField(
        "Comando: Aggiungi Nome Personalizzato",
        ">s addname `nome_personalizzato` @TagCiurma"
      )
      .addField(
        "Comando: Elimina Nome Personalizzato",
        ">s cancname `nome_personalizzato` @TagCiurma"
      ).addField(
        "Comando: Aggiungi Spazio al Canale",
        ">s addspace `numero` @TagCiurma"
      );
  // Send embed
  mgs.channel.send(embed);
}
