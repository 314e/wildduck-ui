/**
 * @author Chirag <chirag.kushwaha@314ecorp.com>
 * @description React hook useMessageSource
 */

import { useQuery } from 'react-query';

import api from 'client/RequestClient';

interface IParams {
	userId: string;
	mailboxId: string;
	messageNumber: number;
}
/**
 * useMessageSource
 */
const useMessageSource = ({ userId, mailboxId, messageNumber }: IParams) => {
	return useQuery(['useMessageSource'], async () => {
		const { data } = await api.messagesApi.getMessageSource(userId, mailboxId, messageNumber);

		return data;
	});
};

export default useMessageSource;
