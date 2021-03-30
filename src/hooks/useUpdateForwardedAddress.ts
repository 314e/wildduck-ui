/**
 * @author Chirag <chirag.kushwaha@314ecorp.com>
 * @description React hook useUpdateForwardedAddress
 */

import { useMutation, useQueryClient } from 'react-query';

import api from 'app-redux/client/RequestClient';
import AppEvents, { Events } from 'app-redux/utils/AppEvents';
import { UpdateForwardedAddressRequest } from 'app-redux/client/wildduck-api';
import handleError from 'app-ui/utils/handleError';

interface IParams {
	addressId: string;
	updateForwardedAddressInformation: UpdateForwardedAddressRequest;
}
/**
 * useUpdateForwardedAddress
 */
const useUpdateForwardedAddress = () => {
	const queryClient = useQueryClient();

	return useMutation(
		(params: IParams) =>
			api.addressApi.updateForwardedAddress(params.addressId, params.updateForwardedAddressInformation),
		{
			onError: () => {
				AppEvents.publish(Events.Error, 'Error');
			},
			onSuccess: ({ data }) => {
				handleError(data);
				queryClient.invalidateQueries('useForwardedAddressInformation');
			},
		},
	);
};

export default useUpdateForwardedAddress;
