import Discord from 'discord.js';
import { websh } from '@api';
import { getPrefix } from '@utils/prefix';

/**
 * webshのステータスの状況についてのメッセージを送信する
 * Command: -p, --ping
 * @param {Discord.Client<boolean>} client
 * @return {void}
 */
export const showStatus = (client: Discord.Client<boolean>): void => {
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
          `^(${globalPrefix}p|${globalPrefix}${globalPrefix}ping)$`
        );
        if (command.test(message.content)) {
          await websh
            .get()
            .then(async (i: websh.getResultObject): Promise<void> => {
              if (i.status === 'ok') {
                await message.channel.send({
                  embeds: [
                    {
                      fields: [
                        {
                          name: 'Status:',
                          value: '✅ Success!',
                        },
                        {
                          name: 'Results:',
                          value: `\`\`\`\nwebsh: ${i.responseTime}ms, Discord: ${client.ws.ping}ms\n\`\`\``,
                        },
                      ],
                    },
                  ],
                });
              } else {
                throw new Error();
              }
            })
            .catch(async (e: unknown): Promise<void> => {
              console.error((e as Error).message);
              await message.reply({
                embeds: [
                  {
                    fields: [
                      {
                        name: 'Status:',
                        value: '❌ Failed!',
                      },
                    ],
                  },
                ],
              });
            });
        }
      } catch (e: unknown) {
        throw new Error((e as Error).message);
      }
    }
  );
};
