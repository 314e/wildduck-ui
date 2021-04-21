import { kea } from 'kea';
import _ from 'lodash';
import { get } from 'app-ui/utils/logicUtils';
import menuConfig from '../../submodules/wildduck-redux/src/config/menuConfig';

const appLogic = kea({
	path: () => ['app'],
	defaults: {
		loading: true,
		error: false,
		menuConfig: [],
		basePath: '',
		accessToken: '',
		showFloatingButton: false,
	},
	actions: {
		syncAppData: (basePath: string) => ({ basePath }),
		setError: true,
		setAccessToken: (token: string) => ({ token }),
		setShowFloatingButton: (status: boolean) => ({ status }),
	},
	reducers: {
		basePath: {
			syncAppData: get<string>('basePath'),
		},
		loading: {
			syncAppData: _.stubFalse,
		},
		error: {
			syncAppData: _.stubFalse,
			setError: _.stubTrue,
		},
		menuConfig: {
			syncAppData: () => menuConfig,
		},
		accessToken: {
			setAccessToken: get<string>('token'),
		},
		showFloatingButton: {
			setShowFloatingButton: get<boolean>('status'),
		},
	},
});

export default appLogic;
