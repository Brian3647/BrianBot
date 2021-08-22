import chalk from 'chalk';

export const fmt_number = (length: number, rnum: number): string => {
	return '0'.repeat(length - rnum.toString().length) + rnum.toString();
};

export const date_fmt = (): string => {
	const date = new Date();
	const minutes = fmt_number(2, date.getMinutes());
	const seconds = fmt_number(2, date.getSeconds());
	const hours = fmt_number(2, date.getHours());

	return `[${hours}:${minutes}:${seconds}]`;
};

export const log = (...args: unknown[]): void => {
	console.log(`${date_fmt()} ${chalk.blueBright('log')}`, ...args);
};

export const error = (...args: unknown[]): void => {
	console.error(`${date_fmt()} ${chalk.redBright('error')}`, ...args);
};
