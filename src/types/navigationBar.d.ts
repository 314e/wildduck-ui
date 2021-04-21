declare namespace Navigation {
	type Icon = {
		type: string;
		theme?: 'filled' | 'outlined' | 'twoTone';
	};

	interface IMenuItem {
		key: string;
		icon: Icon | React.FC;
		title: string;
		path: string;
		url: string;
		hideMenu: boolean;
	}

	type ISubMenuItem = {
		key: string;
		icon: Icon | React.FC;
		title: string;
		children: (ISubMenuItem | IMenuItem)[];
	};

	type IMenuItems = (ISubMenuItem | IMenuItem)[];

	interface IStoreStates {
		route?: string;
		nextRoute?: string;
		collapsed: boolean;
		openKeys: string[];
		selectedKeys: string[];
		accessableFeatures: any[];
		basePath: string;
		menuConfig: any;
	}

	interface IActions {
		setSelectedKeys: (keys: string[]) => void;
		setOpenKeys: (openKeys: string[]) => void;
		setCollapsed: (collapsed: boolean) => void;
		redirect: (nextUrl: string) => void;
	}

	interface Props extends IStoreStates {
		actions: IActions;
	}
}
