import Discord from 'discord.js';
import figlet from 'figlet';
import { getPrefix } from '@utils/prefix';
import pacageJson from '../../package.json';

/**
 * botのバージョンなどについてのメッセージを送信する
 * Command: -v, --version
 * @param {Discord.Client<boolean>} client
 * @return {void}
 */
export const showVersion = (client: Discord.Client<boolean>): void => {
  client.on(
    'messageCreate',
    async (message: Discord.Message<boolean>): Promise<void> => {
      if (message.author.bot) return;
      try {
        const dbPrefix: string = await getPrefix(message.guildId).catch(
          (): never => {
            throw new Error('Failed to connection DB.');
          }
        );
        const globalPrefix: string =
          dbPrefix.length !== 0
            ? dbPrefix.replace(/[\\^$.*+?()[\]{}|]/g, '\\$&')
            : '-';
        const command = new RegExp(
          `^(${globalPrefix}v|${globalPrefix}${globalPrefix}version)$`
        );
        if (command.test(message.content)) {
          const versionText: string =
            `${figlet.textSync(`${pacageJson.name}`, {
              font: 'Slant',
            })}\n` +
            `websh Bot for Discord (${pacageJson.name}) version ${pacageJson.version}\n` +
            `Copyright (c) 2022 ${pacageJson.author}\n` +
            `Released under the ${pacageJson.license} License.\n` +
            `${pacageJson.repository}`;
          await message.channel.send({
            embeds: [
              {
                fields: [
                  {
                    name: 'Version:',
                    value: `\`\`\`\n${versionText}\`\`\``,
                  },
                ],
              },
            ],
          });
        }
      } catch (e: unknown) {
        throw new Error((e as Error).message);
      }
    }
  );
};

export default showVersion;
