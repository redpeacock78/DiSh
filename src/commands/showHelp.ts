import Discord from 'discord.js';
import { getPrefix } from '@utils/prefix';

/**
 * botの使い方についてのメッセージを送信する
 * Command: -h, --help
 * @param {Discord.Client<boolean>} client
 * @return {void}
 */
export const showHelp = (client: Discord.Client<boolean>): void => {
  client.on(
    'messageCreate',
    async (message: Discord.Message<boolean>): Promise<void> => {
      if (message.author.bot) return;
      try {
        const dbPrefix: string = await getPrefix(message.guildId);
        const globalPrefix: string =
          dbPrefix.length !== 0
            ? dbPrefix.replace(/[\\^$.*+?()[\]{}|]/g, '\\$&')
            : '-';
        const command = new RegExp(
          `^(${globalPrefix}h|${globalPrefix}${globalPrefix}help)$`
        );
        if (command.test(message.content)) {
          const previewPrefix: string = globalPrefix
            .replace(/\\/, '')
            .replace(/\\/, '');
          const text = `Here are The commands for the bot.\nCommands are called with a prefix unless specified otherwise.`;
          const embed = {
            content: text,
            embeds: [
              {
                title: 'Usage:',
                fields: [
                  {
                    name: `@${client.user.username} {{ShellGei}}`,
                    value: `> Executes \`ShellGei\` that was mentions.\n> You can also attach images, but the number is limited to four.\n> \`\`\`bash\n> # Example of mention usage:\n> @${client.user.username} echo hello\n> \`\`\``,
                  },
                  {
                    name: `${globalPrefix}s {{ShellGei}}, ${globalPrefix}${globalPrefix}shell {{ShellGei}}`,
                    value: `> Almost the same as above, but this one can be executed by command.\n> You can also attach images, but the number is limited to four.\n> \`\`\`bash\n> # Example use of the command:\n> ${previewPrefix}${previewPrefix}shell echo hello\n> \`\`\``,
                  },
                  {
                    name: `${globalPrefix}p, ${globalPrefix}${globalPrefix}ping`,
                    value: `> Test websh server and bot status.\n> \`\`\`bash\n> # Example use of the command:\n> ${previewPrefix}${previewPrefix}ping\n> \`\`\``,
                  },
                  {
                    name: `${globalPrefix}P, ${globalPrefix}${globalPrefix}prefix`,
                    value: `> Display current prefix and change prefix.\n> \`\`\`bash\n> # Example use of the command:\n> ${previewPrefix}${previewPrefix}prefix\n> ${previewPrefix}${previewPrefix}prefix $\n> \`\`\``,
                  },
                  {
                    name: `${globalPrefix}v, ${globalPrefix}${globalPrefix}version`,
                    value: `> Display version.\n> \`\`\`bash\n> # Example use of the command:\n> ${previewPrefix}${previewPrefix}version\n> \`\`\``,
                  },
                  {
                    name: `${globalPrefix}h, ${globalPrefix}${globalPrefix}help`,
                    value: `> Display help for bot.\n> \`\`\`bash\n> # Example use of the command:\n> ${previewPrefix}${previewPrefix}help\n> \`\`\``,
                  },
                ],
              },
            ],
          };
          await message.channel.send(embed);
        }
      } catch (e: unknown) {
        throw new Error((e as Error).message);
      }
    }
  );
};
