import React, { useEffect, lazy, Suspense } from 'react';
import _ from 'lodash';
import { useValues, useActions } from 'kea';
import { Layout, Spin, message, notification, Modal } from 'antd';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter as Router } from 'react-router-dom';
import appLogic from 'logic/appLogic';
import Header from '../Header';
import RQConfig from './../../react-query.config';
import AppEvents, { Events } from 'app-redux/utils/AppEvents';
import { accessTokenString, apiString } from '../../lib/constants/constant';

import 'app-ui/styles/style.css';
import 'app-ui/styles/antd.less';

const queryClient = new QueryClient(RQConfig);

const AccessToken = lazy(() => import('components/AccessToken'));
const NavigationBar = lazy(() => import('../NavigationBar'));
const ContentArea = lazy(() => import('../ContentArea'));
const ErrorPage = lazy(() => import('../ErrorBoundary/ErrorPage'));

const Fallback = () => <p> loading... </p>;

const App: React.FC = () => {
	const { loading, error, accessToken } = useValues(appLogic);
	const { syncAppData, setAccessToken } = useActions(appLogic);
	/**
	 * Function to remove splash screen (remove logo loader)
	 */
	const detachedAppLoader = () => {
		const initialLoader: HTMLElement | null = document.getElementById('splash-screen');
		if (initialLoader && initialLoader.parentNode) {
			initialLoader.parentNode.removeChild(initialLoader);
		}
	};
	const subscribeEventListeners = () => {
		message.config({
			top: 50,
			duration: 2,
			maxCount: 1,
		});
		AppEvents.subscribe(Events.Loading, message.loading);
		AppEvents.subscribe(Events.Warn, message.warn);
		AppEvents.subscribe(Events.Info, message.info);
		AppEvents.subscribe(Events.Success, message.success);
		AppEvents.subscribe(Events.Error, message.error);
		AppEvents.subscribe(Events.N_Success, notification.success);
		AppEvents.subscribe(Events.N_Error, notification.error);
		AppEvents.subscribe(Events.N_Info, notification.info);
		AppEvents.subscribe(Events.N_Warn, notification.warn);
		AppEvents.subscribe(Events.MO_Success, Modal.success);
		AppEvents.subscribe(Events.MO_Error, Modal.error);
		AppEvents.subscribe(Events.MO_Info, Modal.info);
		AppEvents.subscribe(Events.MO_Warn, Modal.warn);
	};

	useEffect(() => {
		const basePath = _.get(window, 'basePath', '').slice(0, -1);
		syncAppData(basePath);
	}, []);

	useEffect(() => {
		if (!loading) {
			detachedAppLoader();
		}
	}, [loading]);

	useEffect(() => {
		subscribeEventListeners();
		const token = sessionStorage.getItem(accessTokenString);
		if (!_.isEmpty(token)) {
			setAccessToken(token);
		}
	}, []);

	/**
	 * React-query cache config
	 */
	const renderContent = () => {
		if (_.isEmpty(accessToken) && _.isEmpty(sessionStorage.getItem(apiString))) {
			return (
				<Suspense fallback={<Fallback />}>
					<AccessToken />
				</Suspense>
			);
		}
		if (error) {
			return (
				<Suspense fallback={<p> error </p>}>
					<ErrorPage />
				</Suspense>
			);
		} else if (loading) {
			return <Spin spinning={true} />;
		} else {
			return (
				<Suspense fallback={<Fallback />}>
					<NavigationBar />
					<ContentArea />
				</Suspense>
			);
		}
	};

	return (
		<QueryClientProvider client={queryClient}>
			<Layout>
				<Router>
					<Header />
					<Layout>{renderContent()}</Layout>
				</Router>
			</Layout>
		</QueryClientProvider>
	);
};

export default App;
