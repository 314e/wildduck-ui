/**
 * @author Chirag <chirag.kushwaha@314ecorp.com>
 * @description React hook useDownloadAttachment
 */

import { useQuery } from 'react-query';

import api from 'app-redux/client/RequestClient';
import _ from 'lodash';

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
	return useQuery(['useDownloadAttachment', mailboxId, messageId, attachment], async () => {
		const { contentType, id, filename } = attachment;
		if (!_.isEmpty(messageId)) {
			const { data } = await api.messagesApi.getMessageAttachment(userId, mailboxId, messageId, id, {
				responseType: 'blob',
			});
			const link = document.createElement('a');
			const fileCreated = new Blob([data], { type: contentType });
			link.href = URL.createObjectURL(fileCreated);
			link.download = filename;
			link.click();
		}
	});
};

export default useDownloadAttachment;
