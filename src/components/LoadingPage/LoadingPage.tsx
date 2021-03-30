/**
 * @author Harish.R <harish.r@314ecorp.com>
 * @description LoadingPage component
 */

import React from 'react';
import { LoadingComponentProps } from 'react-loadable';

import ErrorPage from 'app-ui/components/ErrorBoundary/ErrorPage';
import LoaderBoundary from '../LoaderBoundary';

/**
 * functional component for loadingPage
 * @param {LoadingComponentProps} props
 */
const loadingPage = (props: LoadingComponentProps): JSX.Element => {
	if (props.error || props.timedOut) {
		return <ErrorPage error={404} prefix={'Page'} />;
	} else {
		return <LoaderBoundary loading={true} />;
	}
};

export default loadingPage;
