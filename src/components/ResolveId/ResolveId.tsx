/**
 * @author Aditya Negi <aditya.negi@314ecorp.com>
 * @description resolve id screen
 */

import React from 'react';
import { Input, Descriptions, Breadcrumb, Card } from 'antd';
import { useActions, useValues } from 'kea';

import Page from '../Page';
import Link from 'app-ui/components/CustomLink';

import dkimLogic from 'app-ui/logic/dkimLogic';

/**
 * ResolveId component
 */
const ResolveId: React.FC = () => {
	const { Search } = Input;
	const { resolveId } = useActions(dkimLogic);
	const { domainId } = useValues(dkimLogic);
	const onSearch = (value: any) => {
		if (value.length > 0) {
			resolveId(value);
		}
	};
	const descriptionBox = (
		<Card>
			<Descriptions bordered>
				<Descriptions.Item label='ID'>{domainId}</Descriptions.Item>
			</Descriptions>
		</Card>
	);

	const pageBreadcrumb = (
		<Breadcrumb>
			<Breadcrumb.Item>
				<Link to='/dkim'>DKIM</Link>
			</Breadcrumb.Item>

			<Breadcrumb.Item>Resolve DKIM ID</Breadcrumb.Item>
		</Breadcrumb>
	);
	return (
		<Page title={pageBreadcrumb}>
			<Search placeholder='Enter Alias' allowClear enterButton='Search' size='large' onSearch={onSearch} />
			{domainId.length > 0 && descriptionBox}
		</Page>
	);
};

export default ResolveId;
