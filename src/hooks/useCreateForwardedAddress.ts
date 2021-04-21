/**
 * @author Chirag <chirag.kushwaha@314ecorp.com>
 * @description React hook useCreateForwardedAddress
 */

import { useMutation } from 'react-query';

import api from 'client/RequestClient';
import AppEvents, { Events } from 'app-ui/utils/AppEvents';
import { CreateForwardedAddressRequest } from 'client/wildduck-api';
import handleError from 'app-ui/utils/handleError';

/**
 * useCreateForwardedAddress
 */
const useCreateForwardedAddress = () => {
	return useMutation(
		(newForwardedAddress: CreateForwardedAddressRequest) =>
			api.addressApi.createForwardedAddress(newForwardedAddress),
		{
			onError: () => {
				AppEvents.publish(Events.Error, 'Error');
			},
			onSuccess: ({ data }) => {
				handleError(data);
			},
		},
	);
};

export default useCreateForwardedAddress;
