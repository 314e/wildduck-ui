/**
 * @author Lakkanna Walikar <lakkanna.walikar@314ecorp.com>
 * @description Html render component
 */

import React, { ReactElement } from 'react';

/**
 * IProps
 */
interface IProps {
	/**
	 * stringifiedHtml
	 * string to render as html
	 * @type {string}
	 */
	stringifiedHtml: string;
	/**
	 * pointerEvents
	 * @type {string}
	 */
	disablePointerEvents?: boolean;
	/**
	 * className
	 * @type {string}
	 */
	className?: string;

	/**
	 * className
	 * @type {React.CSSProperties}
	 */
	style: React.CSSProperties;
}

/**
 * functional component to render string as HTML
 * @param param0
 */
const HtmlRenderer = ({ stringifiedHtml, disablePointerEvents, style, ...restProps }: IProps): ReactElement => {
	return (
		<div
			style={{ ...style, pointerEvents: disablePointerEvents ? 'none' : 'unset' }}
			dangerouslySetInnerHTML={{ __html: stringifiedHtml }}
			{...restProps}
		/>
	);
};

HtmlRenderer.defaultProps = {
	style: {},
	disablePointerEvents: true,
};

export default HtmlRenderer;
