/**
 * @author Chirag Kushwaha <chirag.kushwaha@314ecorp.com>
 * @description domain aliases logic
 */

import { kea } from 'kea';

import { get } from 'app-ui/utils/logicUtils';

const domainAliasesLogic = kea({
	path: () => ['domainAliases'],
	defaults: {
		query: '',

		limit: 20,
		next: '',
		previous: '',
		page: 1,
	},

	actions: {
		setQuery: (query: string) => ({ query }),

		setNext: (next: string) => ({ next }),
		setPrevious: (previous: string) => ({ previous }),
		setLimit: (limit: number) => ({ limit }),
		setPage: (page: number) => ({ page }),
	},

	reducers: {
		query: {
			setQuery: get<string>('query'),
		},

		page: {
			setPage: get<number>('page'),
		},
		dir: {
			setDir: get<string>('dir'),
		},
		next: {
			setNext: get<string>('next'),
		},
		previous: {
			setPrevious: get<string>('previous'),
		},
		limit: {
			setLimit: get<number>('limit'),
		},
	},
});

export default domainAliasesLogic;
