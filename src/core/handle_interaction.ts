import { join } from 'path';
import { error, log } from './logger';
import { Default, Command } from './types';
import config from '../config';
import { Client, Collection, MessageEmbed as Embed } from 'discord.js';
import showhelp from './help';

export default async (
	client: Client,
	command_files: string[],
	path: string
): Promise<Array<Command>> => {
	const commands = new Collection<string, Command>();
	const command_arr: Array<Command> = [];

	for (let i = 0; i < command_files.length; i++) {
		const cmd_path: string = join(path, command_files[i]);
		const cmd: Default<Command> = (await import(cmd_path)) as Default<Command>;
		if (cmd.default) {
			commands.set(cmd.default.name.toLowerCase(), cmd.default);
			command_arr.push({
				...cmd.default,
				alias: cmd.default.alias?.map((c) => c.toLowerCase()),
				name: cmd.default.name?.toLowerCase()
			});

			log('Command added: ' + cmd.default.name);
		}
	}

	client.on('messageCreate', async (message) => {
		const args = message.content.split(/\s+/);
		const command = args[0].slice(config.prefix.length);
		args.shift();

		if (['ayuda', 'help'].includes(command)) showhelp(message, commands);

		if (!commands.has(command)) return;
		const cmd =
			commands.get(command) || commands.find((c) => c.alias.includes(command));

		if (typeof cmd === 'undefined') return;

		log(`Requested command '${cmd.name}' by ${message.author.tag}`);

		try {
			await cmd.execute(client, message, args);
		} catch (e) {
			const error_embed = new Embed()
				.setTitle(
					'There was an error while running the requested command ' + cmd.name
				)
				.setDescription(
					`\`\`\`\n${e}\n\`\`\`\n\nPlease contact me: ${
						config.author(client).tag
					}`
				)
				.setFooter(
					'Comando pedido por ' +
						message.author.tag +
						' (' +
						message.author.id +
						')',
					message.author.displayAvatarURL()
				)
				.setColor(config.error_color);

			error(`Error while running '${cmd.name}': ${e}`);
			error(e.stack);

			message.reply({ embeds: [error_embed] });
		}
	});

	log('Loaded commands');

	return command_arr;
};
