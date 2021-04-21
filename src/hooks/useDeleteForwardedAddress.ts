/**
 * @author Chirag <chirag.kushwaha@314ecorp.com>
 * @description React hook useDeleteForwadedAddress
 */

import { useMutation, useQueryClient } from 'react-query';

import api from 'app-redux/client/RequestClient';
import AppEvents, { Events } from 'app-ui/utils/AppEvents';

/**
 * useDeleteForwadedAddress
 */
const useDeleteForwadedAddress = () => {
	const queryClient = useQueryClient();

	return useMutation((addressId: string) => api.addressApi.deleteForwardedAddress(addressId), {
		onError: () => {
			AppEvents.publish(Events.Error, 'Error');
		},
		onSuccess: () => {
			AppEvents.publish(Events.Success, 'Success');
			queryClient.invalidateQueries('useForwardedAddress');
		},
	});
};

export default useDeleteForwadedAddress;
