import { Command } from 'core/types';

const command: Command = {
	name: 'echo',
	description: 'Responde con los argumentos especificados',
	async execute(_, message, rargs) {
		const args = rargs.join(' ');
		if (!args.includes('@everyone') && !args.includes('@here'))
			message.reply(args);
		else
			message.reply(
				'El mensaje a decir no puede contener menciones a everyone o here'
			);
	},
	usage: 'echo <args>',
	alias: ['say']
};

export default command;
