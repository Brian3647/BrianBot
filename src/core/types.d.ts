import { Client, Message, ClientEvents } from 'discord.js';

export interface Command<R = unknown> {
	name: string;
	description: string;
	execute: (
		client: Client,
		message: Message,
		args: Array<string>
	) => Promise<R> | R;
	alias: string[];
	usage?: string;
}

export interface Event<K extends keyof ClientEvents = keyof ClientEvents> {
	name: K;
	execute: (client: Client, ...args: ClientEvents[K]) => Promise<void> | void;
}

interface Default<T> {
	default: T;
}
