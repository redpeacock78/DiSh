import Discord from 'discord.js';
import { websh, discordMedia } from '@api';
import createMessageObject from '@utils/createMessageObject';
import { getPrefix } from '@utils/prefix';

/**
 * 受け取ったシェル芸を実行して結果をリプライする
 * Command: -s {{ShellGei}}, --shell {{ShellGei}}
 * @param {Discord.Client<boolean>} client
 * @return {void}
 */
export const replyShellGeiResult = (client: Discord.Client<boolean>): void => {
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
          `^(${globalPrefix}s|${globalPrefix}${globalPrefix}shell)( *|\n)`
        );
        if (command.test(message.content)) {
          const images: string[] = await discordMedia.imageToBase64(
            message.attachments
              .filter((i: Discord.Attachment): boolean =>
                i.contentType.match(/^image/) ? true : false
              )
              .map((i: Discord.Attachment): string => i.attachment as string)
          );
          const code = message.content.replace(command, '');
          const postData = {
            code: code,
            images: images,
          };
          await websh
            .post(postData)
            .then(async (result: websh.postResultObject): Promise<void> => {
              const messageObject: Discord.ReplyMessageOptions =
                createMessageObject(result);
              if (
                (messageObject.embeds[0] as Discord.APIEmbed)?.fields.length ||
                (messageObject.embeds[0] as Discord.APIEmbed)?.image
              )
                await message.reply(messageObject);
            })
            .catch((): never => {
              throw new Error('Failed to communicate with websh.');
            });
        }
      } catch (e: unknown) {
        console.error((e as Error).message);
        await message.reply({
          content: '❌ Failed!',
          embeds: [
            {
              description: `> ${(e as Error).message}`,
            },
          ],
        });
      }
    }
  );
};
