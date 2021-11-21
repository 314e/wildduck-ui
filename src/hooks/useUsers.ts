/**
 * @author Chirag <chirag.kushwaha@314ecorp.com>
 * @description React hook useUsers
 */

import { useQuery } from 'react-query';
import _ from 'lodash';

import { addKey } from 'app-ui/utils/logicUtils';
import api from 'client/RequestClient';

/**
 * useUsers
 */
const useUsers = (params?: IUsers.IFilterUsers) => {
	return useQuery(
		['useUsers', params?.query, params?.tags, params?.requiredTags, params?.page, params?.limit],
		async () => {
			const { data } = await api.usersApi.getUsers(
				params?.query,
				'',
				params?.tags,
				params?.requiredTags,
				params?.metaData,
				params?.internalData,
				params?.limit,
				params?.page,
				params?.next,
				params?.previous,
			);
			return {
				data: addKey(_.sortBy(_.get(data, 'results', []), (user: any) => user.username)),
				previousCursor: _.get(data, 'previousCursor', ''),
				nextCursor: _.get(data, 'nextCursor', ''),
			};
		},
	);
};

export default useUsers;
