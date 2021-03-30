import React, { Component } from 'react';
import _ from 'lodash';
import log from 'loglevel';

import ErrorPage from './ErrorPage';

/**
 * class component to handle erros
 * @class ErrorBoundary
 * @extends Component
 */
class ErrorBoundary extends Component<any> {
	/**
	 * lifecycle to catch DOM errors
	 *
	 * @param {object|string} error error message
	 * @param info {object|string} info stack information of error
	 */
	componentDidCatch(error: Error, info: React.ErrorInfo): void {
		const { setError } = this.props.actions;
		if (error && _.isFunction(setError)) {
			setError({ error, info });
		} else {
			log.error(error, info);
		}
	}

	/**
	 * ErrorBoundary Renderer
	 */
	render(): JSX.Element | React.ReactNode {
		const { error, children } = this.props;
		if (error) {
			return <ErrorPage error={404} />;
		}
		return children;
	}
}

export default ErrorBoundary;
