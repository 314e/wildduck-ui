/**
 * @author Chirag <chirag.kushwaha@314ecorp.com>
 * @description React hook useArchive
 */

import { useQuery } from 'react-query';
import _ from 'lodash';

import { addKey } from 'redux-utils/logicUtils';
import api from 'app-redux/client/RequestClient';

interface IParam {
	userId: string;
	params: any;
}

/**
 * useArchive
 */
const useArchive = ({ userId, params }: IParam) => {
	return useQuery(['useArchive', params?.limit, params?.page], async () => {
		const { data } = await api.archiveApi.getArchivedMessages(
			userId,
			_.get(params, 'limit'),
			_.get(params, 'page'),
			_.get(params, 'order'),
			_.get(params, 'next'),
			_.get(params, 'previous'),
		);
		return {
			previousCursor: _.get(data, 'previousCursor', ''),
			nextCursor: _.get(data, 'nextCursor', ''),
			data: addKey(_.get(data, 'results', []), ['messageId', 'mailbox', 'thread', 'id']),
		};
	});
};

export default useArchive;
