import React from 'react';
import { Menu, Layout } from 'antd';
import { Icon } from '@ant-design/compatible';
import { Link, withRouter, RouteComponentProps } from 'react-router-dom';
import _ from 'lodash';

/**
 * Navigation Bar
 * @class @name NavigationBar
 */
class NavigationBar extends React.PureComponent<Navigation.Props & RouteComponentProps> {
	redirect = (path: string, selected: Record<string, any>) => {
		return () => {
			this.props.history.push(path);
			this.updateSelectedKeys(selected);
		};
	};

	/**
	 * componentDidUpdate
	 * @instance
	 */
	componentDidUpdate = (prevProps: Navigation.Props & RouteComponentProps) => {
		const currentPathName = this.props.location.pathname;
		if (currentPathName !== _.get(prevProps, 'location.pathname')) {
			this.props.actions.redirect(currentPathName.slice(1));
		}
	};

	updateSelectedKeys = (selected: Record<string, any>) => {
		const { actions } = this.props;
		const { setSelectedKeys } = actions;
		setSelectedKeys(_.get(selected, 'key', '/'));
	};

	handleOpenKeysChange = (openKeys: string[]) => {
		const { setOpenKeys } = this.props.actions;
		setOpenKeys(_.takeRight(openKeys));
	};

	/**
	 * Render Main Menu items
	 */
	renderMenuItem = (menuItem: Navigation.IMenuItem): JSX.Element => {
		const link = `${this.props.basePath}${menuItem.url}`;
		return (
			<Menu.Item
				key={menuItem.key}
				style={{
					fontSize: 12,
				}}
				hidden={menuItem.hideMenu}
			>
				<Link to={link}>
					{'type' in menuItem.icon ? (
						<Icon
							style={{
								fontSize: 16,
							}}
							type={menuItem.icon.type}
						/>
					) : (
						<Icon component={menuItem.icon} />
					)}
					<span
						style={{
							fontSize: 14,
						}}
					>
						{menuItem.title}
					</span>
				</Link>
			</Menu.Item>
		);
	};

	/**
	 * Render subMenu
	 * @member
	 */
	renderSubMenuItem = (subMenuItem: Navigation.IMenuItems): JSX.Element[] => {
		return _.map(subMenuItem, (menuItem: Navigation.ISubMenuItem | Navigation.IMenuItem): JSX.Element => {
			if ('children' in menuItem) {
				const title = (
					<span>
						<Icon style={{ fontSize: 16 }} {...menuItem.icon} />
						<span>{menuItem.title}</span>
					</span>
				);
				const children = _.map(menuItem.children, this.renderMenuItem);
				return (
					<Menu.SubMenu key={menuItem.title} title={title} style={{ fontSize: 12 }}>
						{children}
					</Menu.SubMenu>
				);
			} else {
				return this.renderMenuItem(menuItem);
			}
		});
	};

	/**
	 * Render NavigationBar
	 */
	render() {
		const { menuConfig, collapsed, selectedKeys, openKeys, actions } = this.props;
		const { setCollapsed } = actions;

		const menuItems = this.renderSubMenuItem(menuConfig);

		const trigger = (
			<div className='poweredBy'>
				<a href='http://www.314e.com' target={'_blank'} rel='noopener noreferrer'></a>
				<div className={'ant-layout-sider-trigger-button'} onClick={() => setCollapsed(!collapsed)}>
					<Icon type={collapsed ? 'right' : 'left'} />
				</div>
			</div>
		);

		return (
			<Layout.Sider
				theme={'dark'}
				collapsible={true}
				collapsed={collapsed}
				trigger={trigger}
				breakpoint={'lg'}
				width={200}
			>
				<Menu
					inlineIndent={8}
					theme='dark'
					mode='inline'
					selectedKeys={selectedKeys}
					openKeys={openKeys}
					onOpenChange={this.handleOpenKeysChange}
					onSelect={this.updateSelectedKeys}
				>
					{menuItems}
				</Menu>
			</Layout.Sider>
		);
	}
}

export default withRouter(NavigationBar);
