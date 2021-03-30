/**
 * @author Chirag <chirag.kushwaha@314ecorp.com>
 * @description React hook useMessageDetails
 */

import { useQuery } from 'react-query';

import api from 'app-redux/client/RequestClient';

interface IParams {
	userId: string;
	messageId: any;
	mailboxId: string;
}

/**
 * useMessageDetails
 */
const useMessageDetails = ({ userId, messageId, mailboxId }: IParams) => {
	return useQuery(['useMessageDetails', mailboxId, messageId], async () => {
		const { data } = await api.messagesApi.getMessage(userId, mailboxId, messageId);
		return data;
	});
};

export default useMessageDetails;
