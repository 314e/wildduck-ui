/**
 * @author Lakkanna Walikar <lakkanna.walikar@314ecorp.com>
 * @description Custom Link component to prefix basepath for to
 */

import React from 'react';
import { Link, LinkProps } from 'react-router-dom';
import _ from 'lodash';

export const getBasePath = (): string => {
	return _.get(window, 'basePath', '').slice(0, -1);
};

/**
 * CustomLink to prefix basepath for to
 * @param props
 */
function CustomLink <S = unknown>(props: LinkProps<S> & React.RefAttributes<HTMLAnchorElement> ): ReturnType<Link<S>> {
	const {to, children, ...restProps} = props;
	return (
		<Link {...restProps} to={`${getBasePath()}${to}`} > {children} </Link>
	);
}

export default CustomLink;
