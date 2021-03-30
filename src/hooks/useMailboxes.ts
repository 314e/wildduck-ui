/**
 * @author Chirag <chirag.kushwaha@314ecorp.com>
 * @description React hook useMailboxes
 */

import { useQuery } from 'react-query';
import _ from 'lodash';

import { addKey } from 'redux-utils/logicUtils';
import api from 'app-redux/client/RequestClient';

interface IParams {
	userId: string;
	params?: any;
}

/**
 * useMailboxes
 */
const useMailboxes = ({ userId, params }: IParams) => {
	return useQuery(['useMailboxes', params?.specialUse], async () => {
		if (!_.isEmpty(userId)) {
			const { data } = await api.mailboxesApi.getMailboxes(
				userId,
				_.get(params, 'specialUse'),
				_.get(params, 'showHidden', true),
				_.get(params, 'counters', true),
				_.get(params, 'sizes', true),
			);
			return addKey(_.get(data, 'results', []));
		}
	});
};

export default useMailboxes;
