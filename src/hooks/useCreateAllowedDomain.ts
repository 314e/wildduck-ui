/**
 * @author Aditya Negi <aditya.negi@314ecorp.com>
 * @description React hook useCreateAllowedDomain
 */

import { useMutation, useQueryClient } from 'react-query';

import api from 'app-redux/client/RequestClient';
import AppEvents, { Events } from 'app-ui/utils/AppEvents';

/*
 * useCreateAllowedDomain
 */
const useCreateAllowedDomain = () => {
	const queryClient = useQueryClient();

	return useMutation(
		(domain: { tag: string; domain: string }) =>
			api.domainAccessApi.createAllowedDomain(domain.tag, { domain: domain.domain }),
		{
			onSuccess: () => {
				AppEvents.publish(Events.Success, 'Success');
				queryClient.invalidateQueries('query-allowList');
				queryClient.invalidateQueries('query-blockList');
			},
			onError: () => {
				AppEvents.publish(Events.Error, 'Error');
			},
		},
	);
};

export default useCreateAllowedDomain;
