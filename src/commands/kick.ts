import { Command } from '../core/types';
import { PermissionString, User } from 'discord.js';
import config from '../config';
import { ErrorEmbed, OkEmbed } from '../lib/embeds';
import { expectPermission } from '../lib/permissions';

const command: Command = {
	name: 'kick',
	description: 'Expulsa al usuario expecificado',
	usage: 'kick <@user> <razón>',
	execute(_, message, args) {
		expectPermission(message, ['kick_USERS' as PermissionString]);

		if (args.length < 2)
			return message.reply({
				embeds: [
					ErrorEmbed(
						'Falta de argumentos.\n\nUso: ' +
							config.prefix +
							'kick <@user> <razón>',
						message.author
					)
				]
			});

		const user = message.mentions.users.first();

		if (typeof user === 'undefined')
			return message.reply({
				embeds: [
					ErrorEmbed(
						'Uso: ' + config.prefix + 'kick <@user> <reason>',
						message.author
					)
				]
			});

		const member = message.guild?.members.cache.get((user as User).id);

		if (typeof member === 'undefined')
			return message.reply({
				embeds: [
					ErrorEmbed(
						'Uso: ' + config.prefix + 'kick <@user> <reason>',
						message.author
					)
				]
			});

		if (!member?.kickable) {
			return message.reply({
				embeds: [ErrorEmbed('No puedo kickear al miembro.', message.author)]
			});
		}

		try {
			member.kick(args.slice(1).join(' '));
		} catch (e) {
			return message.reply({
				embeds: [
					ErrorEmbed(
						'Error al kickear al usuario: \n```\n' + e + '\n```',
						message.author
					)
				]
			});
		}

		const ok = OkEmbed(message.author)
			.setTitle('Usuario kickeado con exito.')
			.setDescription('Razón: ' + args.slice(1).join(' '));

		message.reply({ embeds: [ok] });
	},
	alias: ['alv-kickiao']
};

export default command;
