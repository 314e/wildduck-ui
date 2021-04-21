/**
 * @author Chirag <chirag.kushwaha@314ecorp.com>
 * @description React hook useDeleteAddress
 */

import { useMutation, useQueryClient } from 'react-query';

import api from 'app-redux/client/RequestClient';
import AppEvents, { Events } from 'app-ui/utils/AppEvents';

interface IDeleteAddress {
	userId: string;
	addressId: string;
}

/**
 * useDeleteAddress
 */
const useDeleteAddress = () => {
	const queryClient = useQueryClient();

	return useMutation(({ userId, addressId }: IDeleteAddress) => api.addressApi.deleteUserAddress(userId, addressId), {
		onError: () => {
			AppEvents.publish(Events.Error, 'Error');
		},
		onSuccess: () => {
			AppEvents.publish(Events.Success, 'Success');
			queryClient.invalidateQueries('useAddress');
		},
	});
};

export default useDeleteAddress;
