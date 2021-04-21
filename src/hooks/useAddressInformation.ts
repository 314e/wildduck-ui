/**
 * @author Chirag <chirag.kushwaha@314ecorp.com>
 * @description React hook useAddressInformation
 */

import { useQuery } from 'react-query';

import api from 'client/RequestClient';

/**
 * useAddressInformation
 */
const useAddressInformation = (userId: string, addressId: string) => {
	return useQuery(['useAddressInformation', addressId], async () => {
		const { data } = await api.addressApi.getUserAddress(userId, addressId);
		return data;
	});
};

export default useAddressInformation;
