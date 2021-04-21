/**
 * @author Chirag Kushwaha <chirag.kushwaha@314ecorp.com>
 * @description archive logic
 */

import { kea } from 'kea';

import { get } from 'app-ui/utils/logicUtils';

const archiveLogic = kea({
	path: () => ['archive'],
	defaults: {
		page: 1,
		limit: 20,
		next: '',
		previous: '',

		dateData: [],
		isModalVisible: false,
	},
	actions: {
		setNext: (next: string) => ({ next }),
		setPrevious: (previous: string) => ({ previous }),
		setLimit: (limit: number) => ({ limit }),
		setPage: (page: number) => ({ page }),

		setDateData: (dateData: Array<any>) => ({ dateData }),
		setIsModalVisible: (isModalVisible: boolean) => ({ isModalVisible }),
	},
	reducers: {
		page: {
			setPage: get<number>('page'),
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

		dateData: {
			setDateData: get<Array<any>>('dateData'),
		},
		isModalVisible: {
			setIsModalVisible: get<boolean>('isModalVisible'),
		},
	},
});

export default archiveLogic;
