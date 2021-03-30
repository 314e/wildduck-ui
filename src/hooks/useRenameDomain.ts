/**
 * @author Chirag <chirag.kushwaha@314ecorp.com>
 * @description React hook useRenameDomain
 */

import { useMutation, useQueryClient } from 'react-query';

import api from 'app-redux/client/RequestClient';
import AppEvents, { Events } from 'app-redux/utils/AppEvents';
import { RenameDomainRequest } from 'app-redux/client/wildduck-api';

/**
 * useRenameDomain
 */
const useRenameDomain = () => {
	const queryClient = useQueryClient();

	return useMutation((newDomain: RenameDomainRequest) => api.addressApi.renameDomain(newDomain), {
		onError: () => {
			AppEvents.publish(Events.Error, 'Error');
		},
		onSuccess: () => {
			AppEvents.publish(Events.Success, 'Success');
			queryClient.invalidateQueries('useForwardedAddress');
		},
	});
};

export default useRenameDomain;
