/**
 * @author Lakkanna Walikar <lakkanna.walikar@314ecorp.com>
 * @description Page component
 */

import React, { PureComponent, ReactNode } from 'react';
import { Result, Spin, PageHeader } from 'antd';

/**
 * Page props
 * @interface IPageProps
 */
interface IPageProps {
	/**
	 *
	 * title
	 * @type {string}
	 * @memberof IPageProps
	 */
	title?: string | ReactNode;
	/**
	 *
	 * subTitle
	 * @type {string}
	 * @memberof IPageProps
	 * optional
	 */
	subTitle?: string | React.ReactNode;
	/**
	 *
	 * error
	 * @type {boolean}
	 * @memberof IPageProps
	 * optional
	 */
	error?: boolean;
	/**
	 *
	 * loading
	 * @type {boolean}
	 * @memberof IPageProps
	 * optional
	 */
	loading?: boolean;
	/**
	 *
	 * children
	 * @type {any}
	 * @memberof IPageProps
	 * optional
	 */
	children?: any;
	/**
	 *
	 * extra
	 * @type {Array<React.ReactNode>}
	 * @memberof IPageProps
	 * optional
	 */
	extra?: React.ReactNode[];
	/**
	 *
	 * className
	 * @type {string}
	 * @memberof IPageProps
	 * optional
	 */
	className?: string;
}

/**
 * class component for Page
 * @class Page
 * @extends PureComponent
 * @exports
 */
export class Page extends PureComponent<IPageProps> {
	/**
	 *
	 * defaultProps
	 * @static
	 * @memberof Page
	 */
	static defaultProps = {
		title: '',
		subTitle: '',
		error: false,
		loading: false,
		extra: [] as React.ReactNode[],
	};

	/**
	 * render error page if error true
	 * @memberof Page
	 */
	// tslint:disable-next-line: variable-name
	static ErrorPage = ({ error }: IPageProps) =>
		error ? (
			<Result status={403} title='Oops...' subTitle='Sorry, we are having trouble showing the data!' />
		) : null;

	/**
	 * render children only if no loading or not having error
	 * @param {IPageProps} param0
	 * @memberof Page
	 */
	// tslint:disable-next-line: variable-name
	static Children = ({ error, loading, children }: IPageProps): JSX.Element | null => {
		if (error) {
			return null;
		}
		return <Spin spinning={loading}>{children}</Spin>;
	};

	/** Page Renderer */
	render(): JSX.Element {
		const { children, error, loading, title, subTitle, extra } = this.props;
		return (
			<PageHeader title={title} subTitle={subTitle} extra={extra} className={this.props.className}>
				{React.Children.map(children, (childElement) => {
					return React.cloneElement(childElement as React.ReactElement<any>, {
						error,
						loading,
					});
				})}
			</PageHeader>
		);
	}
}

/**
 * compund component for Page
 * @param {IPageProps} param0
 */
const pageWrapper = (props: IPageProps): JSX.Element => {
	const { children, ...restProps } = props;
	return (
		<Page {...restProps}>
			<Page.ErrorPage />
			<Page.Children> {children} </Page.Children>
		</Page>
	);
};

export default pageWrapper;
