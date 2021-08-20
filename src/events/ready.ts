import { Event } from '../core/types';
import { log } from '../core/logger';

const event: Event = {
	name: 'ready',
	execute: () => {
		log('Bot connected to discord');
	}
};

export default event;
