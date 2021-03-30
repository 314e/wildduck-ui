/**
 * @author Harish.R <harish.r@314ecorp.com>
 * @description Header component
 */

import React from 'react';
import { Layout, Typography } from 'antd';
import WildDuckIcon from '../../assets/icons/WildDuckIcon';

/**
 * class component for Header
 * @class Header
 * @extends PureComponent
 */
const Header = () => {
	/** Header Renderer */
	return (
		<Layout.Header className='header'>
			<WildDuckIcon />
		</Layout.Header>
	);
};

export default Header;
