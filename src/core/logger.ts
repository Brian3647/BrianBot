import chalk from 'chalk';

export const log = <T>(...args: T[]): void => {
	const date = new Date();
	const minutes = date.getMinutes();
	const seconds = date.getSeconds();
	const hours = date.getHours();

	console.log(
		`[${chalk.blueBright('LOG')}] [${hours}:${minutes}:${seconds}]`,
		...args
	);
};

export const error = <T>(...args: T[]): void => {
	const date = new Date();
	const minutes = date.getMinutes();
	const seconds = date.getSeconds();
	const hours = date.getHours();

	console.log(
		`[${chalk.redBright('ERROR')}] [${hours}:${minutes}:${seconds}]`,
		...args
	);
};
