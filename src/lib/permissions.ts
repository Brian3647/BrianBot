import { Message, PermissionResolvable } from 'discord.js';
import { ErrorEmbed } from './embeds';

export const expectPermission = (
	msg: Message,
	permissions: Array<PermissionResolvable>,
	errMessage = 'Permisos insuficientes'
): void => {
	const user = msg.member;

	if (!user?.permissions.has(permissions)) {
		msg.reply({ embeds: [ErrorEmbed(errMessage, msg.author)] });
	}
};
