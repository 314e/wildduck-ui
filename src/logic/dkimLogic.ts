/**
 * @author Aditya Negi <aditya.negi@314ecorp.com>
 * @description Dkim logic
 */

import { kea } from 'kea';

import { get } from 'app-ui/utils/logicUtils';

const dkimLogic = kea({
	path: () => ['dkim'],
	defaults: {
		next: '',
		previous: '',
		limit: 20,
		page: 1,

		query: '',
	},
	actions: {
		setLimit: (limit: number) => ({ limit }),
		setNext: (next: string) => ({ next }),
		setPrevious: (previous: string) => ({ previous }),
		setPage: (page: number) => ({ page }),

		setQuery: (query: string) => ({ query }),
	},
	reducers: {
		next: {
			setNext: get<string>('next'),
		},
		previous: {
			setPrevious: get<string>('previous'),
		},
		limit: {
			setLimit: get<number>('limit'),
		},
		page: {
			setPage: get<number>('page'),
		},

		query: {
			setQuery: get<string>('query'),
		},
	},
});

export default dkimLogic;
