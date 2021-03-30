/**
 * @author Aditya Negi <aditya.negi@314ecorp.com>
 * @description Dkim Details screen
 */

import React from 'react';
import { Tabs, Descriptions, Breadcrumb } from 'antd';
import { useParams, Link } from 'react-router-dom';

import Page from 'components/Page';

import useDkimDetails from 'app-ui/hooks/useDkimDetails';

const DkimDetails: React.SFC = () => {
	const { TabPane } = Tabs;
	const params: { id: string } = useParams();
	const { data, isLoading } = useDkimDetails(params.id);

	const DescriptionBox = () => {
		return (
			!isLoading && (
				<Descriptions size='small' bordered column={1}>
					<Descriptions.Item label='id'>{data.id}</Descriptions.Item>
					<Descriptions.Item label='domain'>{data.domain}</Descriptions.Item>
					<Descriptions.Item label='selector'>{data.selector}</Descriptions.Item>
					<Descriptions.Item label='description'>{data.description}</Descriptions.Item>
					<Descriptions.Item label='fingerprint'>{data.fingerprint}</Descriptions.Item>
					<Descriptions.Item label='DNS name'>{data.dnsTxt.name}</Descriptions.Item>
					<Descriptions.Item label=' DNS value'>{data.dnsTxt.value}</Descriptions.Item>
					<Descriptions.Item label=' created'>{data.created}</Descriptions.Item>
				</Descriptions>
			)
		);
	};

	const pageBreadcrumb = (
		<Breadcrumb>
			<Breadcrumb.Item>
				<Link to='/dkim'>DKIM</Link>
			</Breadcrumb.Item>

			<Breadcrumb.Item>{!isLoading && data.domain}</Breadcrumb.Item>
		</Breadcrumb>
	);
	return (
		<Page title={pageBreadcrumb} loading={isLoading}>
			<Tabs defaultActiveKey='descriptionBox'>
				<TabPane tab='Details' key='descriptionBox'>
					<DescriptionBox />
				</TabPane>
			</Tabs>
		</Page>
	);
};

export default DkimDetails;
