/**
 * @author Aditya Negi <aditya.negi@314ecorp.com>
 * @description Domain access logic
 */

import { kea } from 'kea';

import { get } from 'app-ui/utils/logicUtils';
import { GetAllowedDomainResult } from 'app-redux/client/wildduck-api';

const domainAccessLogic = kea({
	path: () => ['domain-access'],
	defaults: {
		allowedList: [],
		blockedList: [],
		dataSource: [],
		tag: '',
		addDomainModalVisiblity: false,
	},
	actions: {
		setAllowedList: (list: Array<GetAllowedDomainResult>) => ({ list }),
		setBlockedList: (list: Array<GetAllowedDomainResult>) => ({ list }),
		getAllowedList: (tags: string) => ({ tags }),
		getBlockedList: (tags: string) => ({ tags }),
		setDataSource: (list: GetAllowedDomainResult) => ({
			list,
		}),
		setTag: (tag: string) => ({ tag }),
		setAddDomainModalVisiblity: (status: boolean) => ({ status }),
	},
	reducers: {
		allowedList: {
			setAllowedList: get<Array<GetAllowedDomainResult>>('list'),
		},
		blockedList: {
			setBlockedList: get<Array<GetAllowedDomainResult>>('list'),
		},
		dataSource: {
			setDataSource: get<Array<GetAllowedDomainResult>>('list'),
		},
		tag: {
			setTag: get<string>('tag'),
		},
		addDomainModalVisiblity: {
			setAddDomainModalVisiblity: get<boolean>('status'),
		},
	},
});

export default domainAccessLogic;
