import { Client, Message, ClientEvents } from 'discord.js';

export interface Command<ReturnType = unknown> {
	name: string;
	description: string;
	execute: (
		client: Client,
		message: Message,
		args: Array<string>
	) => Promise<ReturnType> | ReturnType;
	alias: string[];
	usage?: string;
}

export interface Event<K extends keyof ClientEvents = keyof ClientEvents> {
	name: K;
	execute: (client: Client, ...args: ClientEvents[K]) => Promise<void> | void;
}

export interface ILogger {
	(...args: unknown[]): void;
}

interface Default<T> {
	default: T;
}
