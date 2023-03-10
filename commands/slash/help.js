const SlashCommand = require("../../lib/SlashCommand");
const { MessageEmbed } = require("discord.js");
const LoadCommands = require("../../util/loadCommands");

const command = new SlashCommand()
  .setName("help")
  .setDescription("Shows help commands")
  .setRun(async (client, interaction) => {
    // map the commands name and description to the embed
    const commands = await LoadCommands().then((cmds) => {
      return [].concat(cmds.slash).concat(cmds.context);
    });
    // from commands remove the ones that hae no description
    const filteredCommands = commands.filter((cmd) => cmd.description);

    // create the embed
    const helpEmbed = new MessageEmbed()
      .setAuthor({
        name: `Commands of ${client.user.username}`,
        iconURL: client.config.iconURL,
        url: client.config.website,
      })
      .setColor(client.config.embedColor)
      .setDescription(
        filteredCommands
          .map((cmd) => {
            return `\`/${cmd.name}\` - ${cmd.description}`;
          })
          .join("\n") +
          "\n\n" +
          `Discord Music Bot Version: v${
            require("../../package.json").version
          }` +
          "\n" +
          `[✨ Support Server](${ client.config.supportServer }) | [Issues](${ client.config.Issues }) | [Source](https://github.com/SudhanPlayz/Discord-MusicBot/tree/v5) | [Invite Me](https://discord.com/oauth2/authorize?client_id=${ client.config.clientId }&permissions=${ client.config.permissions }&scope=bot%20applications.commands)`
      );
    // Do not change the Source code link.
    return interaction.reply({ embeds: [helpEmbed], ephemeral: true });
  });

module.exports = command;