/**
 * @author Chirag <chirag.kushwaha@314ecorp.com>
 * @description React hook useCreateAddress
 */

import { useMutation, useQueryClient } from 'react-query';

import api from 'app-redux/client/RequestClient';
import AppEvents, { Events } from 'app-ui/utils/AppEvents';
import { CreateUserAddressRequest } from 'app-redux/client/wildduck-api';
import handleError from 'app-ui/utils/handleError';

interface IProp {
	userId: string;
	addressDetails: CreateUserAddressRequest;
}

/**
 * useCreateAddress
 */
const useCreateAddress = () => {
	const queryClient = useQueryClient();

	return useMutation(
		({ userId, addressDetails }: IProp) => api.addressApi.createUserAddress(userId, addressDetails),
		{
			onError: () => {
				AppEvents.publish(Events.Error, 'Error');
			},
			onSuccess: ({ data }) => {
				handleError(data);
				queryClient.invalidateQueries('useAddress');
			},
		},
	);
};

export default useCreateAddress;
