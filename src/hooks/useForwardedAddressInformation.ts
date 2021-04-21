/**
 * @author Chirag <chirag.kushwaha@314ecorp.com>
 * @description React hook useForwardedAddressInformation
 */

import { useQuery } from 'react-query';

import api from 'client/RequestClient';

/**
 * useForwardedAddressInformation
 */
const useForwardedAddressInformation = (addressId: string) => {
	return useQuery(['useForwardedAddressInformation', addressId], async () => {
		const { data } = await api.addressApi.getForwardedAddress(addressId);
		return data;
	});
};

export default useForwardedAddressInformation;
