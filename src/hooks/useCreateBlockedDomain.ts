/**
 * @author Aditya Negi <aditya.negi@314ecorp.com>
 * @description React hook useCreateBlockedDomain
 */

import { useMutation, useQueryClient } from 'react-query';

import api from 'app-redux/client/RequestClient';
import AppEvents, { Events } from 'app-ui/utils/AppEvents';

/*
 * useCreateBlockedDomain
 */
const useCreateBlockedDomain = () => {
	const queryClient = useQueryClient();

	return useMutation(
		(domain: { tag: string; domain: string }) =>
			api.domainAccessApi.createBlockedDomain(domain.tag, { domain: domain.domain }),
		{
			onSuccess: () => {
				AppEvents.publish(Events.Success, 'Success');
				queryClient.invalidateQueries('query-blockList');
				queryClient.invalidateQueries('query-allowList');
			},
			onError: () => {
				AppEvents.publish(Events.Error, 'Error');
			},
		},
	);
};

export default useCreateBlockedDomain;
