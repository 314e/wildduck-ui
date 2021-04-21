/**
 * @author Aditya Negi <aditya.negi@314ecorp.com>
 * @description messages logic
 */

import { kea } from 'kea';

import { get } from 'app-ui/utils/logicUtils';

const messagesLogic = kea({
	path: () => ['messages'],
	defaults: {
		limit: 20,
		next: '',
		previous: '',
		page: 1,

		messageId: '',
		attachmentId: '',

		unseen: false,

		showUploadMessageForm: false,
		messageDetailsToggle: false,
		messageSourceToggle: false,
	},
	actions: {
		setPage: (page: number) => ({ page }),
		setNext: (next: string) => ({ next }),
		setPrevious: (previous: string) => ({ previous }),
		setLimit: (limit: number) => ({ limit }),

		setUnseen: (unseen: boolean) => ({ unseen }),

		setMessageId: (messageId: string | number) => ({ messageId }),
		setAttachmentId: (attachmentId: string | number) => ({ attachmentId }),

		setMessageDetailsToggle: (messageDetailsToggle: boolean) => ({ messageDetailsToggle }),
		setMessageSourceToggle: (messageSourceToggle: boolean) => ({ messageSourceToggle }),
	},
	reducers: {
		messageId: {
			setMessageId: get<string | number>('messageId'),
		},
		attachmentId: {
			setAttachmentId: get<string | number>('attachmentId'),
		},

		messageSourceToggle: {
			setMessageSourceToggle: get<boolean>('messageSourceToggle'),
		},
		messageDetailsToggle: {
			setMessageDetailsToggle: get<boolean>('messageDetailsToggle'),
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

		unseen: {
			setUnseen: get<boolean>('unseen'),
		},
	},
});

export default messagesLogic;
