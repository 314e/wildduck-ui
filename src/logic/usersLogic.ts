/**
 * @author Aditya Negi <aditya.negi@314ecorp.com>
 * @description Users logic
 */

import { kea } from 'kea';

import { get } from 'app-ui/utils/logicUtils';

const usersLogic = kea({
	path: () => ['users'],
	defaults: {
		next: '',
		previous: '',
		limit: 20,
		page: 1,

		searchParams: {},

		userDetails: {},
		password: '',
		showResetPasswordModal: false,
	},
	actions: {
		setPassword: (password: string) => ({ password }),
		setShowResetPasswordModal: (status: boolean) => ({ status }),

		setSearchParams: (searchParams: string) => ({ searchParams }),

		setNext: (next: string) => ({ next }),
		setPrevious: (previous: string) => ({ previous }),
		setLimit: (limit: number) => ({ limit }),
		setPage: (page: number) => ({ page }),
	},
	reducers: {
		searchParams: {
			setSearchParams: get<string>('searchParams'),
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
		page: {
			setPage: get<number>('page'),
		},

		password: {
			setPassword: get<string>('password'),
		},
		showResetPasswordModal: {
			setShowResetPasswordModal: get<boolean>('status'),
		},
	},
});

export default usersLogic;
