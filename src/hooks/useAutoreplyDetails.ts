/**
 * @author Chirag <chirag.kushwaha@314ecorp.com>
 * @description React hook useAutoreplyDetails
 */

import { useQuery } from 'react-query';

import api from 'app-redux/client/RequestClient';

/**
 * useAutoreplyDetails
 */
const useAutoreplyDetails = (userId: string) => {
	return useQuery(['useAutoreplyDetails', userId], async () => {
		const { data } = await api.autorepliesApi.getAutoreply(userId);
		return data;
	});
};

export default useAutoreplyDetails;
