/**
 * @author Chirag <chirag.kushwaha@314ecorp.com>
 * @description React hook useDownloadAttachment
 */

import _ from 'lodash';
import { useQuery } from 'react-query';

import api from 'client/RequestClient';

interface IParams {
	userId: string;
	attachment: any;
	mailboxId: string;
	messageId: number;
}

/**
 * useDownloadAttachment
 */
const useDownloadAttachment = ({ userId, attachment, mailboxId, messageId }: IParams) => {
	return useQuery(
		['useDownloadAttachment', mailboxId, messageId, attachment],
		async () => {
			const { contentType, id, filename } = attachment;
			const { data } = await api.messagesApi.getMessageAttachment(userId, mailboxId, messageId, id, {
				responseType: 'blob',
			});
			const link = document.createElement('a');
			const fileCreated = new Blob([data], { type: contentType });
			link.href = URL.createObjectURL(fileCreated);
			link.download = filename;
			link.click();
		},
		{ enabled: !_.isEmpty(messageId) && !_.isEmpty(attachment) },
	);
};

export default useDownloadAttachment;
