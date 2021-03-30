/**
 * @author Harish.R <harish.r@314ecorp.com>
 * @description LoaderBoundary component
 */

import React from 'react';
import { Spin } from 'antd';

/**
 * props for LoaderBoundary
 * @interface IProps
 */
interface IProps {
	/**
	 *
	 * loading
	 * @type {boolean}
	 * @memberof IProps
	 */
	loading?: boolean;
	/**
	 *
	 * children
	 * @type {React.ReactNode}
	 * optional
	 */
	children?: React.ReactNode;
}

/**
 * functional component to loaderBoundary
 * @param {IProps} props
 */
const loaderBoundary = (props: IProps) => (
	<React.Fragment>
		{props.loading ? (
			<div>
				<Spin />
			</div>
		) : (
			props.children
		)}
	</React.Fragment>
);

export default loaderBoundary;
