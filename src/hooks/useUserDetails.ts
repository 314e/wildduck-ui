/**
 * @author Chirag <chirag.kushwaha@314ecorp.com>
 * @description React hook useUserDetails
 */

import { useQuery } from 'react-query';

import api from 'client/RequestClient';

/**
 * useUserDetails
 */
const useUserDetails = (userId: string) => {
	return useQuery(['useUserDetails', userId], async () => {
		const { data } = await api.usersApi.getUser(userId);
		return data;
	});
};

export default useUserDetails;
