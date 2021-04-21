/**
 * @author Chirag <chirag.kushwaha@314ecorp.com>
 * @description React hook useMessages
 */

import { useQuery } from 'react-query';
import _ from 'lodash';

import { addKey } from 'app-ui/utils/logicUtils';
import api from 'app-redux/client/RequestClient';

interface IParams {
	userId: string;
	mailboxId: string;
	params?: any;
}

/**
 * useMessages
 */
const useMessages = ({ userId, mailboxId, params }: IParams) => {
	return useQuery(
		['useMessages', userId, mailboxId, params?.limit, params?.page, params?.specialUse, params?.unseen],
		async () => {
			const { data } = await api.messagesApi.getMessages(
				userId,
				mailboxId,
				_.get(params, 'unseen'),
				_.get(params, 'metaData', true),
				_.get(params, 'limit'),
				_.get(params, 'page'),
				_.get(params, 'order'),
				_.get(params, 'next'),
				_.get(params, 'previous'),
			);

			return {
				data: addKey(_.get(data, 'results', []), ['messageId', 'mailbox', 'thread', 'id']),
				previousCursor: _.get(data, 'previousCursor', ''),
				nextCursor: _.get(data, 'nextCursor', ''),
			};
		},
	);
};

export default useMessages;
