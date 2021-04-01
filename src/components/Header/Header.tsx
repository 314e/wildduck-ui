/**
 * @author Harish.R <harish.r@314ecorp.com>
 * @description Header component
 */

import React from 'react';
import { Button, Layout, Tooltip } from 'antd';
import { useActions } from 'kea';
import { LogoutOutlined } from '@ant-design/icons';
import WildDuckIcon from '../../assets/icons/WildDuckIcon';
import { accessTokenString, apiString } from 'app-ui/lib/constants/constant';
import appLogic from 'app-redux/logic/appLogic';

/**
 * class component for Header
 * @class Header
 * @extends PureComponent
 */
const Header = () => {
	const { setAccessToken } = useActions(appLogic);
	const logout = () => {
		sessionStorage.removeItem(accessTokenString);
		sessionStorage.removeItem(apiString);
		setAccessToken('');
	};

	/** Header Renderer */
	return (
		<Layout.Header className='header'>
			<WildDuckIcon />
			<Tooltip title='Logout'>
				<Button shape='circle' onClick={logout} icon={<LogoutOutlined />}></Button>
			</Tooltip>
		</Layout.Header>
	);
};

export default Header;
