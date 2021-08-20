import config from '../config';
import { MessageEmbed, User } from 'discord.js';

export const ErrorEmbed = (msg: string, author: User): MessageEmbed => {
	return BaseEmbed(author)
		.setTitle('Error')
		.setDescription(msg)
		.setColor(config.error_color);
};

export const OkEmbed = (author: User): MessageEmbed => {
	return BaseEmbed(author).setColor(config.error_color);
};

export const BaseEmbed = (author: User): MessageEmbed => {
	return new MessageEmbed()
		.setFooter('Comando pedido por ' + author.tag, author.displayAvatarURL())
		.setTimestamp(Date.now());
};
