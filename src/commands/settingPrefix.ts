import Discord from 'discord.js';
import { getPrefix, setPrefix } from '@utils/prefix';

export const settingPrefix = (client: Discord.Client<boolean>): void => {
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
          `^(${globalPrefix}P|${globalPrefix}${globalPrefix}prefix)`
        );
        if (command.test(message.content)) {
          if (
            message.content.replace(command, '').replace(/^ /, '').length === 0
          ) {
            await message.channel.send(
              `✅ **The current prefix is \`${globalPrefix.replace(
                /\\/,
                ''
              )}\`**`
            );
          } else {
            const newPrefix: string = message.content
              .replace(command, '')
              .replace(/^ /, '');
            if (dbPrefix.length === 0) {
              await setPrefix({ guildId: message.guildId, prefix: newPrefix });
              await message.channel.send(
                `✅ **Prefix set to \`${newPrefix}\`**`
              );
            } else {
              await setPrefix({ guildId: message.guildId, prefix: newPrefix });
              await message.channel.send(
                `✅ **Prefix set to \`${newPrefix}\`**`
              );
            }
          }
        }
      } catch (e: unknown) {
        throw new Error((e as Error).message);
      }
    }
  );
};

export default settingPrefix;
