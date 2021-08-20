import { Collection, Message } from 'discord.js';
import { BaseEmbed } from '../lib/embeds';
import config from '../config';
import { Command } from './types';
type Cmds = Collection<string, Command<unknown>>;

export default (message: Message, cmds: Cmds): void => {
	let res = '';

	const fmt = (command: Command): string => {
		return `
\`${config.prefix}${command.usage || command.name}\`\n${command.description}
`.trimStart();
	};

	cmds.forEach((val) => (res += fmt(val) + '\n'));

	res += `\`${config.prefix}help\`\nMuestra este mensaje`;

	message.reply({
		embeds: [
			BaseEmbed(message.author)
				.setColor('#66ffcc')
				.setTitle('Comandos')
				.setDescription(res)
		]
	});
};
