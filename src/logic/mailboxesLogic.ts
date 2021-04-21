/**
 * @author Chirag Kushwaha <chirag.kushwaha@314ecorp.com>
 * @description domain aliases logic
 */

import { kea } from 'kea';

import { get } from 'app-ui/utils/logicUtils';
import { UpdateMailboxRequest } from 'client/wildduck-api';

const mailboxesLogic = kea({
	path: () => ['mailboxes'],
	defaults: {
		mailboxId: '',

		selectedMailboxData: {},

		updateMailboxToggle: false,
		showMailboxMessagesTable: false,

		specialUse: false,

		mailboxName: '',
	},
	actions: {
		setMailboxId: (mailboxId: boolean) => ({ mailboxId }),

		setSelectedMailboxData: (selectedMailboxData: UpdateMailboxRequest) => ({ selectedMailboxData }),

		setUpdateMailboxToggle: (updateMailboxToggle: boolean) => ({ updateMailboxToggle }),
		setShowMailboxMessagesTable: (showMailboxMessagesTable: boolean) => ({ showMailboxMessagesTable }),

		setSpecialUse: (specialUse: boolean) => ({ specialUse }),

		setMailboxName: (mailboxName: string) => ({ mailboxName }),
	},
	reducers: {
		specialUse: {
			setSpecialUse: get<boolean>('specialUse'),
		},

		mailboxName: {
			setMailboxName: get<string>('mailboxName'),
		},

		updateMailboxToggle: {
			setUpdateMailboxToggle: get<boolean>('updateMailboxToggle'),
		},
		showMailboxMessagesTable: {
			setShowMailboxMessagesTable: get<boolean>('showMailboxMessagesTable'),
		},

		mailboxId: {
			setMailboxId: get<string>('mailboxId'),
		},

		selectedMailboxData: {
			setSelectedMailboxData: get<UpdateMailboxRequest>('selectedMailboxData'),
		},
	},
});

export default mailboxesLogic;
