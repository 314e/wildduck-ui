/**
 * @author Aditya Negi <aditya.negi@314ecorp.com>
 * @description filters logic
 */

import { kea } from 'kea';

import { get } from 'app-ui/utils/logicUtils';

const filtersLogic = kea({
	path: () => ['filters'],
	defaults: {
		showAddFilterForm: false,
		filterId: '',
	},
	actions: {
		setShowAddFilterForm: (buttonStatus: boolean) => ({ buttonStatus }),
		setFilterId: (filterId: string) => ({ filterId }),
	},
	reducers: {
		showAddFilterForm: {
			setShowAddFilterForm: get<boolean>('buttonStatus'),
		},
		filterId: {
			setFilterId: get<string>('filterId'),
		},
	},
});

export default filtersLogic;
