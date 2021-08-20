import fs from 'fs';
import { join } from 'path';
import { Command, Default, Event } from './types';
import { log } from './logger';
import handle_interaction from './handle_interaction';
import { Client, ClientEvents } from 'discord.js';

export async function start(
	client: Client,
	callback: (
		events: Event[],
		commands: Command[],
		client: Client
	) => void | Promise<void>,
	token: string | undefined
): Promise<void> {
	const commands: Command[] = await handle_interaction(
		client,
		fs.readdirSync(join(__dirname, '..', 'commands')),
		join(__dirname, '..', 'commands')
	);

	const events: Event[] = await load_events(
		client,
		join(__dirname, '..', 'events')
	);

	client.on('ready', async () => {
		await callback(events, commands, client);
	});

	await client.login(token);
}

export async function load_events(
	client: Client,
	p: string
): Promise<Array<Event>> {
	const dir: string[] = fs
		.readdirSync(p)
		.filter((file) => file.endsWith('.ts') || file.endsWith('.js'));
	const events: Array<Event> = [];

	dir.forEach(async (file: string): Promise<void> => {
		const cmd = (await import(join(p, file))) as Default<Event>;
		const event = cmd.default;

		events.push(cmd.default);
		client.on(event.name, async (...args): Promise<void> => {
			await event.execute(
				client,
				...(args as ClientEvents[keyof ClientEvents])
			);
		});
	});

	log('Loaded events');

	return events;
}
