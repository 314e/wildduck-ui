/**
 * @author Chirag Kushwaha <chirag.kushwaha@314ecorp.com>
 * @description address logic
 */

import { kea } from 'kea';

import { get } from 'app-ui/utils/logicUtils';

const addressLogic = kea({
	path: () => ['address'],
	defaults: {
		updatableField: false,

		query: '',

		addressId: '',

		addressInformationToggle: false,
		creatNewAddressToggle: false,
		renameDomainToggle: true,
	},
	actions: {
		setQuery: (query: string) => ({ query }),

		setAddressId: (addressId: string) => ({ addressId }),

		setAddressInformationToggle: (addressInformationToggle: boolean) => ({ addressInformationToggle }),
		setCreatNewAddressToggle: (creatNewAddressToggle: boolean) => ({ creatNewAddressToggle }),
		setRenameDomainToggle: (renameDomainToggle: boolean) => ({ renameDomainToggle }),
	},
	reducers: {
		query: {
			setQuery: get<string>('query'),
		},

		addressId: {
			setAddressId: get<string>('addressId'),
		},

		renameDomainToggle: {
			setRenameDomainToggle: get<boolean>('renameDomainToggle'),
		},
		addressInformationToggle: {
			setAddressInformationToggle: get<boolean>('addressInformationToggle'),
		},
		creatNewAddressToggle: {
			setCreatNewAddressToggle: get<boolean>('creatNewAddressToggle'),
		},
	},
});

export default addressLogic;
