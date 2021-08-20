import { Client, Snowflake, User } from 'discord.js';

type HexColorString = `#${string}`;

export interface Config {
	primary_color: HexColorString;
	error_color: HexColorString;
	done_color: HexColorString;
	server: Snowflake;
	author: (client: Client) => User;
	prefix: string;
	server_invite: string;
}

const config: Config = {
	primary_color: '#36e38d',
	error_color: '#e33644',
	done_color: '#00ed04',
	server: '877258238549180426' as Snowflake,
	author: (client: Client) =>
		client.users.cache.get('594767454765449227') as User,
	prefix: 'd?',
	server_invite: 'https://discord.gg/euXbZEKztY'
};

export default config;
