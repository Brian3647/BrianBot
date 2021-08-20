import { Client } from 'discord.js';
import { start } from './core/bot';
import { log } from './core/logger';
import client_options from './core/config';
import chalk from 'chalk';
import dotenv from 'dotenv';

dotenv.config();

log('Starting bot...');
const started_time = new Date().getTime();
const client = new Client(client_options.client);
log('Bot created');

start(
	client,
	(events, commands) => {
		const done_time = new Date().getTime() - started_time;

		const separation = 2;
		const _ =
			'-'.repeat((client.user?.username.length as number) + 8 + separation) +
			'-';
		const spaces = ' '.repeat(separation);

		log(_);
		log(`${spaces}${client.user?.username} ${chalk.green('ready')}!`);
		log(_);

		log(`${events.length} event(s), ${commands.length} command(s)`);
		log(`Bot started in ${done_time}ms`);
	},
	process.env.TOKEN
);

process.on('beforeExit', client.destroy);
