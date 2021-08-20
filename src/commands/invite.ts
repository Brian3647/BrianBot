import config from '../config';
import { Command } from '../core/types';

const command: Command = {
	name: 'invite',
	description: 'Devuelve la invitación al server',
	execute(_, message) {
		message.reply(config.server_invite);
	},
	alias: ['invitacion', 'invitación']
};

export default command;
