import 'dotenv/config';
import Discord from 'discord.js';
import * as actions from '@actions';
import * as commands from '@commands';

const client: Discord.Client<boolean> = new Discord.Client({
  intents: [
    Discord.GatewayIntentBits.Guilds,
    Discord.GatewayIntentBits.GuildBans,
    Discord.GatewayIntentBits.GuildMessages,
    Discord.GatewayIntentBits.DirectMessages,
    Discord.GatewayIntentBits.MessageContent,
  ],
  partials: [Discord.Partials.Channel],
});

commands.showHelp(client);
commands.showStatus(client);
commands.showVersion(client);
commands.settingPrefix(client);
commands.replyShellGeiResult(client);
actions.replyShellGeiResult(client);

void client
  .login(process.env.DISCORD_BOT_TOKEN)
  .then((): void => console.log('login!'));
