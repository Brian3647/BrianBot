import { Command } from '../core/types';
import { PermissionString, User } from 'discord.js';
import config from '../config';
import { ErrorEmbed, OkEmbed } from '../lib/embeds';
import { expectPermission } from '../lib/permissions';

const command: Command = {
	name: 'ban',
	description: 'Banea al usuario especificado',
	usage: 'ban <@user> <razón>',
	execute(_, message, args) {
		expectPermission(message, ['BAN_USERS' as PermissionString]);

		if (args.length < 2)
			return message.reply({
				embeds: [
					ErrorEmbed(
						'Falta de argumentos.\n\nUso: ' +
							config.prefix +
							'ban <@user> <razón>',
						message.author
					)
				]
			});

		const user = message.mentions.users.first();
		if (user?.bot) message.reply('No puedo banear bots');

		const member = message.guild?.members.cache.get((user as User).id);

		if (typeof user === 'undefined' || typeof member === 'undefined')
			return message.reply({
				embeds: [
					ErrorEmbed(
						'Uso: ' + config.prefix + 'ban <@user> <reason>',
						message.author
					)
				]
			});

		if (!member?.bannable) {
			return message.reply({
				embeds: [ErrorEmbed('No puedo banear al miembro.', message.author)]
			});
		}

		try {
			member.ban({ reason: args.slice(1).join(' ') });
		} catch (e) {
			return message.reply({
				embeds: [
					ErrorEmbed(
						'Error al banear al usuario: \n```\n' + e + '\n```',
						message.author
					)
				]
			});
		}

		const ok = OkEmbed(message.author)
			.setTitle('Usuario baneado con exito.')
			.setDescription('Razón: ' + args.slice(1).join(' '));

		message.reply({ embeds: [ok] });
	},
	alias: ['alv-baniao']
};

export default command;
