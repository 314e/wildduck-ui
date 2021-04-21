/**
 * @author Chirag Kushwaha <chirag.kushwaha@314ecorp.com>
 * @description Authentication logic
 */

import { kea } from 'kea';

import { get } from 'app-ui/utils/logicUtils';

const authenticationLogic = kea({
	path: () => ['authentication'],

	defaults: {
		limit: 20,
		next: '',
		previous: '',
		page: 1,
	},

	actions: {
		setNext: (next: string) => ({ next }),
		setPrevious: (previous: string) => ({ previous }),
		setLimit: (limit: number) => ({ limit }),
		setPage: (page: number) => ({ page }),
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
	},
});

export default authenticationLogic;
