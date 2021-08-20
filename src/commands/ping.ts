import { Command } from '../core/types';
import { OkEmbed } from '../lib/embeds';

const command: Command = {
	name: 'ping',
	description: 'Devuelve la latencia del bot',
	execute(client, message) {
		const embed = OkEmbed(message.author).setTitle('Ping: ' + client.ws.ping);

		message.reply({ embeds: [embed] });
	},
	alias: ['p']
};

export default command;
