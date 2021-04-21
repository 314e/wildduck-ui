/**
 * @author Chirag <chirag.kushwaha@314ecorp.com>
 * @description React hook useUpdateAddress
 */

import { useMutation, useQueryClient } from 'react-query';

import api from 'client/RequestClient';
import AppEvents, { Events } from 'app-ui/utils/AppEvents';
import { UpdateUserAddressRequest } from 'client/wildduck-api';
import handleError from 'app-ui/utils/handleError';

interface IParams {
	userId: string;
	addressId: string;
	updateAddressInfo: UpdateUserAddressRequest;
}
/**
 * useUpdateAddress
 */
const useUpdateAddress = () => {
	const queryClient = useQueryClient();

	return useMutation(
		(params: IParams) =>
			api.addressApi.updateUserAddress(params.userId, params.addressId, params.updateAddressInfo),
		{
			onError: () => {
				AppEvents.publish(Events.Error, 'Error');
			},
			onSuccess: ({ data }) => {
				handleError(data);
				queryClient.invalidateQueries('useAddressInformation');
			},
		},
	);
};

export default useUpdateAddress;
