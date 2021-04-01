import React, { useEffect } from 'react';
import _ from 'lodash';
import { Switch, Route } from 'react-router-dom';
import { createSelector } from 'reselect';
import Loadable from 'react-loadable';

import ErrorPage from '../ErrorBoundary/ErrorPage';
import ErrorBoundary from '../ErrorBoundary';
import { useActions, useValues } from 'kea';
import LoadingPage from '../LoadingPage';
import { Layout } from 'antd';

import appLogic from 'app-redux/logic/appLogic';
import navigationLogic from 'app-redux/logic/navigationLogic';

const ContentArea = () => {
	const { menuConfig, basePath } = useValues(appLogic);
	const { collapsed } = useValues(navigationLogic);
	const { setNavigationKeys } = useActions(navigationLogic);

	useEffect(() => {
		let pathname = window.location.pathname;
		const screenData = _.find(menuConfig, { url: pathname });
		pathname = pathname.slice(_.get(window, 'basePath', '').length - 1);
		setNavigationKeys([_.get(screenData, 'key', menuConfig[0].key)], _.get(screenData, 'hierarchy'));
	});

	const getModuleMap = createSelector(
		(menuItems: any) => menuItems,
		(accessableFeatures) => {
			return _.map(accessableFeatures, ({ url, component }) => {
				const loadableComponent = Loadable({
					loader: () => {
						if (_.isEmpty(component)) {
							return import('components/ErrorBoundary/ErrorPage');
						}
						return import(`components/${component}`);
					},
					loading: LoadingPage,
					delay: 2000,
					timeout: 20000,
				});
				return {
					url,
					component: loadableComponent,
				};
			});
		},
	);
	const moduleMap = getModuleMap(menuConfig);

	const landingPageMap = getModuleMap([menuConfig[0]])[0];

	const routes = _.concat(
		[<Route key={'/'} exact={true} path={basePath + '/'} component={landingPageMap.component} />],
		_.map(moduleMap, ({ url, component }) => {
			return <Route key={url} exact={true} path={basePath + url} component={component} />;
		}),
	);
	routes.push(<Route key={'notFound'} render={(routerProps) => <ErrorPage error={404} {...routerProps} />} />);
	return (
		<Layout.Content className={collapsed ? 'collapsed' : 'expanded'} style={{ overflow: 'hidden' }}>
			<ErrorBoundary>
				<Switch>{routes}</Switch>
			</ErrorBoundary>
		</Layout.Content>
	);
};
export default ContentArea;
