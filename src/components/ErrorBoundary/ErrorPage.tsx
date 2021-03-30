import React from 'react';
import _ from 'lodash';
import { Result } from 'antd';
import { WarningFilled } from '@ant-design/icons';
import { ResultProps } from 'antd/lib/result';

/**
 * interface for Error
 * @interface IError
 */
interface IError {
	[key: string]: {
		/**
		 * title
		 * @type {ResultProps['status']}
		 */
		title: ResultProps['status'];
		/**
		 * description
		 * @type {string}
		 */
		description: string;
	};
}

/**
 * data for common errors
 */
const commonErrors: IError = {
	error403: {
		title: 403,
		description: 'Unauthorized Access',
	},
	error404: {
		title: 404,
		description: 'Page Not Found',
	},
	error500: {
		title: 500,
		description: 'Server Error',
	},
};

/**
 * functional component to render error
 * @param {any} props
 */
const ErrorPage = (props: any) => {
	let error = commonErrors.error404;

	if (_.has(props, 'error') && _.has(commonErrors, `error${_.get(props, 'error')}`)) {
		error = _.get(commonErrors, `error${_.get(props, 'error')}`);
	} else {
		error = props;
	}

	return <Result status={error.title} title={error.title} subTitle={error.description} icon={<WarningFilled />} />;
};

export default ErrorPage;
