import { Command } from '../core/types';
import { OkEmbed } from '../lib/embeds';

const command: Command = {
	name: 'ping',
	description: 'Devuelve la latencia del bot',
	execute({ ws }, { author, reply }) {
		const embed = OkEmbed(author).setTitle('Ping: ' + ws.ping);

		reply({ embeds: [embed] });
	},
	alias: ['p']
};

export default command;
