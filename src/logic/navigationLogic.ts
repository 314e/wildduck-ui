import { get } from 'app-ui/utils/logicUtils';
import { kea } from 'kea';
import _ from 'lodash';

import AppLogic from './appLogic';

const logic = kea({
	connect: {
		values: [AppLogic, ['menuConfig', 'basePath']],
	},

	path: () => ['navigations'],

	defaults: {
		collapsed: false,
		selectedKeys: [],
		openKeys: [],
	},

	actions: () => ({
		setCollapsed: (collapsed: boolean) => ({ collapsed }),
		setOpenKeys: (openKeys: string[]) => ({ openKeys }),
		setSelectedKeys: (selectedKeys: string[]) => ({ selectedKeys }),
		redirect: (nextURL: string) => ({ nextURL }),
		setNavigationKeys: (selectedKeys: string[], openKeys: string[]) => ({ selectedKeys, openKeys }),
	}),

	listeners: ({ actions, values }) => ({
		redirect: ({ nextURL }: { nextURL: string }) => {
			let url = `/${nextURL}`;
			const { menuConfig } = values;
			const basePath = _.get(window, 'basePath', '');
			if (basePath.length > 1 && new RegExp(`^${basePath}.*`).test(url)) {
				url = url.slice(basePath.length - 1);
			}
			const match = _.find(menuConfig, (config: string) => _.get(config, 'url') === url);
			actions.setNavigationKeys([_.get(match, 'key', '')], _.get(match, 'hierarchy', []));
		},
	}),

	reducers: () => ({
		collapsed: {
			setCollapsed: get<boolean>('collapsed'),
		},
		openKeys: {
			setOpenKeys: get<string>('openKeys'),
			setNavigationKeys: get<string>('openKeys'),
		},
		selectedKeys: {
			setSelectedKeys: get<string[]>('selectedKeys'),
			setNavigationKeys: get<string[]>('selectedKeys'),
		},
	}),
});

export default logic;
