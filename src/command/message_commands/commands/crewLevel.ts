// ========================================
// Crew Level UP
// ========================================

// Imports
import { Message, MessageEmbed, Role } from "discord.js";
import { Sequelize } from "sequelize";
import tables from "../../../db/table_interface";
import * as config from "../../../config.json";

// Interface

interface data {
  msg: Message;
  db_obj: {
    tables: tables;
    sequelize: Sequelize;
  };
  crewID: Role | undefined;
}

// function

const sendMessage = (mgs: Message, text: string) => {
  const embed = new MessageEmbed()
    .setDescription(text)
    .setColor(config.bot_setting.color)
    .setAuthor(config.bot_setting.author);
  return mgs.channel.send(embed);
};

const nextLevel = async (data: data) => {
  try {
    const result = await data.db_obj.tables.crews_table.findOne({
      where: { crewId: data.crewID!.id },
    });
    const crewData = result?.get();
    data.db_obj.tables.crews_table.update(
      {
        livellociurma: config.crewLevels[crewData!.livellociurma].crewLevel,
        membrimax: config.crewLevels[crewData!.livellociurma].maxMember,
        membrimin: config.crewLevels[crewData!.livellociurma].minMember,
      },
      {
        where: { crewId: crewData!.crewId },
      }
    );
    const text = [
      `La ciurma: <@&${crewData?.crewId}> è stata aggiornta al livello successivo!`,
      `Livello ciurma: ${crewData?.livellociurma} ---> ${
        config.crewLevels[crewData!.livellociurma].crewLevel
      }`,
      `Membri massimi: ${crewData?.membrimax} ---> ${
        config.crewLevels[crewData!.livellociurma].maxMember
      }`,
      `Membri minimi: ${crewData?.membrimin} ---> ${
        config.crewLevels[crewData!.livellociurma].minMember
      }`,
    ].join("\n");
    return sendMessage(data.msg, text);
  } catch (err) {
    const text = [
      `Errore durante l'upgrade della ciurma: <@&${data.crewID}>`,
    ].join("\n");
    return sendMessage(data.msg, text);
  }
};

const checkCrew = (data: data) =>
  typeof data.crewID !== undefined
    ? nextLevel(data)
    : sendMessage(data.msg, "La ciurma mezionata non esiste!");

// export
export default async function crewLevelUP(
  mgs: Message,
  db_objct: { tables: tables; sequelize: Sequelize },
  args: string[]
) {
  const data: data = {
    msg: mgs,
    db_obj: db_objct,
    crewID: mgs.mentions.roles.first(),
  };
  checkCrew(data);
}
