/**
 * @author Chirag Kushwaha <chirag.kushwaha@314ecorp.com>
 * @description ForwardedAddressInformation Component
 */

import React from 'react';
import { Tabs, Breadcrumb } from 'antd';
import _ from 'lodash';
import { useParams } from 'react-router-dom';

import Link from 'app-ui/components/CustomLink';
import Page from '../Page';
import ForwardedAddressInformationForm from './ForwardedAddressInformationForm';
import ListTarget from './ListTarget';
import { ForwardedAddressInfoFomatter } from 'app-ui/lib/constants/Formatter';

import useForwardedAddressInformation from 'app-ui/hooks/useForwardedAddressInformation';

import 'styles/style.css';

const { TabPane } = Tabs;

/**
 * ForwardedAddressInformation Component
 */
const ForwardedAddressInformation: React.FC = () => {
	const { id }: any = useParams();

	const { data, isLoading, isError } = useForwardedAddressInformation(id);

	const formattedData = ForwardedAddressInfoFomatter(data);

	const breadcrum = (
		<Breadcrumb>
			<Breadcrumb.Item>
				<Link to='/forwarded-addresses'>Forwarded Addresses</Link>
			</Breadcrumb.Item>
			<Breadcrumb.Item>{_.get(data, 'address')}</Breadcrumb.Item>
		</Breadcrumb>
	);

	return (
		<Page title={breadcrum} loading={isLoading} error={isError}>
			<Tabs defaultActiveKey='update-forwarded-address-information'>
				<TabPane tab='Details' key='update-forwarded-address-information'>
					<ForwardedAddressInformationForm data={formattedData} />
				</TabPane>
				<TabPane tab='List Users' key='target-users-list'>
					<ListTarget data={formattedData} />
				</TabPane>
			</Tabs>
		</Page>
	);
};

export default ForwardedAddressInformation;
